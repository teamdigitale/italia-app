import { Omit } from "italia-ts-commons/lib/types";
import React from "react";

import Markdown, { MarkdownProps } from "../Markdown";

type Props = Omit<MarkdownProps, "cssStyle">;

const MESSAGE_CSS_STYLE = `
body {
  font-size: 16px;
}
`;

const MessageMarkdown: React.SFC<Props> = props => (
  <Markdown {...props} cssStyle={MESSAGE_CSS_STYLE} />
);

export default MessageMarkdown;
