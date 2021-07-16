import * as React from "react";
import { StyleSheet, View } from "react-native";

import { TranslationKeys } from "../../../locales/locales";
import I18n from "../../i18n";

import IconFont from "../ui/IconFont";
import { H3 } from "../core/typography/H3";
import { IOColors } from "../core/variables/IOColors";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center"
  },
  icon: {
    marginRight: 8
  }
});

type Props = {
  iconName: string;
  title: TranslationKeys;
};

/**
 * Renders a header for any section in the service's details page
 */
const sectionHeader: React.FC<Props> = ({ iconName, title }) => (
  <View style={styles.header}>
    <IconFont
      name={iconName}
      color={IOColors.bluegrey}
      style={styles.icon}
      size={18}
    />
    <H3 weight={"SemiBold"} color={"bluegrey"} accessibilityRole={"header"}>
      {I18n.t(title)}
    </H3>
  </View>
);

export default sectionHeader;
