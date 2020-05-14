import { createStackNavigator } from "react-navigation-stack";
import MessageDetailScreen from "../screens/messages/MessageDetailScreen";
import MessagesHomeScreen from "../screens/messages/MessagesHomeScreen";
import ROUTES from "./routes";

const MessagesNavigator = createStackNavigator(
  {
    [ROUTES.MESSAGES_HOME]: {
      screen: MessagesHomeScreen
    },
    [ROUTES.MESSAGE_DETAIL]: {
      screen: MessageDetailScreen
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

export default MessagesNavigator;
