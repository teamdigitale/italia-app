/**
 * A screen that contains all the Tabs related to messages.
 */
import * as pot from "italia-ts-commons/lib/pot";
import { Tab, Tabs } from "native-base";
import * as React from "react";
import { Animated, Platform, StyleSheet } from "react-native";
import {
  NavigationEventSubscription,
  NavigationScreenProps
} from "react-navigation";
import { connect } from "react-redux";
import MessagesArchive from "../../components/messages/MessagesArchive";
import MessagesDeadlines from "../../components/messages/MessagesDeadlines";
import MessagesInbox from "../../components/messages/MessagesInbox";
import MessagesSearch from "../../components/messages/MessagesSearch";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import { ScreenContentHeader } from "../../components/screens/ScreenContentHeader";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { MIN_CHARACTER_SEARCH_TEXT } from "../../components/search/SearchButton";
import { SearchNoResultMessage } from "../../components/search/SearchNoResultMessage";
import I18n from "../../i18n";
import {
  loadMessages,
  setMessagesArchivedState
} from "../../store/actions/messages";
import { navigateToMessageDetailScreenAction } from "../../store/actions/navigation";
import { loadServiceDetail } from "../../store/actions/services";
import { Dispatch } from "../../store/actions/types";
import { lexicallyOrderedMessagesStateSelector } from "../../store/reducers/entities/messages";
import { paymentsByRptIdSelector } from "../../store/reducers/entities/payments";
import {
  servicesByIdSelector,
  ServicesByIdState
} from "../../store/reducers/entities/services/servicesById";
import {
  isSearchMessagesEnabledSelector,
  searchTextSelector
} from "../../store/reducers/search";
import { GlobalState } from "../../store/reducers/types";
import { makeFontStyleObject } from "../../theme/fonts";
import customVariables from "../../theme/variables";
import { HEADER_HEIGHT, MESSAGE_ICON_HEIGHT } from "../../utils/constants";
import { setStatusBarColorAndBackground } from "../../utils/statusBar";

type Props = NavigationScreenProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  currentTab: number;
};

const styles = StyleSheet.create({
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
  activeTextStyle: {
    ...makeFontStyleObject(Platform.select, "600"),
    fontSize: Platform.OS === "android" ? 16 : undefined,
    fontWeight: Platform.OS === "android" ? "normal" : "bold",
    color: customVariables.brandPrimary
  },
  textStyle: {
    color: customVariables.brandDarkGray
  }
});

const AnimatedScreenContentHeader = Animated.createAnimatedComponent(
  ScreenContentHeader
);

const AnimatedTabs = Animated.createAnimatedComponent(Tabs);

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "messages.contextualHelpTitle",
  body: "messages.contextualHelpContent"
};

/**
 * A screen that contains all the Tabs related to messages.
 */
class MessagesHomeScreen extends React.PureComponent<Props, State> {
  private navListener?: NavigationEventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  private animatedTabScrollPositions: ReadonlyArray<Animated.Value> = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  // It create a mostly 2 states output: it value is mostly 0 or HEADER_HEIGHT
  private getHeaderHeight = (): Animated.AnimatedInterpolation =>
    this.animatedTabScrollPositions[this.state.currentTab].interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

  private onRefreshMessages = () => {
    this.props.refreshMessages(
      this.props.lexicallyOrderedMessagesState,
      this.props.servicesById
    );
  };

  public componentDidMount() {
    this.onRefreshMessages();
    // eslint-disable-next-line functional/immutable-data
    this.navListener = this.props.navigation.addListener("didFocus", () => {
      setStatusBarColorAndBackground(
        "dark-content",
        customVariables.colorWhite
      );
    }); // eslint-disable-line
  }

  public componentWillUnmount() {
    if (this.navListener) {
      this.navListener.remove();
    }
  }

  public render() {
    const { isSearchEnabled } = this.props;

    return (
      <TopScreenComponent
        accessibilityLabel={I18n.t("messages.contentTitle")}
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={["messages"]}
        headerTitle={I18n.t("messages.contentTitle")}
        isSearchAvailable={true}
        searchType={"Messages"}
        appLogo={true}
      >
        {!isSearchEnabled && (
          <React.Fragment>
            <AnimatedScreenContentHeader
              title={I18n.t("messages.contentTitle")}
              iconFont={{ name: "io-home-messaggi", size: MESSAGE_ICON_HEIGHT }}
              dynamicHeight={this.getHeaderHeight()}
            />
            {this.renderTabs()}
          </React.Fragment>
        )}
        {isSearchEnabled && this.renderSearch()}
      </TopScreenComponent>
    );
  }

  // Disable longPress options the horizontal scroll
  // overcome the 50% of the tab width
  private handleOnTabsScroll = (value: number) => {
    const { currentTab } = this.state;
    if (Math.abs(value - currentTab) > 0.5) {
      const nextTab = currentTab + (value - currentTab > 0 ? 1 : -1);
      this.setState({
        currentTab: nextTab
      });
    }
  };

  // Update cuttentTab state when horizontal scroll is completed
  private handleOnChangeTab = (evt: any) => {
    const nextTab: number = evt.i;
    this.setState({
      currentTab: nextTab
    });
  };

