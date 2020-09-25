/**
 * A screen where the user can choose to login with SPID or get more informations.
 * It includes a carousel with highlights on the app functionalities
 */
import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import JailMonkey from "jail-monkey";
import { Content, Text, View } from "native-base";
import * as React from "react";
import { Alert, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import sessionExpired from "../../../img/landing/session_expired.png";
import ButtonDefaultOpacity from "../../components/ButtonDefaultOpacity";
import CieNotSupported from "../../components/cie/CieNotSupported";
import { ContextualHelp } from "../../components/ContextualHelp";
import { DevScreenButton } from "../../components/DevScreenButton";
import { withLightModalContext } from "../../components/helpers/withLightModalContext";
import { HorizontalScroll } from "../../components/HorizontalScroll";
import { renderInfoRasterImage } from "../../components/infoScreen/imageRendering";
import { InfoScreenComponent } from "../../components/infoScreen/InfoScreenComponent";
import { LandingCardComponent } from "../../components/LandingCardComponent";
import LoadingSpinnerOverlay from "../../components/LoadingSpinnerOverlay";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../components/screens/BaseScreenComponent";
import IconFont from "../../components/ui/IconFont";
import { LightModalContextInterface } from "../../components/ui/LightModal";
import I18n from "../../i18n";
import { IdentityProvider } from "../../models/IdentityProvider";
import ROUTES from "../../navigation/routes";
import {
  idpSelected,
  resetAuthenticationState
} from "../../store/actions/authentication";
import { continueWithRootOrJailbreak } from "../../store/actions/persistedPreferences";
import { Dispatch } from "../../store/actions/types";
import { isSessionExpiredSelector } from "../../store/reducers/authentication";
import {
  hasApiLevelSupportSelector,
  hasNFCFeatureSelector,
  isCieSupportedSelector
} from "../../store/reducers/cie";
import { continueWithRootOrJailbreakSelector } from "../../store/reducers/persistedPreferences";
import { GlobalState } from "../../store/reducers/types";
import variables from "../../theme/variables";
import { ComponentProps } from "../../types/react";
import { isDevEnv } from "../../utils/environment";
import RootedDeviceModal from "../modal/RootedDeviceModal";

type Props = NavigationInjectedProps &
  LightModalContextInterface &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  isRootedOrJailbroken: Option<boolean>;
  isSessionExpired: boolean;
};

const getCards = (
  isCIEAvailable: boolean
): ReadonlyArray<ComponentProps<typeof LandingCardComponent>> => [
  {
    id: 5,
    image: require("../../../img/landing/05.png"),
    title: I18n.t("authentication.landing.card5-title"),
    content: I18n.t("authentication.landing.card5-content")
  },
  {
    id: 1,
    image: require("../../../img/landing/01.png"),
    title: I18n.t("authentication.landing.card1-title"),
    content: I18n.t("authentication.landing.card1-content")
  },
  {
    id: 2,
    image: require("../../../img/landing/02.png"),
    title: I18n.t("authentication.landing.card2-title"),
    content: I18n.t("authentication.landing.card2-content")
  },
  {
    id: 3,
    image: require("../../../img/landing/03.png"),
    title: I18n.t("authentication.landing.card3-title"),
    content: I18n.t("authentication.landing.card3-content")
  },
  {
    id: 4,
    image: isCIEAvailable
      ? require("../../../img/cie/CIE-onboarding-illustration.png")
      : require("../../../img/landing/04.png"),
    title: isCIEAvailable
      ? I18n.t("authentication.landing.loginSpidCie")
      : I18n.t("authentication.landing.card4-title"),
    content: isCIEAvailable
      ? I18n.t("authentication.landing.loginSpidCieContent")
      : I18n.t("authentication.landing.card4-content")
  }
];

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "authentication.landing.contextualHelpTitle",
  body: "authentication.landing.contextualHelpContent"
};

const styles = StyleSheet.create({
  noPadded: {
    paddingLeft: 0,
    paddingRight: 0
  },
  flex: {
    flex: 1
  },
  noCie: {
    opacity: 0.35
  }
});

const IdpCIE: IdentityProvider = {
  id: "cie",
  name: "CIE",
  logo: "",
  entityID: "cieid",
  profileUrl: ""
};

class LandingScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isRootedOrJailbroken: none, isSessionExpired: false };
  }
  public async componentDidMount() {
    const isRootedOrJailbroken = JailMonkey.isJailBroken();
    this.setState({ isRootedOrJailbroken: some(isRootedOrJailbroken) });
    if (this.props.isSessionExpired) {
      this.setState({ isSessionExpired: true });
      this.props.resetState();
    }
  }

  private displayTabletAlert() {
    Alert.alert(
      "",
      I18n.t("tablet.message"),
      [
        {
          text: I18n.t("global.buttons.continue"),
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }

  private openUnsupportedCIEModal = () => {
    this.props.showAnimatedModal(
      <ContextualHelp
        onClose={this.props.hideModal}
        title={I18n.t("authentication.landing.cie_unsupported.title")}
        body={() => (
          <CieNotSupported
            hasCieApiLevelSupport={this.props.hasCieApiLevelSupport}
            hasCieNFCFeature={this.props.hasCieNFCFeature}
          />
        )}
      />
    );
  };

  private navigateToMarkdown = () =>
    this.props.navigation.navigate(ROUTES.MARKDOWN);

  private navigateToIdpSelection = () =>
    this.props.navigation.navigate(ROUTES.AUTHENTICATION_IDP_SELECTION);

  private navigateToCiePinScreen = () => {
    if (this.props.isCieSupported) {
      this.props.dispatchIdpCieSelected();
      this.props.navigation.navigate(ROUTES.CIE_PIN_SCREEN);
    } else {
      this.openUnsupportedCIEModal();
    }
  };

  private navigateToSpidCieInformationRequest = () =>
    this.props.navigation.navigate(
      this.props.isCieSupported
        ? ROUTES.AUTHENTICATION_SPID_CIE_INFORMATION
        : ROUTES.AUTHENTICATION_SPID_INFORMATION
    );

  private renderCardComponents = () => {
    const cardProps = getCards(this.props.isCieSupported);
    return cardProps.map(p => (
      <LandingCardComponent key={`card-${p.id}`} {...p} />
    ));
  };

  private handleContinueWithRootOrJailbreak = (continueWith: boolean) => {
    this.props.dispatchContinueWithRootOrJailbreak(continueWith);
  };

  private renderLandingScreen = () => (
    <BaseScreenComponent
      contextualHelpMarkdown={contextualHelpMarkdown}
      faqCategories={
        this.props.isCieSupported
          ? ["landing_SPID", "landing_CIE"]
          : ["landing_SPID"]
      }
    >
      {isDevEnv && <DevScreenButton onPress={this.navigateToMarkdown} />}

      {this.state.isSessionExpired ? (
        <InfoScreenComponent
          title={I18n.t("authentication.landing.session_expired.title")}
          body={I18n.t("authentication.landing.session_expired.body")}
          image={renderInfoRasterImage(sessionExpired)}
        />
      ) : (
        <Content contentContainerStyle={styles.flex} noPadded={true}>
          <HorizontalScroll cards={this.renderCardComponents()} />
        </Content>
      )}

      <View footer={true}>
        <ButtonDefaultOpacity
          block={true}
          primary={true}
          iconLeft={true}
          onPress={
            this.props.isCieSupported
              ? this.navigateToCiePinScreen
              : this.navigateToIdpSelection
          }
          testID={
            this.props.isCieSupported
              ? "landing-button-login-cie"
              : "landing-button-login-spid"
          }
        >
          <IconFont
            name={this.props.isCieSupported ? "io-cie" : "io-profilo"}
            color={variables.colorWhite}
          />
          <Text>
            {this.props.isCieSupported
              ? I18n.t("authentication.landing.loginCie")
              : I18n.t("authentication.landing.loginSpid")}
          </Text>
        </ButtonDefaultOpacity>
        <View spacer={true} />
        <ButtonDefaultOpacity
          style={!this.props.isCieSupported ? styles.noCie : undefined}
          block={true}
          primary={true}
          iconLeft={true}
          onPress={
            this.props.isCieSupported
              ? this.navigateToIdpSelection
              : this.navigateToCiePinScreen
          }
          testID={
            this.props.isCieSupported
              ? "landing-button-login-spid"
              : "landing-button-login-cie"
          }
        >
          <IconFont
            name={this.props.isCieSupported ? "io-profilo" : "io-cie"}
            color={variables.colorWhite}
          />
          <Text>
            {this.props.isCieSupported
              ? I18n.t("authentication.landing.loginSpid")
              : I18n.t("authentication.landing.loginCie")}
          </Text>
        </ButtonDefaultOpacity>
        <View spacer={true} />
        <ButtonDefaultOpacity
          block={true}
          small={true}
          transparent={true}
          onPress={this.navigateToSpidCieInformationRequest}
        >
          <Text style={styles.noPadded} link={true}>
            {this.props.isCieSupported
              ? I18n.t("authentication.landing.nospid-nocie")
              : I18n.t("authentication.landing.nospid")}
          </Text>
        </ButtonDefaultOpacity>
      </View>
    </BaseScreenComponent>
  );

  // Screen displayed during the async loading of the JailMonkey.isJailBroken()
  private renderLoadingScreen = () => (
    <View style={{ flex: 1 }}>
      <LoadingSpinnerOverlay isLoading={true} />
    </View>
  );

  private chooseScreenToRender = (isRootedOrJailbroken: boolean) => {
    // if the device is compromised and the user didn't allow to continue
    // show a blocking modal
    if (isRootedOrJailbroken && !this.props.continueWithRootOrJailbreak) {
      return (
        <RootedDeviceModal
          onContinue={() => this.handleContinueWithRootOrJailbreak(true)}
          onCancel={() => this.handleContinueWithRootOrJailbreak(false)}
        />
      );
    }
    // In case of Tablet, display an alert to inform the user
    if (DeviceInfo.isTablet()) {
      this.displayTabletAlert();
    }
    // standard rendering of the landing screen
    return this.renderLandingScreen();
  };

  public render() {
    // If the async loading of the isRootedOrJailbroken is not ready, display a loading
    return this.state.isRootedOrJailbroken.fold(
      this.renderLoadingScreen(),
      // when the value isRootedOrJailbroken is ready, display the right screen based on a set of rule
      rootedOrJailbroken => this.chooseScreenToRender(rootedOrJailbroken)
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  const isCIEAuthenticationSupported = isCieSupportedSelector(state);
  const hasApiLevelSupport = hasApiLevelSupportSelector(state);
  const hasNFCFeature = hasNFCFeatureSelector(state);
  return {
    isSessionExpired: isSessionExpiredSelector(state),
    continueWithRootOrJailbreak: continueWithRootOrJailbreakSelector(state),
    isCieSupported: pot.getOrElse(isCIEAuthenticationSupported, false),
    hasCieApiLevelSupport: pot.getOrElse(hasApiLevelSupport, false),
    hasCieNFCFeature: pot.getOrElse(hasNFCFeature, false)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetState: () => dispatch(resetAuthenticationState()),
  dispatchIdpCieSelected: () => dispatch(idpSelected(IdpCIE)),
  dispatchContinueWithRootOrJailbreak: (continueWith: boolean) =>
    dispatch(continueWithRootOrJailbreak(continueWith))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLightModalContext(LandingScreen));
