/**
 * A screen that contains all the Tabs related to services.
 * TODO: add placeholder on services lists https://www.pivotaltracker.com/story/show/168171009
 */
import { left } from "fp-ts/lib/Either";
import { Option, some, Some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { Tab, TabHeading, Tabs, Text } from "native-base";
import * as React from "react";
import { Animated, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { ServiceId } from "../../../definitions/backend/ServiceId";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import ChooserListContainer from "../../components/ChooserListContainer";
import { withLightModalContext } from "../../components/helpers/withLightModalContext";
import { ScreenContentHeader } from "../../components/screens/ScreenContentHeader";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import OrganizationLogo from "../../components/services/OrganizationLogo";
import ServicesSectionsList from "../../components/services/ServicesSectionsList";
import { LightModalContextInterface } from "../../components/ui/LightModal";
import Markdown from "../../components/ui/Markdown";
import I18n from "../../i18n";
import { contentServiceLoad } from "../../store/actions/content";
import { navigateToOldServiceDetailsScreen } from "../../store/actions/navigation";
import {
  loadVisibleServices,
  showServiceDetails
} from "../../store/actions/services";
import { Dispatch } from "../../store/actions/types";
import { userMetadataUpsert } from "../../store/actions/userMetadata";
import { Organization } from "../../store/reducers/entities/organizations/organizationsAll";
import {
  localServicesSectionsSelector,
  nationalServicesSectionsSelector,
  notSelectedServicesSectionsSelector,
  selectedLocalServicesSectionsSelector,
  ServicesSectionState
} from "../../store/reducers/entities/services";
import { readServicesByIdSelector } from "../../store/reducers/entities/services/readStateByServiceId";
import { GlobalState } from "../../store/reducers/types";
import {
  organizationsOfInterestSelector,
  UserMetadata,
  userMetadataSelector
} from "../../store/reducers/userMetadata";
import customVariables from "../../theme/variables";
import { InferNavigationParams } from "../../types/react";
import { getLogoForOrganization } from "../../utils/organizations";
import { isTextIncludedCaseInsensitive } from "../../utils/strings";
import OldServiceDetailsScreen from "../preferences/OldServiceDetailsScreen";

type OwnProps = NavigationScreenProps;

type ReduxMergedProps = Readonly<{
  dispatchUpdateOrganizationsOfInterestMetadata: (
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
  enableHeaderAnimation: boolean;
};

// Scroll range is directly influenced by floating header height
const SCROLL_RANGE_FOR_ANIMATION =
  customVariables.appHeaderHeight +
  (Platform.OS === "ios"
    ? isIphoneX()
      ? 18
      : getStatusBarHeight(true)
    : customVariables.spacerHeight);

const styles = StyleSheet.create({
  tabBarContainer: {
    elevation: 0,
    height: 40
  },
  tabBarContent: {
    fontSize: customVariables.fontSizeSmall
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
  }
});

const AnimatedTabs = Animated.createAnimatedComponent(Tabs);

class ServicesHomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0,
      enableHeaderAnimation: false
    };
  }

  public componentDidMount() {
    // on mount, update visible services
    this.props.refreshServices();
  }

  private animatedScrollPositions: ReadonlyArray<Animated.Value> = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  // tslint:disable-next-line: readonly-array
  private scollPositions: number[] = [0, 0, 0];

  public componentDidUpdate(_: Props, prevState: State) {
    // saving current list scroll position to enable header animation
    // when shifting between tabs
    if (prevState.currentTab !== this.state.currentTab) {
      this.animatedScrollPositions.map((__, i) => {
        // when current tab changes, listeners are not kept, so it is needed to
        // assign them again.
        this.animatedScrollPositions[i].removeAllListeners();
        this.animatedScrollPositions[i].addListener(animatedValue => {
          // tslint:disable-next-line: no-object-mutation
          this.scollPositions[i] = animatedValue.value;
        });
      });
    }
    if (!prevState.enableHeaderAnimation && !this.props.isLoading) {
      this.setState({ enableHeaderAnimation: true });
    }
  }

  private onServiceSelect = (service: ServicePublic) => {
    // when a service gets selected, before navigating to the service detail
    // screen, we issue a contentServiceLoad to refresh the service metadata

    // TODO: evaluate if it makes sense to load the service metadata also on click  (now they are previously loaded)
    this.props.contentServiceLoad(service.service_id);
    this.props.serviceDetailsLoad(service);

    this.props.navigateToOldServiceDetailsScreen({
      service
    });
  };

  /**
   * For tab Locals
   */
  private renderOrganizationLogo = (organizationFiscalCode: string) => {
    return (
      <OrganizationLogo
        logoUri={getLogoForOrganization(organizationFiscalCode)}
        imageStyle={styles.organizationLogo}
      />
    );
  };

  private organizationContainsText(item: Organization, searchText: string) {
    return isTextIncludedCaseInsensitive(item.name, searchText);
  }

  private showChooserAreasOfInterestModal = () => {
    const {
      selectableOrganizations,
      hideModal,
      selectedOrganizations,
      isLoading
    } = this.props;
    this.props.showModal(
      <ChooserListContainer<Organization>
        items={selectableOrganizations}
        initialSelectedItemIds={some(new Set(selectedOrganizations))}
        keyExtractor={(item: Organization) => item.fiscalCode}
        itemTitleExtractor={(item: Organization) => item.name}
        itemIconComponent={left((fiscalCode: string) =>
          this.renderOrganizationLogo(fiscalCode)
        )}
        onCancel={hideModal}
        onSave={this.onSaveAreasOfInterest}
        isRefreshEnabled={false}
        isRefreshing={isLoading}
        matchingTextPredicate={this.organizationContainsText}
        noSearchResultsSourceIcon={require("../../../img/services/icon-no-places.png")}
        noSearchResultsSubtitle={I18n.t("services.areasOfInterest.searchEmpty")}
      />
    );
  };

  private onSaveAreasOfInterest = (
    selectedFiscalCodes: Option<Set<string>>
  ) => {
    this.props.dispatchUpdateOrganizationsOfInterestMetadata(
      selectedFiscalCodes
    );
    this.props.hideModal();
  };

  public render() {
    return (
      <TopScreenComponent
        title={I18n.t("services.title")}
        appLogo={true}
        contextualHelp={{
          title: I18n.t("services.title"),
          body: () => <Markdown>{I18n.t("services.servicesHelp")}</Markdown>
        }}
      >
        <React.Fragment>
          <ScreenContentHeader
            title={I18n.t("services.title")}
            icon={require("../../../img/icons/services-icon.png")}
            fixed={Platform.OS === "ios"}
          />
          {this.renderTabs()}
        </React.Fragment>
      </TopScreenComponent>
    );
  }

  /**
   * Render Locals, Nationals and Other services tabs.
   */
  // tslint:disable no-big-function
  private renderTabs = () => {
    return (
      <AnimatedTabs
        tabContainerStyle={[styles.tabBarContainer, styles.tabBarUnderline]}
        tabBarUnderlineStyle={styles.tabBarUnderlineActive}
        onChangeTab={(evt: any) => {
          this.setState({ currentTab: evt.i });
        }}
        initialPage={0}
        style={
          Platform.OS === "ios" && {
            transform: [
              {
                // hasRefreshedOnceUp is used to avoid unwanted refresh of
                // animation
                translateY: this.state.enableHeaderAnimation
                  ? this.animatedScrollPositions[
                      this.state.currentTab
                    ].interpolate({
                      inputRange: [
                        0,
                        SCROLL_RANGE_FOR_ANIMATION / 2,
                        SCROLL_RANGE_FOR_ANIMATION
                      ],
                      outputRange: [
                        SCROLL_RANGE_FOR_ANIMATION,
                        SCROLL_RANGE_FOR_ANIMATION / 4,
                        0
                      ],
                      extrapolate: "clamp"
                    })
                  : SCROLL_RANGE_FOR_ANIMATION
              }
            ]
          }
        }
      >
        <Tab
          heading={
            <TabHeading>
              <Text style={styles.tabBarContent}>
                {I18n.t("services.tab.locals")}
              </Text>
            </TabHeading>
          }
        >
          <ServicesSectionsList
            isLocal={true}
            sections={this.props.localSections}
            profile={this.props.profile}
            isRefreshing={this.props.isLoading}
            onRefresh={this.props.refreshServices}
            onSelect={this.onServiceSelect}
            readServices={this.props.readServices}
            onChooserAreasOfInterestPress={this.showChooserAreasOfInterestModal}
            selectedOrganizationsFiscalCodes={
              new Set(this.props.selectedOrganizations)
            }
            animated={{
              onScroll: Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.animatedScrollPositions[0]
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              ),
              scrollEventThrottle: 8 // target is 120fps
            }}
          />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text style={styles.tabBarContent}>
                {I18n.t("services.tab.national")}
              </Text>
            </TabHeading>
          }
        >
          <ServicesSectionsList
            sections={this.props.nationalSections}
            profile={this.props.profile}
            isRefreshing={this.props.isLoading}
            onRefresh={this.props.refreshServices}
            onSelect={this.onServiceSelect}
            readServices={this.props.readServices}
            animated={{
              onScroll: Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.animatedScrollPositions[1]
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              ),
              scrollEventThrottle: 8 // target is 120fps
            }}
          />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text style={styles.tabBarContent}>
                {I18n.t("services.tab.all")}
              </Text>
            </TabHeading>
          }
        >
          <ServicesSectionsList
            sections={this.props.allServicesSections}
            profile={this.props.profile}
            isRefreshing={this.props.isLoading}
            onRefresh={this.props.refreshServices}
            onSelect={this.onServiceSelect}
            readServices={this.props.readServices}
            animated={{
              onScroll: Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.animatedScrollPositions[2]
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              ),
              scrollEventThrottle: 8 // target is 120fps
            }}
          />
        </Tab>
      </AnimatedTabs>
    );
  };
}

