import { Toast } from "native-base";
import * as React from "react";
import Markdown from "../../../components/ui/Markdown";
import { deriveCustomHandledLink } from "../../../components/ui/Markdown/handlers/link";
import I18n from "../../../i18n";
import { clipboardSetStringWithFeedback } from "../../../utils/clipboard";
import { taskLinking } from "../../../utils/url";

export const MarkdownHandleCustomLink = (
  props: React.ComponentProps<typeof Markdown>
): React.ReactElement => (
  <Markdown
    {...props}
    onLinkClicked={(link: string) => {
      deriveCustomHandledLink(link).map(hl => {
        if (hl.schema === "copy") {
          clipboardSetStringWithFeedback(hl.value);
          return;
        }
        taskLinking(hl.url)
          .run()
          .catch(_ =>
            Toast.show({
              text: I18n.t("global.genericError"),
              type: "danger"
            })
          );
      });
    }}
  >
    {props.children}
  </Markdown>
);
