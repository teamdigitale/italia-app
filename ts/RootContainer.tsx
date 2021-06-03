import { Root } from "native-base";
import * as React from "react";
import {
  AppState,
  BackHandler,
  Linking,
  Platform,
  StatusBar
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import PushNotification from "react-native-push-notification";
import { initialiseInstabug } from "./boot/configureInstabug";
import configurePushNotifications from "./boot/configurePushNotification";
import FlagSecureComponent from "./components/FlagSecure";
import { LightModalRoot } from "./components/ui/LightModal";
import VersionInfoOverlay from "./components/VersionInfoOverlay";
import {
  bpdApiSitUrlPrefix,
  bpdApiUatUrlPrefix,
  bpdApiUrlPrefix,
  bpdTestOverlay,
  cgnTestOverlay,
  shouldDisplayVersionInfoOverlay
} from "./config";
import Navigation from "./navigation";
import {
  applicationChangeState,
  ApplicationState
} from "./store/actions/application";
import { navigateToDeepLink, setDeepLink } from "./store/actions/deepLink";
import { navigateBack } from "./store/actions/navigation";
import { GlobalState } from "./store/reducers/types";
import { getNavigateActionFromDeepLink } from "./utils/deepLink";

import { setLocale } from "./i18n";
import RootModal from "./screens/modal/RootModal";
import { preferredLanguageSelector } from "./store/reducers/persistedPreferences";
import { BetaTestingOverlay } from "./components/BetaTestingOverlay";
import { RTron } from "./boot/configureStoreAndPersistor";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

/**
 * The main container of the application with:
 * - the Navigator
 * - the IdentificationModal, for authenticating user after login by CIE/SPID
 * - the SystemOffModal, shown if backend is unavailable
 * - the UpdateAppModal, if the backend is not compatible with the installed app version
 * - the root for displaying light modals
 */
class RootContainer extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    /* Configure the application to receive push notifications */
    configurePushNotifications();
  }

  private handleBackButton = () => {
    this.props.navigateBack();
    return true;
  };

  private handleOpenUrlEvent = (event: { url: string }): void =>
    this.navigateToUrlHandler(event.url);

  private handleApplicationActivity = (activity: ApplicationState) =>
    this.props.applicationChangeState(activity);

  private navigateToUrlHandler = (url: string | null) => {
    if (!url) {
      return;
    }
    const action = getNavigateActionFromDeepLink(url);
    // immediately navigate to the resolved action
    this.props.setDeepLink(action, true);
  };

  private addLocalNoticationCustomCommand() {
    RTron?.onCustomCommand({
      title: "simulate EUCodiv PN",
      description:
        "create a local push notification to simulate a message with EUCovidContent",
      command: "simulate EUCodiv PN",
      handler: () => {
        const now = new Date();
        const messageId = "00000000000000000000000001";
        PushNotification.localNotificationSchedule({
          title: messageId,
          message: "test eucodiv message",
          date: new Date(now.getTime() + 10 * 1000),
          tag: "TESTEUCOVIDTAG",
          messageId
        });
      }
    });
  }

  public componentDidMount() {
    this.addLocalNoticationCustomCommand();
    initialiseInstabug();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    if (Platform.OS === "android") {
      Linking.getInitialURL()
        .then(this.navigateToUrlHandler)
        .catch(console.error); // eslint-disable-line no-console
    } else {
      Linking.addEventListener("url", this.handleOpenUrlEvent);
    }
    // boot: send the status of the application
    this.handleApplicationActivity(AppState.currentState);
    AppState.addEventListener("change", this.handleApplicationActivity);

    this.updateLocale();
    // Hide splash screen
    SplashScreen.hide();
  }

  /**
   * If preferred language is set in the Persisted Store it sets the app global Locale
   * otherwise it continues using the default locale set from the SO
   */
  private updateLocale = () =>
    this.props.preferredLanguage.map(l => {
      setLocale(l);
    });

  public componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

    if (Platform.OS === "ios") {
      Linking.removeEventListener("url", this.handleOpenUrlEvent);
    }

    AppState.removeEventListener("change", this.handleApplicationActivity);
  }

  public componentDidUpdate() {
    // FIXME: the logic here is a bit weird: there is an event handler
    //        (navigateToUrlHandler) that will dispatch a redux action for
    //        setting a "deep link" in the redux state - in turn, the update
    //        of the redux state triggers an update of the RootComponent that
    //        dispatches a navigate action from componentDidUpdate - can't we
    //        just listen for SET_DEEPLINK from a saga and dispatch the
    //        navigate action from there?
    // FIXME: how does this logic interacts with the logic that handles the deep
    //        link in the startup saga?
    const {
      deepLinkState: { deepLink, immediate }
    } = this.props;

    if (immediate && deepLink) {
      this.props.navigateToDeepLink(deepLink);
    }
    this.updateLocale();
  }

  public render() {
    // FIXME: perhaps instead of navigating to a "background"
    //        screen, we can make this screen blue based on
    //        the redux state (i.e. background)

    // if we have no information about the backend, don't force the update

    const bpdEndpointStr =
      bpdApiUrlPrefix === bpdApiSitUrlPrefix
        ? "SIT"
        : bpdApiUrlPrefix === bpdApiUatUrlPrefix
        ? "UAT"
        : "PROD";

    return (
      <Root>
        <StatusBar barStyle={"dark-content"} />
        {Platform.OS === "android" && <FlagSecureComponent />}
        <Navigation />
        {shouldDisplayVersionInfoOverlay && <VersionInfoOverlay />}
        {cgnTestOverlay && (
          <BetaTestingOverlay title="🛠️ CGN TEST VERSION 🛠️" />
        )}
        {bpdTestOverlay && (
          <BetaTestingOverlay
            title="🛠️ BPD TEST VERSION 🛠️"
            body={bpdEndpointStr}
          />
        )}
        <RootModal />
        <LightModalRoot />
      </Root>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  preferredLanguage: preferredLanguageSelector(state),
  deepLinkState: state.deepLink
});

const mapDispatchToProps = {
  applicationChangeState,
  setDeepLink,
  navigateToDeepLink,
  navigateBack
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
