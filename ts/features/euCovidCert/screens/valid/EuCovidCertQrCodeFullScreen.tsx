import { View } from "native-base";
import * as React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import I18n from "../../../../i18n";
import { useMaxBrightness } from "../../../../utils/brightness";
import { cancelButtonProps } from "../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";

type NavigationParams = Readonly<{
  qrCodeContent: string;
}>;

const styles = StyleSheet.create({
  qrCode: {
    // TODO: it's preferable to use the hook useWindowDimensions, but we need to upgrade react native
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    flex: 1
  }
});

export const EuCovidCertQrCodeFullScreen = (
  props: NavigationInjectedProps<NavigationParams>
): React.ReactElement => {
  useMaxBrightness();
  return (
    <BaseScreenComponent goBack={true}>
      <SafeAreaView
        style={IOStyles.flex}
        testID={"EuCovidCertQrCodeFullScreen"}
      >
        <ScrollView>
          <View spacer={true} extralarge={true} />
          <View spacer={true} extralarge={true} />
          <Image
            accessible={true}
            accessibilityRole={"image"}
            accessibilityLabel={I18n.t(
              "features.euCovidCertificate.valid.accessibility.qrCode"
            )}
            source={{
              uri: `data:image/png;base64,${props.navigation.getParam(
                "qrCodeContent"
              )}`
            }}
            style={styles.qrCode}
          />
        </ScrollView>
        <FooterWithButtons
          type={"SingleButton"}
          leftButton={cancelButtonProps(
            () => props.navigation.goBack(),
            I18n.t("global.buttons.close")
          )}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
