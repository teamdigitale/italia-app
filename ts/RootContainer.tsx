/**
 * The main container of the application with the IdentificationModal and the Navigator
 */
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
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
import { initialiseInstabug } from "./boot/configureInstabug";
import configurePushNotifications from "./boot/configurePushNotification";
import FlagSecureComponent from "./components/FlagSecure";
import { LightModalRoot } from "./components/ui/LightModal";
import VersionInfoOverlay from "./components/VersionInfoOverlay";
import { shouldDisplayVersionInfoOverlay } from "./config";
import IdentificationModal from "./IdentificationModal";
import Navigation from "./navigation";
import {
  applicationChangeState,
  ApplicationState
} from "./store/actions/application";
import { navigateToDeepLink, setDeepLink } from "./store/actions/deepLink";
import { navigateBack } from "./store/actions/navigation";
import { networkStateUpdate } from "./store/actions/network";
import { isBackendServicesStatusOffSelector } from "./store/reducers/backendStatus";
import { GlobalState } from "./store/reducers/types";
import SystemOffModal from "./SystemOffModal";
import UpdateAppModal from "./UpdateAppModal";
import { getNavigateActionFromDeepLink } from "./utils/deepLink";

import { fromNullable } from "fp-ts/lib/Option";
import { serverInfoDataSelector } from "./store/reducers/backendInfo";
// Check min version app supported
import { isUpdateNeeded } from "./utils/appVersion";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class RootContainer extends React.PureComponent<Props> {
  public netInfoSubscription?: NetInfoSubscription;
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

  public componentDidMount() {
    initialiseInstabug();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    if (Platform.OS === "android") {
      Linking.getInitialURL()
        .then(this.navigateToUrlHandler)
        .catch(console.error); // tslint:disable-line:no-console
    } else {
      Linking.addEventListener("url", this.handleOpenUrlEvent);
    }
    // boot: send the status of the application
    this.handleApplicationActivity(AppState.currentState);
    AppState.addEventListener("change", this.handleApplicationActivity);
    // Hide splash screen
    SplashScreen.hide();

    // tslint:disable-next-line: no-object-mutation
    this.netInfoSubscription = NetInfo.addEventListener(state => {
      this.props.networkStateUpdate(state.isConnected);
    });
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

    if (Platform.OS === "ios") {
      Linking.removeEventListener("url", this.handleOpenUrlEvent);
    }

    AppState.removeEventListener("change", this.handleApplicationActivity);

    if (this.netInfoSubscription) {
      this.netInfoSubscription();
    }
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
  }

  private get getModal() {
    // avoid app usage if backend systems are OFF
    if (this.props.isBackendServicesStatusOff) {
      return <SystemOffModal />;
    }
    const isAppOutOfDate = fromNullable(this.props.backendInfo)
      .map(bi => isUpdateNeeded(bi, "min_app_version"))
      .getOrElse(false);
    // if the app is out of date, force a screen to update it
    if (isAppOutOfDate) {
      return <UpdateAppModal />;
    }
    return <IdentificationModal />;
  }

  public render() {
    // FIXME: perhaps instead of navigating to a "background"
    //        screen, we can make this screen blue based on
    //        the redux state (i.e. background)

    // if we have no information about the backend, don't force the update

    return (
      <Root>
        <StatusBar barStyle={"dark-content"} />
        {Platform.OS === "android" && (
          <FlagSecureComponent
            isFlagSecureEnabled={!this.props.isDebugModeEnabled}
          />
        )}
        <Navigation />
        {shouldDisplayVersionInfoOverlay && <VersionInfoOverlay />}
        {this.getModal}
        <LightModalRoot />
      </Root>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  deepLinkState: state.deepLink,
  isDebugModeEnabled: state.debug.isDebugModeEnabled,
  isBackendServicesStatusOff: isBackendServicesStatusOffSelector(state),
  backendInfo: serverInfoDataSelector(state)
});

const mapDispatchToProps = {
  applicationChangeState,
  setDeepLink,
  navigateToDeepLink,
  navigateBack,
  networkStateUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
