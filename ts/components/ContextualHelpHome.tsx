import { BugReporting } from "instabug-reactnative";
import { Content, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import I18n from "../i18n";
import themeVariables from "../theme/variables";
import { ContextualHelpData } from "./ContextualHelpModal";
import { H3 } from "./core/typography/H3";
import FAQComponent from "./FAQComponent";
import InstabugAssistanceComponent from "./InstabugAssistanceComponent";
import { BaseHeader } from "./screens/BaseHeader";
import BetaBannerComponent from "./screens/BetaBannerComponent";
import { EdgeBorderComponent } from "./screens/EdgeBorderComponent";
import ActivityIndicator from "./ui/ActivityIndicator";

const styles = StyleSheet.create({
  contentContainer: {
    padding: themeVariables.contentPadding
  }
});

type HomeProps = {
  onClose: () => void;
  contextualHelpData: ContextualHelpData;
  isContentLoaded: boolean | undefined;
  onLinkClicked?: (url: string) => void;
  onRequestAssistance: (reportType: BugReporting.reportType) => void;
};

const ContextualHelpHome: React.FunctionComponent<HomeProps> = ({
  onClose,
  contextualHelpData,
  isContentLoaded,
  onLinkClicked,
  onRequestAssistance
}) => (
  <>
    <BaseHeader
      accessibilityEvents={{
        avoidNavigationEventsUsage: true
      }}
      headerTitle={I18n.t("contextualHelp.title")}
      customRightIcon={{
        iconName: "io-close",
        onPress: onClose,
        accessibilityLabel: I18n.t("global.accessibility.contextualHelp.close")
      }}
    />

    {!contextualHelpData.content && (
      <View centerJustified={true}>
        <ActivityIndicator color={themeVariables.brandPrimaryLight} />
      </View>
    )}
    {contextualHelpData.content && (
      <Content contentContainerStyle={styles.contentContainer} noPadded={true}>
        <H3 accessible={true}>{contextualHelpData.title}</H3>
        <View spacer={true} />
        {contextualHelpData.content}
        <View spacer={true} />
        {contextualHelpData.faqs && isContentLoaded && (
          <FAQComponent
            onLinkClicked={onLinkClicked}
            faqs={contextualHelpData.faqs}
          />
        )}
        {isContentLoaded && (
          <>
            <View spacer={true} extralarge={true} />
            <InstabugAssistanceComponent
              requestAssistance={reportType => onRequestAssistance(reportType)}
            />
          </>
        )}
        {isContentLoaded && <EdgeBorderComponent />}
      </Content>
    )}
    <BetaBannerComponent />
  </>
);

export default ContextualHelpHome;