const mapStateToProps = (state: GlobalState) => {
  const { services } = state.entities;

  const potUserMetadata = userMetadataSelector(state);
  // TODO: disable selection of areas of interest if the user metadata are not loaded
  // (it causes the new selection is not loaded) https://www.pivotaltracker.com/story/show/168312476
  const userMetadata = pot.getOrElse(potUserMetadata, undefined);

  const isAnyServiceLoading =
    Object.keys(services.byId).find(k => {
      const oneService = services.byId[k];
      return oneService !== undefined && pot.isLoading(oneService);
    }) !== undefined;

  const isAnyServiceMetdataLoading =
    Object.keys(state.content.servicesMetadata.byId).find(k => {
      const oneService = state.content.servicesMetadata.byId[k];
      return oneService !== undefined && pot.isLoading(oneService);
    }) !== undefined;

  const isLoading =
    pot.isLoading(state.entities.services.visible) ||
    isAnyServiceLoading ||
    isAnyServiceMetdataLoading;

  const localServicesSections = localServicesSectionsSelector(state);
  const selectableOrganizations = localServicesSections.map(
    (section: ServicesSectionState) => {
      return {
        name: section.organizationName,
        fiscalCode: section.organizationFiscalCode
      };
    }
  );

  return {
    selectableOrganizations,
    selectedOrganizations: organizationsOfInterestSelector(state),
    isLoading,
    profile: state.profile,
    servicesById: state.entities.services.byId,
    readServices: readServicesByIdSelector(state),
    localSections: selectedLocalServicesSectionsSelector(state),
    nationalSections: nationalServicesSectionsSelector(state),
    allServicesSections: notSelectedServicesSectionsSelector(state),
    userMetadata
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshServices: () => dispatch(loadVisibleServices.request()),
  saveSelectedOrganizationItems: (
    userMetadata: UserMetadata,
    selectedItemIds: Some<Set<string>>
  ) => {
    const metadata = userMetadata.metadata;
    dispatch(
      userMetadataUpsert.request({
        ...userMetadata,
        // tslint:disable-next-line: no-useless-cast
        version: (userMetadata.version as number) + 1,
        metadata: {
          ...metadata,
          organizationsOfInterest: Array.from(selectedItemIds.value)
        }
      })
    );
  },
  contentServiceLoad: (serviceId: ServiceId) =>
    dispatch(contentServiceLoad.request(serviceId)),
  navigateToOldServiceDetailsScreen: (
    params: InferNavigationParams<typeof OldServiceDetailsScreen>
  ) => dispatch(navigateToOldServiceDetailsScreen(params)),
  serviceDetailsLoad: (service: ServicePublic) =>
    dispatch(showServiceDetails(service))
});

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: OwnProps
) => {
  // If the user updates the area of interest, the upsert of
  // the user metadata stored on backend is triggered
  const dispatchUpdateOrganizationsOfInterestMetadata = (
    selectedItemIds: Option<Set<string>>
  ) => {
    if (selectedItemIds.isSome() && stateProps.userMetadata) {
      dispatchProps.saveSelectedOrganizationItems(
        stateProps.userMetadata,
        selectedItemIds
      );
    }
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    ...{
      dispatchUpdateOrganizationsOfInterestMetadata
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withLightModalContext(ServicesHomeScreen));
