import * as React from "react";
import { StyleSheet } from "react-native";

import { TranslationKeys } from "../../../locales/locales";
import I18n from "../../i18n";
import { openWebUrl } from "../../utils/url";
import { showToast } from "../../utils/showToast";

import { Link } from "../core/typography/Link";
import ItemSeparatorComponent from "../ItemSeparatorComponent";

const styles = StyleSheet.create({
  link: {
    paddingVertical: 16
  },
  header: {
    flexDirection: "row",
    paddingVertical: 8
  },
  icon: {
    marginRight: 3.85
  }
});

type Props = {
  text: TranslationKeys;
  href: string;
};

const LinkRow = ({ text, href }: Props) => (
  <>
    <Link
      ellipsizeMode={"tail"}
      onPress={() =>
        openWebUrl(href, () => showToast(I18n.t("global.jserror.title")))
      }
      numberOfLines={1}
      style={styles.link}
    >
      {I18n.t(text)}
    </Link>
    <ItemSeparatorComponent noPadded />
  </>
);

export default LinkRow;
