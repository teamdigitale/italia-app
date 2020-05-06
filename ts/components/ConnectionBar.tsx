/**
 * A component to show a message when there is no network connection
 */
import color from "color";
import { Text } from "native-base";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../i18n";
import { ReduxProps } from "../store/actions/types";
import { networkStateSelector } from "../store/reducers/network";
import { GlobalState } from "../store/reducers/types";
import customVariables from "../theme/variables";
import IconFont from "./ui/IconFont";

type Props = ReturnType<typeof mapStateToProps> & ReduxProps;

const styles = StyleSheet.create({
  container: {
    zIndex: Platform.OS === "ios" ? 1 : undefined
  },
  inner: {
    backgroundColor: color(customVariables.brandDarkestGray)
      .fade(0.5)
      .string(),
    height: 30,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: -5, // negative index to avoid overlap with the ScreenContentHeader title
    width: "100%",
    zIndex: Platform.OS === "android" ? 1 : undefined
  },
  icon: {
    color: customVariables.colorWhite,
    marginRight: customVariables.fontSizeBase / 2
  },
  text: {
    textAlign: "center",
    color: customVariables.colorWhite,
    fontWeight: "bold"
  }
});

const ConnectionBar: React.SFC<Props> = props => {
  if (props.isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <IconFont name={"io-offline"} style={styles.icon} />
        <Text style={styles.text}>{I18n.t("connection.status.offline")}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  isConnected: networkStateSelector(state)
});

export default connect(mapStateToProps)(ConnectionBar);
