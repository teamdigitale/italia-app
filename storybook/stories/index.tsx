import { addDecorator, storiesOf } from "@storybook/react-native";
import { Button, Text } from "native-base";
import React from "react";

import NBStyleProvider from "../decorators/NBStyleProvider";

// Add the StyleProvider for each story
addDecorator((getStory: any) => (
  <NBStyleProvider>{getStory()}</NBStyleProvider>
));

storiesOf("Button", module).add("Primary", () => (
  <Button primary={true}>
    <Text>A primary button</Text>
  </Button>
));
