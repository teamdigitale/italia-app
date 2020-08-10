import { Text, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import themeVariables from "../theme/variables";
import IconFont from "./ui/IconFont";

type Props = {
  adviceMessage: string;
  adviceIconName?: string;
  adviceIconColor?: string;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  icon: {
    marginTop: 4
  },
  text: {
    marginLeft: 8,
    paddingRight: 18,
    fontSize: themeVariables.fontSizeBase
  }
});

const iconSize = 18;
/**
 * This component displays a box with an icon and some text
 * @constructor
 */
const AdviceComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <View style={styles.container}>
      <IconFont
        style={styles.icon}
        name={props.adviceIconName || "io-notice"}
        size={iconSize}
        color={props.adviceIconColor || themeVariables.brandPrimary}
      />
      <Text style={styles.text}>{props.adviceMessage}</Text>
    </View>
  );
};

export default React.memo(AdviceComponent);
