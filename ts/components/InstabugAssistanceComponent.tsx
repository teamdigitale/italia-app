import { BugReporting, Replies } from "instabug-reactnative";
import { H3, View } from "native-base";
import * as React from "react";
import I18n from "../i18n";
import AdviceComponent from "./AdviceComponent";
import ButtonWithImage from "./ButtonWithImage";
import Markdown from "./ui/Markdown";

type Props = Readonly<{
  requestAssistance: (type: BugReporting.reportType) => void;
}>;

/**
 * A component to display the buttons to access a new chat with the assistance via Instabug.
 * The logic to manage the Instabug APIs is inerithed from the withInstabugHelper HOC.
 */

const InstabugAssistanceComponent: React.FunctionComponent<Props> = ({
  requestAssistance
}) => {
  const [hasPreviousChats, setHasPreviousChats] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    Replies.hasChats(hasChats => {
      setHasPreviousChats(hasChats);
    });
  });

  return (
    <>
      <H3>{I18n.t("instabug.contextualHelp.title1")}</H3>
      <View spacer={true} />
      <Markdown>{I18n.t("instabug.contextualHelp.descriptionBug")}</Markdown>
      <View spacer={true} large={true} />
      <AdviceComponent
        text={I18n.t("instabug.contextualHelp.assistanceWorkHours")}
      />
      <View spacer={true} />
      <ButtonWithImage
        icon={"io-bug"}
        onPress={() => requestAssistance(BugReporting.reportType.bug)}
        text={I18n.t("instabug.contextualHelp.buttonBug")}
        disabled={false}
        light={true}
      />
      {hasPreviousChats && (
        <>
          <View spacer={true} />
          <Markdown>
            {I18n.t("instabug.contextualHelp.descriptionChat")}
          </Markdown>
          <View spacer={true} />
          <ButtonWithImage
            icon={""}
            onPress={() => requestAssistance(BugReporting.reportType.question)}
            text={I18n.t("instabug.contextualHelp.buttonChat")}
            disabled={false}
            light={true}
          />
        </>
      )}
    </>
  );
};

export default InstabugAssistanceComponent;
