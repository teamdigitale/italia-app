import { createStackNavigator } from "react-navigation-stack";

import EmailInsertScreen from "../screens/onboarding/EmailInsertScreen";
import EmailReadScreen from "../screens/onboarding/EmailReadScreen";
import FingerprintScreen from "../screens/onboarding/FingerprintScreen";
import PinScreen from "../screens/onboarding/PinScreen";
import TosScreen from "../screens/onboarding/TosScreen";
import ROUTES from "./routes";

/**
 * The onboarding related stack of screens of the application.
 */
const navigator = createStackNavigator(
  {
    [ROUTES.ONBOARDING_TOS]: {
      screen: TosScreen
    },
    [ROUTES.ONBOARDING_PIN]: {
      screen: PinScreen
    },
    [ROUTES.ONBOARDING_FINGERPRINT]: {
      screen: FingerprintScreen
    },
    [ROUTES.INSERT_EMAIL_SCREEN]: {
      screen: EmailInsertScreen
    },
    [ROUTES.READ_EMAIL_SCREEN]: {
      screen: EmailReadScreen
    }
  },
  {
    // Let each screen handle the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default navigator;
