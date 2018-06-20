import { StyleProvider } from "native-base";
import * as React from "react";

import theme from "../../ts/theme";

/**
 * A story decorator that wraps all in the native-base StyleProvider component.
 */
const NBStyleProvider: React.SFC<{}> = props => {
  return <StyleProvider style={theme()}>{props.children}</StyleProvider>;
};

export default NBStyleProvider;
