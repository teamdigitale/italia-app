import { AppRegistry } from "react-native";
import { configure, getStorybookUI } from "@storybook/react-native";

// Import stories
configure(() => {
  require("./stories");
}, module);

// Create the Storybook main component.
const StorybookUIRoot = getStorybookUI({ port: 9001, onDeviceUI: true });

AppRegistry.registerComponent("ItaliaApp", () => StorybookUIRoot);
export default StorybookUIRoot;
