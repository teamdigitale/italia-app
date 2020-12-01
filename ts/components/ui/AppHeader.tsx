/**
 * A customized Header component.
 */
import { Header, NativeBase, View } from "native-base";
import * as React from "react";
import { ColorValue, ViewProps } from "react-native";
import variables from "../../theme/variables";
import ConnectionBar from "../ConnectionBar";

type Props = NativeBase.Header & ViewProps & { backgroundColor?: ColorValue };

const AppHeader = (props: React.PropsWithChildren<Props>) => (
  <View>
    <Header
      style={
        props.backgroundColor
          ? { backgroundColor: props.backgroundColor }
          : undefined
      }
      androidStatusBarColor={variables.androidStatusBarColor}
      iosBarStyle={"dark-content"}
      {...props}
    />
    <ConnectionBar />
  </View>
);

export default AppHeader;
