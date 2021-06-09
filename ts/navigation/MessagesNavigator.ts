import {
  createStackNavigator,
  NavigationRouteConfigMap
} from "react-navigation";
import { euCovidCertificateEnabled } from "../config";
import EuCovidCertNavigator from "../features/euCovidCert/navigation/navigator";
import EUCOVIDCERT_ROUTES from "../features/euCovidCert/navigation/routes";
import MessageDetailScreen from "../screens/messages/MessageDetailScreen";
import MessageRouterScreen from "../screens/messages/MessageRouterScreen";
import MessagesHomeScreen from "../screens/messages/MessagesHomeScreen";
import ROUTES from "./routes";

const baseMessageRouteConfig: NavigationRouteConfigMap = {
  [ROUTES.MESSAGES_HOME]: {
    screen: MessagesHomeScreen
  },
  [ROUTES.MESSAGE_ROUTER]: {
    screen: MessageRouterScreen
  },
  [ROUTES.MESSAGE_DETAIL]: {
    screen: MessageDetailScreen
  }
};

const euCovidCertificateRouteConfig: NavigationRouteConfigMap = euCovidCertificateEnabled
  ? {
      [EUCOVIDCERT_ROUTES.MAIN]: {
        screen: EuCovidCertNavigator
      }
    }
  : {};

const messageRouteConfig: NavigationRouteConfigMap = {
  ...baseMessageRouteConfig,
  ...euCovidCertificateRouteConfig
};

const MessagesNavigator = createStackNavigator(messageRouteConfig, {
  // Let each screen handle the header and navigation
  headerMode: "none",
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
});

export default MessagesNavigator;
