import { createStackNavigator } from "react-navigation";
import LogoutScreen from "../components/screens/LogoutScreen";
import EmailInsertScreen from "../screens/onboarding/EmailInsertScreen";
import EmailReadScreen from "../screens/onboarding/EmailReadScreen";
import TosScreen from "../screens/onboarding/TosScreen";
import CalendarsPreferencesScreen from "../screens/profile/CalendarsPreferencesScreen";
import DownloadProfileDataScreen from "../screens/profile/DownloadProfileDataScreen";
import EmailForwardingScreen from "../screens/profile/EmailForwardingScreen";
import FiscalCodeScreen from "../screens/profile/FiscalCodeScreen";
import LanguagesPreferencesScreen from "../screens/profile/LanguagesPreferencesScreen";
import MarkdownPlayground from "../screens/profile/playgrounds/MarkdownPlayground";
import PreferencesScreen from "../screens/profile/PreferencesScreen";
import PrivacyMainScreen from "../screens/profile/PrivacyMainScreen";
import ProfileMainScreen from "../screens/profile/ProfileMainScreen";
import RemoveAccountDetails from "../screens/profile/RemoveAccountDetailsScreen";
import RemoveAccountInfo from "../screens/profile/RemoveAccountInfoScreen";
import RemoveAccountSuccess from "../screens/profile/RemoveAccountSuccessScreen";
import ShareDataScreen from "../screens/profile/ShareDataScreen";
import WebPlayground from "../screens/profile/WebPlayground";
import { Showroom } from "../screens/showroom/Showroom";
import ServicesPreferenceScreen from "../screens/profile/ServicesPreferenceScreen";
import ProfileDataScreen from "../screens/profile/ProfileDataScreen";
import SecurityScreen from "../screens/profile/SecurityScreen";
import ROUTES from "./routes";

/**
 * A navigator for all the screens of the Profile section
 */
const ProfileNavigator = createStackNavigator(
  {
    [ROUTES.PROFILE_MAIN]: {
      screen: ProfileMainScreen
    },
    [ROUTES.PROFILE_PRIVACY_MAIN]: {
      screen: PrivacyMainScreen
    },
    [ROUTES.PROFILE_PRIVACY]: {
      screen: TosScreen
    },
    [ROUTES.PROFILE_PRIVACY_SHARE_DATA]: {
      screen: ShareDataScreen
    },
    [ROUTES.PROFILE_PREFERENCES_HOME]: {
      screen: PreferencesScreen
    },
    [ROUTES.PROFILE_DATA]: {
      screen: ProfileDataScreen
    },
    [ROUTES.PROFILE_SECURITY]: {
      screen: SecurityScreen
    },
    [ROUTES.PROFILE_PREFERENCES_SERVICES]: {
      screen: ServicesPreferenceScreen
    },
    [ROUTES.PROFILE_PREFERENCES_EMAIL_FORWARDING]: {
      screen: EmailForwardingScreen
    },
    [ROUTES.PROFILE_PREFERENCES_CALENDAR]: {
      screen: CalendarsPreferencesScreen
    },
    [ROUTES.PROFILE_PREFERENCES_LANGUAGE]: {
      screen: LanguagesPreferencesScreen
    },
    [ROUTES.PROFILE_LOGOUT]: {
      screen: LogoutScreen
    },
    [ROUTES.PROFILE_FISCAL_CODE]: {
      screen: FiscalCodeScreen
    },
    [ROUTES.READ_EMAIL_SCREEN]: {
      screen: EmailReadScreen
    },
    [ROUTES.INSERT_EMAIL_SCREEN]: {
      screen: EmailInsertScreen
    },
    [ROUTES.PROFILE_DOWNLOAD_DATA]: {
      screen: DownloadProfileDataScreen
    },
    [ROUTES.MARKDOWN_PLAYGROUND]: {
      screen: MarkdownPlayground
    },
    [ROUTES.SHOWROOM]: {
      screen: Showroom
    },
    [ROUTES.WEB_PLAYGROUND]: {
      screen: WebPlayground
    },
    [ROUTES.PROFILE_REMOVE_ACCOUNT_INFO]: {
      screen: RemoveAccountInfo
    },
    [ROUTES.PROFILE_REMOVE_ACCOUNT_DETAILS]: {
      screen: RemoveAccountDetails
    },
    [ROUTES.PROFILE_REMOVE_ACCOUNT_SUCCESS]: {
      screen: RemoveAccountSuccess
    }
  },
  {
    // Let each screen handle the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default ProfileNavigator;
