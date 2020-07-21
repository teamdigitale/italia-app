import * as React from "react";
import { BackHandler } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import I18n from "../i18n";
import variables from "../theme/variables";
import ButtonDefaultOpacity from "./ButtonDefaultOpacity";
import IconFont from "./ui/IconFont";

interface OwnProps {
  [k: string]: any;
  onPress?: () => void;
  white?: boolean;
}

type Props = NavigationInjectedProps & OwnProps;

class GoBackButton extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    white: false
  };

  public componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  private handleBackPress = () => {
    this.getOnPressHandler()();

    return true;
  };

  private handleOnPressDefault = () => this.props.navigation.goBack(null);

  private getOnPressHandler = () =>
    typeof this.props.onPress === "function"
      ? this.props.onPress
      : this.handleOnPressDefault;

  public render() {
    const { white, ...restProps } = this.props;

    const buttonProps = {
      transparent: true,
      ...restProps,
      onPress: this.getOnPressHandler()
    };

    return (
      <ButtonDefaultOpacity
        {...buttonProps}
        accessibilityLabel={I18n.t("global.buttons.back")}
        style={{ paddingLeft: 0 }}
      >
        <IconFont
          name={"io-back"}
          style={{ color: white ? variables.colorWhite : variables.colorBlack }}
        />
      </ButtonDefaultOpacity>
    );
  }
}

export default withNavigation(GoBackButton);
