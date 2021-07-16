/**
 * A screen that contains all the available servives.
 * - Local tab: services sections related to the areas of interest selected by the user
 * - National tab: national services sections
 * - All: local and national services sections, not including the user areas of interest
 *
 * A 'loading component' is displayed (hiding the tabs content) if:
 * - visible servcices are loading, or
 * - userMetadata is loading, or
 * - servicesByScope is loading
 *
 * An 'error component' is displayed (hiding the tabs content) if:
 * - userMetadata load fails, or
 * - visible services load fails
 *
 * A loader on tabs is displayed (not hiding the tabs content) if:
 * - userMetadata is updating, or
 * - visible services are refreshed
 *
 * If toastContent is undefined, when userMetadata/visible services are loading/error,
 * tabs are hidden and they are displayed renderServiceLoadingPlaceholder/renderErrorPlaceholder
 *
 */
import { Option } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { Tab, Tabs, Text, View } from "native-base";
import * as React from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import {
  NavigationEventSubscription,
  NavigationScreenProps
} from "react-navigation";
import { connect } from "react-redux";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import { withLightModalContext } from "../../components/helpers/withLightModalContext";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import GenericErrorComponent from "../../components/screens/GenericErrorComponent";
import { ScreenContentHeader } from "../../components/screens/ScreenContentHeader";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { MIN_CHARACTER_SEARCH_TEXT } from "../../components/search/SearchButton";
import { SearchNoResultMessage } from "../../components/search/SearchNoResultMessage";
import ServicesSearch from "../../components/services/ServicesSearch";
import ServicesTab from "../../components/services/ServicesTab";
import { LightModalContextInterface } from "../../components/ui/LightModal";
import I18n from "../../i18n";
import { loadServiceMetadata } from "../../store/actions/content";
import { navigateToServiceDetailsScreen } from "../../store/actions/navigation";
import { profileUpsert } from "../../store/actions/profile";
import {
  loadVisibleServices,
  showServiceDetails
} from "../../store/actions/services";
import { Dispatch } from "../../store/actions/types";
import {
  userMetadataLoad,
  userMetadataUpsert
} from "../../store/actions/userMetadata";
import {
  nationalServicesSectionsSelector,
  notSelectedServicesSectionsSelector,
  selectedLocalServicesSectionsSelector,
  ServicesSectionState,
  servicesSelector,
  visibleServicesDetailLoadStateSelector
} from "../../store/reducers/entities/services";
import { readServicesByIdSelector } from "../../store/reducers/entities/services/readStateByServiceId";
import { servicesByIdSelector } from "../../store/reducers/entities/services/servicesById";
import { visibleServicesSelector } from "../../store/reducers/entities/services/visibleServices";
import { wasServiceAlertDisplayedOnceSelector } from "../../store/reducers/persistedPreferences";
import { profileSelector, ProfileState } from "../../store/reducers/profile";
import {
  isSearchServicesEnabledSelector,
  searchTextSelector
} from "../../store/reducers/search";
import { GlobalState } from "../../store/reducers/types";
import {
  UserMetadata,
  userMetadataSelector
} from "../../store/reducers/userMetadata";
import { makeFontStyleObject } from "../../theme/fonts";
import customVariables from "../../theme/variables";
import { InferNavigationParams } from "../../types/react";
import { HEADER_HEIGHT } from "../../utils/constants";
import {
  getChannelsforServicesList,
  getProfileChannelsforServicesList
} from "../../utils/profile";
import { showToast } from "../../utils/showToast";
import { setStatusBarColorAndBackground } from "../../utils/statusBar";
import { IOStyles } from "../../components/core/variables/IOStyles";
import SectionStatusComponent from "../../components/SectionStatusComponent";
import LocalServicesWebView from "../../components/services/LocalServicesWebView";
import ServicePreferenceSummary from "../../components/services/ServicePreferenceSummary";
import ServiceDetailsScreen from "./ServiceDetailsScreen";

type OwnProps = NavigationScreenProps;

type ReduxMergedProps = Readonly<{
  updateOrganizationsOfInterestMetadata: (
    selectedItemIds: Option<Set<string>>
  ) => void;
}>;

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps &
  ReduxMergedProps &
  LightModalContextInterface;

