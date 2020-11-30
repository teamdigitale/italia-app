import { Content, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import I18n from "../i18n";
import themeVariables from "../theme/variables";
import ButtonDefaultOpacity from "./ButtonDefaultOpacity";
import { H1 } from "./core/typography/H1";
import { BaseHeader } from "./screens/BaseHeader";
import Accordion from "./ui/Accordion";
import Markdown from "./ui/Markdown";
import IconFont from "./ui/IconFont";
import FooterWithButtons from "./ui/FooterWithButtons";
import { RawCheckBox } from "./core/selection/RawCheckBox";
import { Label } from "./core/typography/Label";

type Props = {
  onClose: () => void;
  onGoBack: () => void;
  onContinue: (sharingPersonalData: boolean) => void;
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: themeVariables.contentPadding
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly"
  }
});
const continueButtonProps = (onContinue: () => void) => ({
  block: true,
  primary: true,
  onPress: onContinue,
  title: I18n.t("global.buttons.continue")
});
const CustomGoBackButton: React.FunctionComponent<{
  onPressHandler: () => void;
}> = ({ onPressHandler }) => (
  <ButtonDefaultOpacity
    accessibilityLabel={I18n.t("global.buttons.back")}
    transparent={true}
    onPress={onPressHandler}
  >
    <IconFont name={"io-back"} style={{ color: themeVariables.colorBlack }} />
  </ButtonDefaultOpacity>
);

const SendSupportTokenInfo: React.FunctionComponent<Props> = ({
  onClose,
  onGoBack,
  onContinue
}) => {
  const [sendPersonalInfo, setSendPersonalInfo] = React.useState(false);

  return (
    <>
      <BaseHeader
        accessibilityEvents={{
          avoidNavigationEventsUsage: true
        }}
        headerTitle={I18n.t("contextualHelp.title")}
        customRightIcon={{
          iconName: "io-close",
          onPress: onClose,
          accessibilityLabel: I18n.t(
            "global.accessibility.contextualHelp.close"
          )
        }}
        customGoBack={<CustomGoBackButton onPressHandler={onGoBack} />}
        showInstabugChat={false}
      />
      <Content contentContainerStyle={styles.contentContainer} noPadded={true}>
        <H1 accessible={true}>
          {I18n.t("contextualHelp.sendPersonalInfo.title")}
        </H1>
        <View spacer={true} />
        <View style={{ height: heightPercentageToDP(50) }}>
          <Markdown>
            {I18n.t("contextualHelp.sendPersonalInfo.description")}
          </Markdown>
        </View>
        <View style={styles.checkBoxContainer}>
          <RawCheckBox
            checked={sendPersonalInfo}
            onPress={() => setSendPersonalInfo(ov => !ov)}
          />
          <View hspacer={true} />
          <View style={{ flex: 1 }}>
            <Label
              color={"bluegrey"}
              weight={"Regular"}
              onPress={() => setSendPersonalInfo(ov => !ov)}
            >
              {I18n.t("contextualHelp.sendPersonalInfo.cta")}
            </Label>
            <Accordion
              title={I18n.t("contextualHelp.sendPersonalInfo.informativeTitle")}
              content={I18n.t(
                "contextualHelp.sendPersonalInfo.informativeDescription"
              )}
            />
          </View>
        </View>
      </Content>
      <View style={{ paddingBottom: 30 }}>
        <FooterWithButtons
          type={"SingleButton"}
          leftButton={continueButtonProps(() => {
            onContinue(sendPersonalInfo);
            onClose();
          })}
        />
      </View>
    </>
  );
};

export default SendSupportTokenInfo;
