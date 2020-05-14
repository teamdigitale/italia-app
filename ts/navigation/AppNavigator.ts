import { createStackNavigator } from "react-navigation-stack";

import BackgroundScreen from "../screens/BackgroundScreen";
import IngressScreen from "../screens/IngressScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import MainNavigator from "./MainNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import ROUTES from "./routes";

import { Easing } from "react-native";

// FIXME: we should be able to skip the blue background
//        fading in and out when restoring the app by looking
//        at the scene stack
const transitionConfig = {
  animation: "timing",
  config: {
    duration: 0,
    easing: Easing.step0
  }
};

/**
 * The main stack of screens of the Application.
 */
const navigator = createStackNavigator(
  {
    [ROUTES.INGRESS]: {
      // This is the first screen that gets loaded by the app navigator
      // On component mount, the screen will dispatch an
      // APPLICATION_INITIALIZED action that gets handled by the startup saga.
      screen: IngressScreen
    },
    [ROUTES.BACKGROUND]: {
      screen: BackgroundScreen
    },
    [ROUTES.AUTHENTICATION]: {
      // The navigator used during authentication
      screen: AuthenticationNavigator
    },
    [ROUTES.ONBOARDING]: {
      // The navigator user during onboarding for authenticated users
      screen: OnboardingNavigator
    },
    [ROUTES.MAIN]: {
      // The navigator used for authenticated users on onboarding completed
      screen: MainNavigator
    }
  },
  {
    // Let each screen handle the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false,
      transitionSpec: {
        open: transitionConfig,
        close: transitionConfig
      }
    }
  }
);

export default navigator;