type State = {
  currentTab: number;
  currentTabServicesId: ReadonlyArray<string>;
  isLongPressEnabled: boolean;
  enableServices: boolean;
  toastErrorMessage: string;
  isInnerContentRendered: boolean;
};

type DataLoadFailure =
  | "servicesLoadFailure"
  | "userMetadaLoadFailure"
  | undefined;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topScreenContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  tabBarContainer: {
    elevation: 0,
    height: 40
  },
  tabBarUnderline: {
    borderBottomColor: customVariables.tabUnderlineColor,
    borderBottomWidth: customVariables.tabUnderlineHeight
  },
  tabBarUnderlineActive: {
    height: customVariables.tabUnderlineHeight,
    // borders do not overlap eachother, but stack naturally
    marginBottom: -customVariables.tabUnderlineHeight,
    backgroundColor: customVariables.contentPrimaryBackground
  },
  searchDisableIcon: {
    color: customVariables.headerFontColor
  },
  organizationLogo: {
    marginBottom: 0
  },
  activeTextStyle: {
    ...makeFontStyleObject(Platform.select, "600"),
    fontSize: Platform.OS === "android" ? 16 : undefined,
    fontWeight: Platform.OS === "android" ? "normal" : "bold",
    color: customVariables.brandPrimary
  },
  textStyle: {
    color: customVariables.brandDarkGray
  },
  center: {
    alignItems: "center"
  },
  padded: {
    paddingHorizontal: customVariables.contentPadding
  },
  customSpacer: {
    height: customVariables.spacerHeight + customVariables.h1LineHeight
  },
  errorText: {
    fontSize: customVariables.fontSize2,
    paddingTop: customVariables.contentPadding
  },
  varBar: {
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-around",
    backgroundColor: customVariables.colorWhite,
    padding: 10
  },
  buttonBar: {
    flex: 2,
    marginEnd: 5
  },
  // TODO: remove this section after the resolution of https://www.pivotaltracker.com/story/show/172431153 */
  helpButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    height: 40,
    backgroundColor: customVariables.colorWhite,
    borderWidth: 1,
    borderColor: customVariables.brandPrimary
  },
  helpButtonIcon: {
    lineHeight: 24,
    color: customVariables.brandPrimary
  },
  helpButtonText: {
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    lineHeight: 20,
    color: customVariables.brandPrimary
  }
});

const AnimatedTabs = Animated.createAnimatedComponent(Tabs);
const AnimatedScreenContentHeader = Animated.createAnimatedComponent(
  ScreenContentHeader
);
const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "services.contextualHelpTitle",
  body: "services.contextualHelpContent"
};