  /**
   * Render Inbox, Deadlines and Archive tabs.
   */
  private renderTabs = () => {
    const {
      lexicallyOrderedMessagesState,
      servicesById,
      paymentsByRptId,
      navigateToMessageDetail,
      updateMessagesArchivedState
    } = this.props;
    return (
      <AnimatedTabs
        tabContainerStyle={[styles.tabBarContainer, styles.tabBarUnderline]}
        tabBarUnderlineStyle={styles.tabBarUnderlineActive}
        onScroll={this.handleOnTabsScroll}
        onChangeTab={this.handleOnChangeTab}
        initialPage={0}
      >
        <Tab
          activeTextStyle={styles.activeTextStyle}
          textStyle={styles.textStyle}
          heading={I18n.t("messages.tab.inbox")}
        >
          <MessagesInbox
            currentTab={this.state.currentTab}
            messagesState={lexicallyOrderedMessagesState}
            servicesById={servicesById}
            paymentsByRptId={paymentsByRptId}
            onRefresh={this.onRefreshMessages}
            setMessagesArchivedState={updateMessagesArchivedState}
            navigateToMessageDetail={navigateToMessageDetail}
            animated={{
              onScroll: Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { y: this.animatedTabScrollPositions[0] }
                  }
                }
              ]),
              scrollEventThrottle: 8
            }}
          />
        </Tab>
        <Tab
          activeTextStyle={styles.activeTextStyle}
          textStyle={styles.textStyle}
          heading={I18n.t("messages.tab.deadlines")}
        >
          <MessagesDeadlines
            currentTab={this.state.currentTab}
            messagesState={lexicallyOrderedMessagesState}
            servicesById={servicesById}
            paymentsByRptId={paymentsByRptId}
            setMessagesArchivedState={updateMessagesArchivedState}
            navigateToMessageDetail={navigateToMessageDetail}
            animated={{
              onScroll: Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { y: this.animatedTabScrollPositions[1] }
                  }
                }
              ]),
              scrollEventThrottle: 8
            }}
          />
        </Tab>

        <Tab
          activeTextStyle={styles.activeTextStyle}
          textStyle={styles.textStyle}
          heading={I18n.t("messages.tab.archive")}
        >
          <MessagesArchive
            currentTab={this.state.currentTab}
            messagesState={lexicallyOrderedMessagesState}
            servicesById={servicesById}
            paymentsByRptId={paymentsByRptId}
            onRefresh={this.onRefreshMessages}
            setMessagesArchivedState={updateMessagesArchivedState}
            navigateToMessageDetail={navigateToMessageDetail}
            animated={{
              onScroll: Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { y: this.animatedTabScrollPositions[2] }
                  }
                }
              ]),
              scrollEventThrottle: 8
            }}
          />
        </Tab>
      </AnimatedTabs>
    );
  };

  /**
   * Render MessageSearch component.
   */
  private renderSearch = () => {
    const {
      lexicallyOrderedMessagesState,
      servicesById,
      paymentsByRptId,
      navigateToMessageDetail
    } = this.props;

    return this.props.searchText
      .map(_ =>
        _.length < MIN_CHARACTER_SEARCH_TEXT ? (
          <SearchNoResultMessage errorType="InvalidSearchBarText" />
        ) : (
          <MessagesSearch
            messagesState={lexicallyOrderedMessagesState}
            servicesById={servicesById}
            paymentsByRptId={paymentsByRptId}
            onRefresh={this.onRefreshMessages}
            navigateToMessageDetail={navigateToMessageDetail}
            searchText={_}
          />
        )
      )
      .getOrElse(<SearchNoResultMessage errorType="InvalidSearchBarText" />);
  };
}

const mapStateToProps = (state: GlobalState) => ({
  lexicallyOrderedMessagesState: lexicallyOrderedMessagesStateSelector(state),
  servicesById: servicesByIdSelector(state),
  paymentsByRptId: paymentsByRptIdSelector(state),
  searchText: searchTextSelector(state),
  isSearchEnabled: isSearchMessagesEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshMessages: (
    lexicallyOrderedMessagesState: ReturnType<
      typeof lexicallyOrderedMessagesStateSelector
    >,
    servicesById: ServicesByIdState
  ) => {
    dispatch(loadMessages.request());
    // Refresh services related to messages received by the user
    if (pot.isSome(lexicallyOrderedMessagesState)) {
      lexicallyOrderedMessagesState.value.forEach(item => {
        if (servicesById[item.meta.sender_service_id] === undefined) {
          dispatch(loadServiceDetail.request(item.meta.sender_service_id));
        }
      });
    }
  },
  refreshService: (serviceId: string) => {
    dispatch(loadServiceDetail.request(serviceId));
  },
  navigateToMessageDetail: (messageId: string) =>
    dispatch(navigateToMessageDetailScreenAction({ messageId })),
  updateMessagesArchivedState: (
    ids: ReadonlyArray<string>,
    archived: boolean
  ) => dispatch(setMessagesArchivedState(ids, archived))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesHomeScreen);
