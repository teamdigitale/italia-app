/**
 * A screen to display the email address used by IO
 * The _isFromProfileSection_ navigation parameter let the screen being adapted
 * if:
 * - it is displayed during the user onboarding
 * - it is displayed after the onboarding (navigation from the profile section)
 */
import * as pot from "italia-ts-commons/lib/pot";
import { Text, View } from "native-base";
import * as React from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import { NavigationScreenProps, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { withLoadingSpinner } from "../../components/helpers/withLoadingSpinner";
import { withValidatedEmail } from "../../components/helpers/withValidatedEmail";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import ScreenContent from "../../components/screens/ScreenContent";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import SectionStatusComponent from "../../components/SectionStatusComponent";
import {
  SingleButton,
  TwoButtonsInlineHalf
} from "../../components/ui/BlockButtons";
import FooterWithButtons from "../../components/ui/FooterWithButtons";
import IconFont from "../../components/ui/IconFont";
import I18n from "../../i18n";
import {
  navigateBack,
  navigateToEmailInsertScreen
} from "../../store/actions/navigation";
import {
  abortOnboarding,
  emailAcknowledged
} from "../../store/actions/onboarding";
import { Dispatch, ReduxProps } from "../../store/actions/types";
import { isOnboardingCompletedSelector } from "../../store/reducers/navigationHistory";
import {
  profileEmailSelector,
  profileSelector
} from "../../store/reducers/profile";
import { GlobalState } from "../../store/reducers/types";
import { userMetadataSelector } from "../../store/reducers/userMetadata";
import customVariables from "../../theme/variables";

type Props = ReduxProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NavigationScreenProps;

const styles = StyleSheet.create({
  emailWithIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  content: {
    paddingHorizontal: customVariables.contentPadding,
    backgroundColor: customVariables.contentBackground,
    flex: 1
  },
  spacerSmall: { height: 12 },
  spacerLarge: { height: 24 },
  email: {
    fontWeight: customVariables.h1FontWeight,
    color: customVariables.h1Color,
    fontSize: 18,
    marginLeft: 8
  },
  icon: {
    marginTop: Platform.OS === "android" ? 3 : 0 // correct icon position to align it with baseline of email text}
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "profile.data.email.contextualHelpTitle",
  body: "profile.data.email.contextualHelpContent"
};

export class EmailReadScreen extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  get isFromProfileSection() {
    return this.props.isOnboardingCompleted;
  }

  private handleGoBack() {
    if (this.isFromProfileSection) {
      this.props.navigateBack();
    } else {
      Alert.alert(
        I18n.t("onboarding.alert.title"),
        I18n.t("onboarding.alert.description"),
        [
          {
            text: I18n.t("global.buttons.cancel"),
            style: "cancel"
          },
          {
            text: I18n.t("global.buttons.exit"),
            style: "default",
            onPress: this.props.abortOnboarding
          }
        ]
      );
    }
  }

  public render() {
    const { isFromProfileSection } = this;
    const { isOnboardingCompleted } = this.props;
    const footerProps1: SingleButton = {
      type: "SingleButton",
      leftButton: {
        bordered: true,
        title: I18n.t("email.edit.cta"),
        onPress: this.props.navigateToEmailInsertScreen
      }
    };
    const footerProps2: TwoButtonsInlineHalf = {
      type: "TwoButtonsInlineHalf",
      leftButton: {
        block: true,
        bordered: true,
        title: I18n.t("email.edit.cta"),
        onPress: () => {
          if (!isOnboardingCompleted) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [navigateToEmailInsertScreen()]
            });
            this.props.navigation.dispatch(resetAction);
            return;
          }
          this.props.navigateToEmailInsertScreen();
        }
      },
      rightButton: {
        block: true,
        primary: true,
        title: I18n.t("global.buttons.continue"),
        onPress: this.props.acknowledgeEmail
      }
    };

    return (
      <TopScreenComponent
        goBack={this.handleGoBack}
        headerTitle={I18n.t("profile.data.list.email")}
        contextualHelpMarkdown={contextualHelpMarkdown}
      >
        <ScreenContent
          title={I18n.t("email.read.title")}
          subtitle={
            isFromProfileSection ? undefined : I18n.t("email.insert.subtitle")
          }
        >
          <View style={styles.content}>
            <Text>{I18n.t("email.insert.label")}</Text>
            <View style={styles.spacerSmall} />
            <View style={styles.emailWithIcon}>
              <IconFont
                name="io-envelope"
                accessible={true}
                accessibilityLabel={I18n.t("email.read.title")}
                size={24}
                style={styles.icon}
              />
              <Text style={styles.email}>
                {this.props.optionEmail.getOrElse("GIGI")}
              </Text>
            </View>
            <View style={styles.spacerLarge} />
            <Text>
              {isFromProfileSection
                ? `${I18n.t("email.read.details")}`
                : I18n.t("email.read.info")}
            </Text>
          </View>
        </ScreenContent>
        <SectionStatusComponent sectionKey={"email_validation"} />
        <FooterWithButtons
          {...(isFromProfileSection ? footerProps1 : footerProps2)}
        />
      </TopScreenComponent>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  const isOnboardingCompleted = isOnboardingCompletedSelector(state);
  const potUserMetadata = userMetadataSelector(state);

  // If the screen is displayed as last item of the onboarding ,show loading spinner
  // until the user metadata load is completed
  const isLoading = !isOnboardingCompleted && pot.isLoading(potUserMetadata);
  return {
    optionProfile: pot.toOption(profileSelector(state)),
    optionEmail: profileEmailSelector(state),
    isOnboardingCompleted,
    isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acknowledgeEmail: () => dispatch(emailAcknowledged()),
  abortOnboarding: () => dispatch(abortOnboarding()),
  navigateToEmailInsertScreen: () => {
    dispatch(navigateToEmailInsertScreen());
  },
  navigateBack: () => {
    dispatch(navigateBack());
  }
});

export default withValidatedEmail(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLoadingSpinner(EmailReadScreen))
);
