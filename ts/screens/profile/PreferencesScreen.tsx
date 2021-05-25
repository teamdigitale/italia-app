/**
 * Implements the preferences screen where the user can see and update his
 * email, mobile number, preferred language, biometric recognition usage and digital address.
 */
import { fromNullable } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { List } from "native-base";
import * as React from "react";
import { Alert } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { withLightModalContext } from "../../components/helpers/withLightModalContext";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import ListItemComponent from "../../components/screens/ListItemComponent";
import ScreenContent from "../../components/screens/ScreenContent";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { LightModalContextInterface } from "../../components/ui/LightModal";
import I18n from "../../i18n";
import {
  navigateToCalendarPreferenceScreen,
  navigateToEmailForwardingPreferenceScreen,
  navigateToLanguagePreferenceScreen
} from "../../store/actions/navigation";
import { Dispatch, ReduxProps } from "../../store/actions/types";
import {
  isCustomEmailChannelEnabledSelector,
  preferredLanguageSelector
} from "../../store/reducers/persistedPreferences";
import {
  isEmailEnabledSelector,
  isInboxEnabledSelector,
  profileMobilePhoneSelector,
  profileSpidEmailSelector
} from "../../store/reducers/profile";
import { GlobalState } from "../../store/reducers/types";
import { openAppSettings } from "../../utils/appSettings";
import {
  checkAndRequestPermission,
  convertLocalCalendarName
} from "../../utils/calendar";
import {
  getLocalePrimary,
  getLocalePrimaryWithFallback
} from "../../utils/locale";
type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  ReduxProps &
  LightModalContextInterface;

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "profile.preferences.contextualHelpTitle",
  body: "profile.preferences.contextualHelpContent"
};

/**
 * Translates the primary languages of the provided locales.
 *
 * If a locale is not in the XX-YY format, it will be skipped.
 * If the primary language of a locale doesn't have a translation,
 * it gets returned verbatim.
 */
function translateLocale(locale: string): string {
  return getLocalePrimary(locale)
    .map(l => I18n.t(`locales.${l}`, { defaultValue: l }))
    .getOrElse(locale);
}

class PreferencesScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private checkPermissionThenGoCalendar = () => {
    void checkAndRequestPermission()
      .then(calendarPermission => {
        if (calendarPermission.authorized) {
          this.props.navigateToCalendarPreferenceScreen();
        } else if (!calendarPermission.asked) {
          // Authorized is false (denied, restricted or undetermined)
          // If the user denied permission previously (not in this session)
          // prompt an alert to inform that his calendar permissions could have been turned off
          Alert.alert(
            I18n.t("global.genericAlert"),
            I18n.t("messages.cta.calendarPermDenied.title"),
            [
              {
                text: I18n.t("messages.cta.calendarPermDenied.cancel"),
                style: "cancel"
              },
              {
                text: I18n.t("messages.cta.calendarPermDenied.ok"),
                style: "default",
                onPress: () => {
                  // open app settings to turn on the calendar permissions
                  openAppSettings();
                }
              }
            ],
            { cancelable: true }
          );
        }
      })
      .catch();
  };

  private getEmailForwardPreferencesSubtitle = (): string => {
    if (!this.props.isInboxEnabled || !this.props.isEmailEnabled) {
      return I18n.t("send_email_messages.options.disable_all.label");
    }
    return pot.getOrElse(
      pot.map(this.props.isCustomEmailChannelEnabled, enabled =>
        enabled
          ? I18n.t("send_email_messages.options.by_service.label")
          : I18n.t("send_email_messages.options.enable_all.label")
      ),
      I18n.t("send_email_messages.options.enable_all.label")
    );
  };

  public render() {
    // FIXME: MOVE LOGIC INTO PROFILE DATA SCREEN
    // const maybeSpidEmail = this.props.optionSpidEmail;
    // const maybePhoneNumber = this.props.optionMobilePhone;

    const language = this.props.preferredLanguage.fold(
      translateLocale(getLocalePrimaryWithFallback()),
      l => translateLocale(l)
    );

    // FIXME: MOVE LOGIC INTO PROFILE DATA SCREEN
    // const showModal = (title: TranslationKeys, body: TranslationKeys) => {
    //   this.props.showModal(
    //     <ContextualHelp
    //       onClose={this.props.hideModal}
    //       title={I18n.t(title)}
    //       body={() => <Markdown>{I18n.t(body)}</Markdown>}
    //     />
    //   );
    // };

    // const showSpidEmailModal = () =>
    //   showModal(
    //     "profile.preferences.spid_email.contextualHelpTitle",
    //     "profile.preferences.spid_email.contextualHelpContent"
    //   );

    return (
      <TopScreenComponent
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={["profile", "privacy", "authentication_SPID"]}
        goBack={true}
      >
        <ScreenContent
          title={I18n.t("profile.preferences.title")}
          subtitle={I18n.t("profile.preferences.subtitle")}
        >
          <List withContentLateralPadding={true}>
            <ListItemComponent
              onPress={this.checkPermissionThenGoCalendar}
              title={I18n.t(
                "profile.preferences.list.preferred_calendar.title"
              )}
              subTitle={
                this.props.preferredCalendar
                  ? convertLocalCalendarName(this.props.preferredCalendar.title)
                  : I18n.t(
                      "profile.preferences.list.preferred_calendar.not_selected"
                    )
              }
            />

            <ListItemComponent
              title={I18n.t("send_email_messages.title")}
              subTitle={this.getEmailForwardPreferencesSubtitle()}
              onPress={this.props.navigateToEmailForwardingPreferenceScreen}
            />

            {/*    // FIXME: MOVE LOGIC INTO PROFILE DATA SCREEN */}
            {/* {
              // Check if spid email exists
              maybeSpidEmail.isSome() && (
                <ListItemComponent
                  title={I18n.t("profile.preferences.list.spid_email")}
                  subTitle={maybeSpidEmail.value}
                  onPress={showSpidEmailModal}
                />
              )
            }

            {
              // Check if mobile phone exists
              maybePhoneNumber.isSome() && (
                <ListItemComponent
                  title={I18n.t("profile.preferences.list.mobile_phone")}
                  subTitle={maybePhoneNumber.value}
                  onPress={showSpidEmailModal}
                />
              )
            } */}

            <ListItemComponent
              title={I18n.t("profile.preferences.list.language")}
              subTitle={language}
              onPress={this.props.navigateToLanguagePreferenceScreen}
            />

            <EdgeBorderComponent />
          </List>
        </ScreenContent>
      </TopScreenComponent>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    preferredLanguage: preferredLanguageSelector(state),
    languages: fromNullable(state.preferences.languages),
    optionSpidEmail: profileSpidEmailSelector(state),
    isEmailEnabled: isEmailEnabledSelector(state),
    isInboxEnabled: isInboxEnabledSelector(state),
    isCustomEmailChannelEnabled: isCustomEmailChannelEnabledSelector(state),
    preferredCalendar: state.persistedPreferences.preferredCalendar,
    optionMobilePhone: profileMobilePhoneSelector(state)
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToEmailForwardingPreferenceScreen: () =>
    dispatch(navigateToEmailForwardingPreferenceScreen()),
  navigateToCalendarPreferenceScreen: () =>
    dispatch(navigateToCalendarPreferenceScreen()),
  navigateToLanguagePreferenceScreen: () =>
    dispatch(navigateToLanguagePreferenceScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLightModalContext(PreferencesScreen));
