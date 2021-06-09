import React from "react";
import { StyleSheet } from "react-native";
import IconFont from "../../../components/ui/IconFont";
import ButtonDefaultOpacity from "../../../components/ButtonDefaultOpacity";
import { Label } from "../../../components/core/typography/Label";
import { IOColors } from "../../../components/core/variables/IOColors";
import I18n from "../../../i18n";
import { IOStyles } from "../../../components/core/variables/IOStyles";

type Props = {
  onPress?: () => void;
};

const styles = StyleSheet.create({
  label: {
    marginLeft: 2,
    marginBottom: 4,
    height: 21
  }
});

// "View" button with qrCode icon
export const ViewEUCovidButton = (props: Props) => (
  <ButtonDefaultOpacity
    onPress={props.onPress}
    xsmall={true}
    bordered={false}
    style={IOStyles.flex}
  >
    <IconFont name={"io-qr"} color={IOColors.white} />
    <Label color={"white"} style={styles.label}>
      {I18n.t("features.euCovidCertificate.listItem.cta")}
    </Label>
  </ButtonDefaultOpacity>
);
