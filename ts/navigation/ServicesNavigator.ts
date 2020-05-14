import { createStackNavigator } from "react-navigation-stack";

import ServiceDetailsScreen from "../screens/services/ServiceDetailsScreen";
import ServicesHomeScreen from "../screens/services/ServicesHomeScreen";
import ROUTES from "./routes";

const ServicesNavigator = createStackNavigator(
  {
    [ROUTES.SERVICES_HOME]: {
      screen: ServicesHomeScreen
    },
    [ROUTES.SERVICE_DETAIL]: {
      screen: ServiceDetailsScreen
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

export default ServicesNavigator;