class ServicesHomeScreen extends React.Component<Props, State> {
  private navListener?: NavigationEventSubscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0,
      currentTabServicesId: [],
      isLongPressEnabled: false,
      enableServices: false,
      toastErrorMessage: I18n.t("global.genericError"),
      isInnerContentRendered: false
    };
  }

  /**
   * return true if all services have INBOX channel disabled
   */
  private areAllServicesInboxChannelDisabled = (): boolean => {
    const currentTabServicesChannels = this.props.getServicesChannels(
      this.props.tabsServicesId[this.state.currentTab],
      this.props.profile
    );

    const disabledServices: number = Object.keys(
      currentTabServicesChannels
    ).filter(id => currentTabServicesChannels[id].indexOf("INBOX") !== -1)
      .length;

    return (
      disabledServices > 0 &&
      disabledServices === Object.keys(currentTabServicesChannels).length
    );
  };

  /**
   * if we are displaying the loading screen and we got no errors on loading
   * data, then we can show the content
   */
  private canRenderContent = () => {
    if (
      !this.state.isInnerContentRendered &&
      pot.isSome(this.props.visibleServicesContentLoadState) &&
      this.props.loadDataFailure === undefined
    ) {
      this.setState({ isInnerContentRendered: true });
    }
  };

  public componentDidMount() {
    // On mount, update visible services and user metadata if their
    // refresh fails
    if (pot.isError(this.props.potUserMetadata)) {
      this.props.refreshUserMetadata();
    }

    this.canRenderContent();

    if (pot.isError(this.props.visibleServicesContentLoadState)) {
      this.props.refreshVisibleServices();
    }

    // eslint-disable-next-line functional/immutable-data
    this.navListener = this.props.navigation.addListener("didFocus", () => {
      setStatusBarColorAndBackground(
        "dark-content",
        customVariables.colorWhite
      );
    }); // eslint-disable-line
  }

  private animatedTabScrollPositions: ReadonlyArray<Animated.Value> = [
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  private getHeaderHeight = (): Animated.AnimatedInterpolation =>
    this.animatedTabScrollPositions[this.state.currentTab].interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

  // TODO: evaluate if it can be replaced by the component introduced within https://www.pivotaltracker.com/story/show/168247501
  private renderServiceLoadingPlaceholder() {
    return (
      <View style={[styles.center, styles.padded, IOStyles.flex]}>
        {Platform.OS === "ios" && <View style={styles.customSpacer} />}
        <View spacer={true} extralarge={true} />
        <View spacer={true} extralarge={true} />
        <Image
          source={require("../../../img/services/icon-loading-services.png")}
        />
        <View spacer={true} extralarge={true} />
        <Text bold={true}>{I18n.t("services.loading.title")}</Text>
        <Text>{I18n.t("services.loading.subtitle")}</Text>
      </View>
    );
  }

  // eslint-disable-next-line
  public componentDidUpdate(prevProps: Props, prevState: State) {
    // if some errors occur while updating profile, we will show a message in a toast
    // profile could be updated by enabling/disabling on or more channel of a service
    if (pot.isError(this.props.profile) && !pot.isError(prevProps.profile)) {
      showToast(
        I18n.t("serviceDetail.onUpdateEnabledChannelsFailure"),
        "danger"
      );
    }

    const enableServices = this.areAllServicesInboxChannelDisabled();
    if (enableServices !== prevState.enableServices) {
      this.setState({ enableServices });
    }

    this.canRenderContent();

    if (this.state.isInnerContentRendered) {
      if (
        pot.isError(this.props.potUserMetadata) &&
        (pot.isUpdating(prevProps.potUserMetadata) ||
          pot.isLoading(prevProps.potUserMetadata))
      ) {
        // A toast is displayed if upsert userMetadata load fails
        showToast(this.state.toastErrorMessage, "danger");
      }

      if (
        pot.isLoading(prevProps.visibleServicesContentLoadState) &&
        pot.isError(this.props.visibleServicesContentLoadState)
      ) {
        // A toast is displayed if refresh visible services fails (on content or metadata load)
        showToast(this.state.toastErrorMessage, "danger");
      }
    }
  }

  private onServiceSelect = (service: ServicePublic) => {
    // when a service gets selected the service is recorded as read
    this.props.serviceDetailsLoad(service);
    this.props.navigateToServiceDetailsScreen({
      service
    });
  };

  public componentWillUnmount() {
    if (this.navListener) {
      this.navListener.remove();
    }
  }

  private renderErrorContent = () => {
    if (this.state.isInnerContentRendered) {
      return undefined;
    }

    switch (this.props.loadDataFailure) {
      case "userMetadaLoadFailure":
        return (
          <GenericErrorComponent
            onRetry={() => this.refreshScreenContent(true)}
          />
        );
      case "servicesLoadFailure":
        return <GenericErrorComponent onRetry={this.refreshScreenContent} />;
      default:
        return undefined;
    }
  };

  private renderInnerContent = () => {
    if (this.state.isInnerContentRendered) {
      return this.renderTabs();
    } else {
      return this.renderServiceLoadingPlaceholder();
    }
  };

  public render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled={true}
        style={styles.container}
      >
        <View style={styles.topScreenContainer}>
          <TopScreenComponent
            accessibilityLabel={I18n.t("services.title")}
            headerTitle={I18n.t("services.title")}
            appLogo={true}
            contextualHelpMarkdown={contextualHelpMarkdown}
            faqCategories={["services"]}
          >
            {this.renderErrorContent() ? (
              this.renderErrorContent()
            ) : this.props.isSearchEnabled ? (
              this.renderSearch()
            ) : (
              <React.Fragment>
                <AnimatedScreenContentHeader
                  title={I18n.t("services.title")}
                  iconFont={{ name: "io-home-servizi" }}
                  dynamicHeight={this.getHeaderHeight()}
                />
                {this.renderInnerContent()}
                <ServicePreferenceSummary />
              </React.Fragment>
            )}
          </TopScreenComponent>
        </View>
        <SectionStatusComponent sectionKey={"services"} />
      </KeyboardAvoidingView>
    );
  }

  /**
   * Render ServicesSearch component.
   */
  private renderSearch = () =>
    this.props.searchText
      .map(_ =>
        _.length < MIN_CHARACTER_SEARCH_TEXT ? (
          <SearchNoResultMessage errorType={"InvalidSearchBarText"} />
        ) : (
          <ServicesSearch
            sectionsState={this.props.allSections}
            onRefresh={this.refreshServices}
            navigateToServiceDetail={this.onServiceSelect}
            searchText={_}
          />
        )
      )
      .getOrElse(<SearchNoResultMessage errorType={"InvalidSearchBarText"} />);

  private refreshServices = () => {
    this.setState({
      toastErrorMessage: I18n.t("global.genericError")
    });
    this.props.refreshVisibleServices();
  };

  private refreshScreenContent = (hideToast: boolean = false) => {
    if (!hideToast) {
      this.setState({ toastErrorMessage: I18n.t("global.genericError") });
    }
    this.props.refreshUserMetadata();
    this.props.refreshVisibleServices();
  };

  private handleOnScroll = (value: number) => {
    const { currentTab, isLongPressEnabled } = this.state;
    // Disable the long press option (if displayed) when the user changes tab
    if (isLongPressEnabled && Math.abs(value - currentTab) > 0.5) {
      this.setState({
        isLongPressEnabled: false
      });
    }
  };

  private handleOnChangeTab = (evt: any) => {
    const { currentTab, isLongPressEnabled } = this.state;
    const nextTab: number = evt.i;
    const isSameTab = currentTab === nextTab;
    this.setState({
      currentTab: nextTab,
      isLongPressEnabled: isSameTab && isLongPressEnabled
    });
  };

  /**
   * Render Locals, Nationals and Other services tabs.
   */
  private renderTabs = () => {
    const {
      nationalTabSections,
      potUserMetadata,
      isLoadingServices
    } = this.props;
    const isRefreshing =
      isLoadingServices ||
      pot.isLoading(potUserMetadata) ||
      pot.isUpdating(potUserMetadata);
    return (
      <View style={IOStyles.flex}>
        <AnimatedTabs
          locked={true}
          tabContainerStyle={[styles.tabBarContainer, styles.tabBarUnderline]}
          tabBarUnderlineStyle={styles.tabBarUnderlineActive}
          onScroll={this.handleOnScroll}
          onChangeTab={this.handleOnChangeTab}
          initialPage={0}
        >
          <Tab
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            heading={I18n.t("services.tab.national")}
          >
            <ServicesTab
              sections={nationalTabSections}
              isRefreshing={isRefreshing}
              onRefresh={this.refreshScreenContent}
              onServiceSelect={this.onServiceSelect}
              tabScrollOffset={this.animatedTabScrollPositions[1]}
            />
          </Tab>
          <Tab
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            heading={I18n.t("services.tab.locals")}
          >
            <LocalServicesWebView onServiceSelect={this.onServiceSelect} />
          </Tab>
        </AnimatedTabs>
      </View>
    );
  };
}

