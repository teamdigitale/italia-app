import { fromNullable } from "fp-ts/lib/Option";
import { Millisecond } from "italia-ts-commons/lib/units";
import { Body, Left, Right, Text, View } from "native-base";
import { Ref } from "react";
import * as React from "react";
import { AccessibilityInfo, ColorValue, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import IconFont from "../../components/ui/IconFont";
import I18n from "../../i18n";
import { navigateBack } from "../../store/actions/navigation";
import { Dispatch } from "../../store/actions/types";
import { isPagoPATestEnabledSelector } from "../../store/reducers/persistedPreferences";
import { isSearchEnabledSelector } from "../../store/reducers/search";
import { GlobalState } from "../../store/reducers/types";
import variables from "../../theme/variables";
import { setAccessibilityFocus } from "../../utils/accessibility";
import { maybeNotNullyString } from "../../utils/strings";
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";
import GoBackButton from "../GoBackButton";
import InstabugChatsComponent from "../InstabugChatsComponent";
import SearchButton, { SearchType } from "../search/SearchButton";
import AppHeader from "../ui/AppHeader";

const styles = StyleSheet.create({
  helpButton: {
    padding: 8
  },
  noLeft: {
    marginLeft: variables.contentPadding - variables.appHeaderPaddingHorizontal
  },
  body: {
    alignItems: "center"
  }
});

export type AccessibilityEvents = {
  avoidNavigationEventsUsage?: boolean; // if true NavigationEvents won't be included and the focus will be done on componentDidMount
  disableAccessibilityFocus?: boolean; // if true the setAccessibilityFocus is not triggered
};

interface OwnProps {
  onAccessibilityNavigationHeaderFocus?: () => void;
  accessibilityEvents?: AccessibilityEvents;
  accessibilityLabel?: string; // rendered only if it is defined and a screen reader is active
  dark?: boolean;
  headerTitle?: string;
  headerBackgroundColor?: ColorValue;
  goBack?: React.ComponentProps<typeof GoBackButton>["goBack"];
  primary?: boolean;
  appLogo?: boolean;
  onShowHelp?: () => void;
  // A property to set a custom AppHeader body
  body?: React.ReactNode;
  isSearchAvailable?: boolean;
  showInstabugChat?: boolean;
  searchType?: SearchType;
  customRightIcon?: {
    iconName: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  customGoBack?: React.ReactNode;
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
type State = {
  isScreenReaderActive: boolean;
};
const setAccessibilityTimeout = 0 as Millisecond;
const noReferenceTimeout = 150 as Millisecond;
/** A component representing the properties common to all the screens (and the most of modal/overlay displayed) */
class BaseHeaderComponent extends React.PureComponent<Props, State> {
  private firstElementRef = React.createRef<View>();

  public constructor(props: Props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = { isScreenReaderActive: false };
  }

  // set accessibility focus when component is mounted
  // it should be used paired with avoidNavigationEvents === true (navigation context not available)
  public componentDidMount() {
    void AccessibilityInfo.isScreenReaderEnabled()
      .then(isScreenReaderActive => {
        this.setState({ isScreenReaderActive });
        if (
          isScreenReaderActive &&
          fromNullable(this.props.accessibilityEvents).fold(
            false,
            ({ avoidNavigationEventsUsage }) => avoidNavigationEventsUsage
          )
        ) {
          this.handleFocus();
        }
      })
      .catch(); // do nothing
  }

  get canHandleFocus() {
    return fromNullable(this.props.accessibilityEvents).fold(
      true,
      ae => ae.disableAccessibilityFocus !== true
    );
  }

  // set accessibility focus when this view comes visible
  public handleFocus() {
    if (!this.canHandleFocus) {
      return;
    }
    setTimeout(() => {
      // retry until the reference is defined
      if (this.firstElementRef === undefined) {
        this.handleFocus();
        return;
      }
      setAccessibilityFocus(
        this.firstElementRef,
        setAccessibilityTimeout,
        this.props.onAccessibilityNavigationHeaderFocus
      );
    }, noReferenceTimeout);
  }

  private renderBodyLabel = (label?: string, ref?: Ref<Text>) =>
    maybeNotNullyString(label).fold(undefined, l => {
      const isWhite = this.props.primary || this.props.dark;
      return (
        <Text
          ref={ref}
          white={isWhite}
          numberOfLines={1}
          accessible={true}
          accessibilityRole={"header"}
        >
          {l}
        </Text>
      );
    });

  public render() {
    const {
      goBack,
      customGoBack,
      headerTitle,
      body,
      isSearchEnabled,
      dark,
      accessibilityLabel
    } = this.props;

    const maybeAccessibilityLabel = maybeNotNullyString(accessibilityLabel);
    return (
      <AppHeader
        backgroundColor={this.props.headerBackgroundColor}
        primary={this.props.primary}
        noShadow={isSearchEnabled}
        dark={dark}
      >
        {this.renderLeft()}

        {/* if screen reader is active and the accessibility label is defined, render the accessibility label
          as placeholder where force focus
        */}
        {!isSearchEnabled && (
          <Body style={[goBack || customGoBack ? styles.body : styles.noLeft]}>
            {this.state.isScreenReaderActive &&
            maybeAccessibilityLabel.isSome() ? (
              this.renderBodyLabel(
                maybeAccessibilityLabel.value,
                this.firstElementRef
              )
            ) : (
              <View ref={this.firstElementRef} accessible={true}>
                {body ? body : headerTitle && this.renderBodyLabel(headerTitle)}
              </View>
            )}
          </Body>
        )}

        {this.renderRight()}
      </AppHeader>
    );
  }

  private renderRight = () => {
    const {
      isSearchEnabled,
      onShowHelp,
      isSearchAvailable,
      searchType,
      showInstabugChat,
      customRightIcon
    } = this.props;

    return (
      <Right>
        {isSearchAvailable && <SearchButton searchType={searchType} />}
        {!isSearchEnabled && showInstabugChat !== false && (
          <InstabugChatsComponent />
        )}
        {onShowHelp && !isSearchEnabled && (
          <ButtonDefaultOpacity
            onPress={onShowHelp}
            style={styles.helpButton}
            transparent={true}
            accessibilityLabel={I18n.t(
              "global.accessibility.contextualHelp.open.label"
            )}
            accessibilityHint={I18n.t(
              "global.accessibility.contextualHelp.open.hint"
            )}
          >
            <IconFont name={"io-question"} />
          </ButtonDefaultOpacity>
        )}

        {customRightIcon && !isSearchEnabled && (
          <ButtonDefaultOpacity
            onPress={customRightIcon.onPress}
            style={styles.helpButton}
            transparent={true}
            accessible={customRightIcon.accessibilityLabel !== undefined}
            accessibilityLabel={customRightIcon.accessibilityLabel}
          >
            <IconFont name={customRightIcon.iconName} />
          </ButtonDefaultOpacity>
        )}
        {fromNullable(this.props.accessibilityEvents).fold(
          true,
          ({ avoidNavigationEventsUsage }) => !avoidNavigationEventsUsage
        ) && <NavigationEvents onDidFocus={this.handleFocus} />}
      </Right>
    );
  };

  private renderGoBack = () => {
    const { goBack, dark, customGoBack } = this.props;
    return customGoBack ? (
      <Left>{customGoBack}</Left>
    ) : (
      goBack && (
        <Left>
          <GoBackButton testID={"back-button"} onPress={goBack} white={dark} />
        </Left>
      )
    );
  };

  private renderLeft = () => {
    const {
      isSearchEnabled,
      appLogo,
      primary,
      dark,
      isPagoPATestEnabled
    } = this.props;

    const iconColor = isPagoPATestEnabled
      ? variables.brandHighlight
      : primary || dark
      ? variables.colorWhite
      : variables.brandPrimary;

    return (
      !isSearchEnabled &&
      (appLogo ? (
        <Left>
          <View
            accessible={true}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          >
            <IconFont name={"io-logo"} color={iconColor} accessible={false} />
          </View>
        </Left>
      ) : (
        this.renderGoBack()
      ))
    );
  };
}

const mapStateToProps = (state: GlobalState) => ({
  isSearchEnabled: isSearchEnabledSelector(state),
  isPagoPATestEnabled: isPagoPATestEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateBack: () => {
    dispatch(navigateBack());
  }
});

export const BaseHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseHeaderComponent);
