import { NavigationRouteConfigMap } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { environment } from "../config";
import CardSelectionScreen from "../screens/authentication/CardSelectionScreen";
import CieAuthorizeDataUsageScreen from "../screens/authentication/cie/CieAuthorizeDataUsageScreen";
import CieCardReaderScreen from "../screens/authentication/cie/CieCardReaderScreen";
import CieConsentDataUsageScreen from "../screens/authentication/cie/CieConsentDataUsageScreen";
import CieExpiredOrInvalidScreen from "../screens/authentication/cie/CieExpiredOrInvalidScreen";
import CiePinLockedTemporarilyScreen from "../screens/authentication/cie/CiePinLockedTemporarilyScreen";
import CiePinScreen from "../screens/authentication/cie/CiePinScreen";
import CieWrongCiePinScreen from "../screens/authentication/cie/CieWrongCiePinScreen";
import IdpLoginScreen from "../screens/authentication/IdpLoginScreen";
import IdpSelectionScreen from "../screens/authentication/IdpSelectionScreen";
import LandingScreen from "../screens/authentication/LandingScreen";
import SpidCIEInformationScreen from "../screens/authentication/SpidCIEInformationScreen";
import SpidInformationScreen from "../screens/authentication/SpidInformationScreen";
import MarkdownScreen from "../screens/development/MarkdownScreen";
import ROUTES from "./routes";

// Routes loaded in production mode
const productionRouteConfigMap: NavigationRouteConfigMap = {
  [ROUTES.AUTHENTICATION_LANDING]: {
    screen: LandingScreen
  },
  [ROUTES.AUTHENTICATION_IDP_SELECTION]: {
    screen: IdpSelectionScreen
  },
  [ROUTES.AUTHENTICATION_CIE]: {
    screen: CardSelectionScreen
  },
  [ROUTES.AUTHENTICATION_IDP_LOGIN]: {
    screen: IdpLoginScreen
  },
  [ROUTES.AUTHENTICATION_SPID_INFORMATION]: {
    screen: SpidInformationScreen
  },
  [ROUTES.AUTHENTICATION_SPID_CIE_INFORMATION]: {
    screen: SpidCIEInformationScreen
  },
  [ROUTES.MARKDOWN]: {
    screen: MarkdownScreen
  },
  // For expired cie screen
  [ROUTES.CIE_EXPIRED_SCREEN]: {
    screen: CieExpiredOrInvalidScreen
  },
  [ROUTES.CIE_PIN_SCREEN]: {
    screen: CiePinScreen
  },
  [ROUTES.CIE_AUTHORIZE_USAGE_SCREEN]: {
    screen: CieAuthorizeDataUsageScreen
  },
  [ROUTES.CIE_CARD_READER_SCREEN]: {
    screen: CieCardReaderScreen
  },
  [ROUTES.CIE_CONSENT_DATA_USAGE]: {
    screen: CieConsentDataUsageScreen
  },
  [ROUTES.CIE_WRONG_PIN_SCREEN]: {
    screen: CieWrongCiePinScreen
  },
  [ROUTES.CIE_PIN_TEMP_LOCKED_SCREEN]: {
    screen: CiePinLockedTemporarilyScreen
  }
};

// Routes loaded on development mode
const developmentRouteConfigMap: NavigationRouteConfigMap = {
  ...productionRouteConfigMap,
  [ROUTES.MARKDOWN]: {
    screen: MarkdownScreen
  }
};

/**
 * The authentication related stack of screens of the application.
 */
const navigator = createStackNavigator(
  environment === "DEV" ? developmentRouteConfigMap : productionRouteConfigMap,
  {
    // Let each screen handle the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default navigator;