const mapStateToProps = (state: GlobalState) => {
  const potUserMetadata = userMetadataSelector(state);
  const userMetadata = pot.getOrElse(potUserMetadata, undefined);

  const localTabSections = selectedLocalServicesSectionsSelector(state);
  const nationalTabSections = nationalServicesSectionsSelector(state);
  const allTabSections = notSelectedServicesSectionsSelector(state);

  // All visibile services organized in sections
  const allSections: ReadonlyArray<ServicesSectionState> = [
    ...localTabSections,
    ...allTabSections
  ];

  const getTabSevicesId = (tabServices: ReadonlyArray<ServicesSectionState>) =>
    tabServices.reduce(
      (acc: ReadonlyArray<string>, curr: ServicesSectionState) => {
        const sectionServices = curr.data.reduce(
          (
            acc2: ReadonlyArray<string>,
            curr2: pot.Pot<ServicePublic, Error>
          ) => {
            if (pot.isSome(curr2)) {
              return [...acc2, curr2.value.service_id];
            }
            return acc2;
          },
          []
        );
        return [...acc, ...sectionServices];
      },
      []
    );

  const tabsServicesId: { [k: number]: ReadonlyArray<string> } = {
    [0]: getTabSevicesId(nationalTabSections),
    [1]: getTabSevicesId(localTabSections),
    [2]: getTabSevicesId(allTabSections)
  };

  const visibleServicesContentLoadState = visibleServicesDetailLoadStateSelector(
    state
  );

  const isLoadingServices = pot.isLoading(visibleServicesContentLoadState);

  const servicesLoadingFailure =
    !pot.isLoading(potUserMetadata) &&
    pot.isError(visibleServicesContentLoadState);

  const loadDataFailure: DataLoadFailure = pot.isError(potUserMetadata)
    ? "userMetadaLoadFailure"
    : servicesLoadingFailure
    ? "servicesLoadFailure"
    : undefined;

  return {
    debugONLYServices: servicesSelector(state),
    isLoadingServices,
    visibleServicesContentLoadState,
    loadDataFailure,
    profile: profileSelector(state),
    visibleServices: visibleServicesSelector(state),
    readServices: readServicesByIdSelector(state),
    allSections,
    localTabSections,
    nationalTabSections,
    allTabSections,
    tabsServicesId,
    wasServiceAlertDisplayedOnce: wasServiceAlertDisplayedOnceSelector(state),
    servicesById: servicesByIdSelector(state),
    potUserMetadata,
    userMetadata,
    isSearchEnabled: isSearchServicesEnabledSelector(state),
    searchText: searchTextSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshUserMetadata: () => dispatch(userMetadataLoad.request()),
  refreshVisibleServices: () => dispatch(loadVisibleServices.request()),
  getServicesChannels: (
    servicesId: ReadonlyArray<string>,
    profile: ProfileState
  ) => getChannelsforServicesList(servicesId, profile),
  disableOrEnableServices: (
    servicesId: ReadonlyArray<string>,
    profile: ProfileState,
    enable: boolean
  ) => {
    const newBlockedChannels = getProfileChannelsforServicesList(
      servicesId,
      profile,
      enable
    );
    dispatch(
      profileUpsert.request({
        blocked_inbox_or_channels: newBlockedChannels
      })
    );
  },
  saveSelectedOrganizationItems: (
    userMetadata: UserMetadata,
    selectedItemIds: ReadonlyArray<string>
  ) => {
    const metadata = userMetadata.metadata;
    const currentVersion: number = userMetadata.version;
    dispatch(
      userMetadataUpsert.request({
        ...userMetadata,
        version: currentVersion + 1,
        metadata: {
          ...metadata,
          organizationsOfInterest: selectedItemIds
        }
      })
    );
  },
  navigateToServiceDetailsScreen: (
    params: InferNavigationParams<typeof ServiceDetailsScreen>
  ) => dispatch(navigateToServiceDetailsScreen(params)),
  serviceDetailsLoad: (service: ServicePublic) => {
    dispatch(loadServiceMetadata.request(service.service_id));
    dispatch(showServiceDetails(service));
  }
});

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: OwnProps
) => {
  // If the user updates the area of interest, the upsert of
  // the user metadata stored on backend is triggered
  const updateOrganizationsOfInterestMetadata = (
    selectedItemIds: Option<Set<string>>
  ) => {
    if (selectedItemIds.isSome() && stateProps.userMetadata) {
      const updatedAreasOfInterest = Array.from(selectedItemIds.value);
      dispatchProps.saveSelectedOrganizationItems(
        stateProps.userMetadata,
        updatedAreasOfInterest
      );
    }
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    ...{
      updateOrganizationsOfInterestMetadata
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withLightModalContext(ServicesHomeScreen));
