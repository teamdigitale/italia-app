/**
 * A customized Header component.
 */
import { Header, NativeBase, View } from "native-base";
import * as React from "react";
import { ColorValue, ViewProps } from "react-native";
import { connect } from "react-redux";
import ROUTES from "../../navigation/routes";
import { GlobalState } from "../../store/reducers/types";
import customVariables from "../../theme/variables";
import { getActiveRoute } from "../../utils/navigation";
import ConnectionBar from "../ConnectionBar";
import { IOColors } from "../core/variables/IOColors";

type StatusBarColorBackgroundConfig = {
  barStyle: "light-content" | "dark-content";
  backgroundColor: string;
};

type Routes = keyof typeof ROUTES;

const mapStateToProps = ({ nav }: GlobalState) => ({
  currentRoute: getActiveRoute(nav)?.routeName
});

type Props = NativeBase.Header &
  ViewProps & { backgroundColor?: ColorValue } & ReturnType<
    typeof mapStateToProps
  >;

// Let's define all the configurations
const darkGrayConfig: StatusBarColorBackgroundConfig = {
  barStyle: "light-content",
  backgroundColor: customVariables.brandDarkGray
};

const blueConfig: StatusBarColorBackgroundConfig = {
  barStyle: "light-content",
  backgroundColor: customVariables.brandPrimary
};

const defaultConfig: StatusBarColorBackgroundConfig = {
  barStyle: "dark-content",
  backgroundColor: IOColors.white
};

// Map each route to it's own status bar config
const statusBarConfigMap = new Map<Routes, StatusBarColorBackgroundConfig>([
  ["WALLET_HOME", darkGrayConfig],
  ["PROFILE_MAIN", darkGrayConfig],
  ["WALLET_BPAY_DETAIL", darkGrayConfig],
  ["WALLET_CARD_TRANSACTIONS", darkGrayConfig],
  ["WALLET_BANCOMAT_DETAIL", darkGrayConfig],
  ["WALLET_SATISPAY_DETAIL", darkGrayConfig],
  ["WALLET_BPAY_DETAIL", darkGrayConfig],
  ["WALLET_COBADGE_DETAIL", darkGrayConfig],
  ["INGRESS", blueConfig]
]);

const AppHeader = (props: React.PropsWithChildren<Props>) => {
  const { backgroundColor, barStyle } = props.currentRoute
    ? statusBarConfigMap.get(props.currentRoute as Routes) || defaultConfig
    : defaultConfig;

  const color =
    barStyle === "dark-content"
      ? customVariables.colorBlack
      : customVariables.colorWhite;

  const headerStyle = props.backgroundColor
    ? {
        backgroundColor: props.backgroundColor as string, // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46864
        color
      }
    : {
        color
      };

  return (
    <View>
      <Header
        style={headerStyle}
        androidStatusBarColor={backgroundColor}
        iosBarStyle={barStyle}
        {...props}
      />
      <ConnectionBar />
    </View>
  );
};
export default connect(mapStateToProps)(AppHeader);
