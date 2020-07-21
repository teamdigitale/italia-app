import { Millisecond } from "italia-ts-commons/lib/units";
import { Text, View } from "native-base";
import { Ref } from "react";
import * as React from "react";
import { AccessibilityInfo, StyleSheet } from "react-native";
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
import customVariables from "../../theme/variables";
import { setAccessibilityFocus } from "../../utils/accessibility";
import { maybeNotNullyString } from "../../utils/strings";
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";
import GoBackButton from "../GoBackButton";
import InstabugChatsComponent from "../InstabugChatsComponent";
import SearchButton, { SearchType } from "../search/SearchButton";
import AppHeader from "../ui/AppHeader";

const styles = StyleSheet.create({
  helpButton: {
    padding: 8,
    paddingRight: 0
  },
  noLeft: {
    marginLeft: 2
  },
  noPadRight: {
    paddingRight: 0
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8
  },
  leftItem: {
    alignSelf: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  centerItem: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  rightItem: {
    alignSelf: "center",
    justifyContent: "flex-end",
    flex: 1
  }
});

interface OwnProps {
  onAccessibilityNavigationHeaderFocus?: () => void;
  avoidNavigationEventsUsage?: boolean; // if true NavigationEvents and its events will be excluded (onDidFocus)
  accessibilityLabel?: string; // rendered only if it is defined and a screen reader is active
  dark?: boolean;
  headerTitle?: string;
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
    AccessibilityInfo.isScreenReaderEnabled()
      .then(isScreenReaderActive => {
        this.setState({ isScreenReaderActive });
        if (isScreenReaderActive && this.props.avoidNavigationEventsUsage) {
          setAccessibilityFocus(
            this.firstElementRef,
            setAccessibilityTimeout,
            this.props.onAccessibilityNavigationHeaderFocus
          );
        }
      })
      .catch(); // do nothing
  }

  // set accessibility focus when this view comes visible
  public handleFocus() {
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

  private renderHeader = () => {
    const { customGoBack, headerTitle } = this.props;

    // if customGoBack is provided or if the app is in accessibility mode only the header text will be rendered
    if (customGoBack) {
      return this.renderBodyLabel(headerTitle, false);
    }
    // if no customGoBack is provided also the header text could be press to execute goBack
    return this.renderBodyLabel(headerTitle);
  };

  private renderBodyLabel = (
    label?: string,
    accessible: boolean | undefined = undefined,
    ref?: Ref<Text>
  ) => {
    return maybeNotNullyString(label).fold(undefined, l => {
      const isWhite = this.props.primary || this.props.dark;
      return (
        <Text
          ref={ref}
          white={isWhite}
          numberOfLines={1}
          accessible={accessible}
          accessibilityRole={"header"}
        >
          {l}
        </Text>
      );
    });
  };

  public render() {
    const {
      goBack,
      headerTitle,
      body,
      isSearchEnabled,
      dark,
      accessibilityLabel
    } = this.props;

    const maybeAccessibilityLabel = maybeNotNullyString(accessibilityLabel);
    return (
      <AppHeader
        primary={this.props.primary}
        noShadow={isSearchEnabled}
        dark={dark}
      >
        <View style={styles.row}>
          {this.renderLeft()}

          {/* if screen reader is active and the accessibility label is defined, render the accessibility label
          as placeholder where force focus
        */}
          {!isSearchEnabled && (
            <View style={goBack ? {} : [styles.noLeft]}>
              <View style={goBack ? styles.centerItem : {}}>
                {this.state.isScreenReaderActive &&
                maybeAccessibilityLabel.isSome()
                  ? this.renderBodyLabel(
                      maybeAccessibilityLabel.value,
                      true,
                      this.firstElementRef
                    )
                  : body
                    ? body
                    : headerTitle && this.renderHeader()}
              </View>
            </View>
          )}

          {this.renderRight()}
        </View>
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
      customRightIcon,
      dark,
      primary
    } = this.props;

    return (
      <View style={[styles.rightItem, { flexDirection: "row" }]}>
        {!isSearchEnabled &&
          showInstabugChat !== false && (
            <InstabugChatsComponent
              color={
                dark || primary
                  ? customVariables.colorWhite
                  : customVariables.colorBlack
              }
            />
          )}
        {onShowHelp &&
          !isSearchEnabled && (
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
              <IconFont
                name={"io-question"}
                style={styles.noPadRight}
                color={
                  dark || primary
                    ? customVariables.colorWhite
                    : customVariables.colorBlack
                }
              />
            </ButtonDefaultOpacity>
          )}

        {isSearchAvailable && <SearchButton searchType={searchType} />}
        {customRightIcon &&
          !isSearchEnabled && (
            <ButtonDefaultOpacity
              onPress={customRightIcon.onPress}
              style={styles.helpButton}
              transparent={true}
              accessible={customRightIcon.accessibilityLabel !== undefined}
              accessibilityLabel={customRightIcon.accessibilityLabel}
            >
              <IconFont
                name={customRightIcon.iconName}
                color={
                  dark || primary
                    ? customVariables.colorWhite
                    : customVariables.colorBlack
                }
              />
            </ButtonDefaultOpacity>
          )}
        {!this.props.avoidNavigationEventsUsage && (
          <NavigationEvents onDidFocus={this.handleFocus} />
        )}
      </View>
    );
  };

  private renderGoBack = () => {
    const { goBack, dark, customGoBack } = this.props;
    return customGoBack ? (
      <View style={styles.leftItem}>{customGoBack}</View>
    ) : (
      goBack && (
        <View style={styles.leftItem}>
          <GoBackButton testID={"back-button"} onPress={goBack} white={dark} />
        </View>
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
        <View
          style={styles.leftItem}
          accessible={true}
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
        >
          <IconFont name={"io-logo"} color={iconColor} accessible={false} />
        </View>
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
