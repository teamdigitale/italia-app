import { NavigationState } from "react-navigation";
import { PersistPartial } from "redux-persist";

import { AppState } from "./appState";
import { PersistedAuthenticationState } from "./authentication";
import { BackendInfoState } from "./backendInfo";
import { BackendStatusState } from "./backendStatus";
import { CieState } from "./cie";
import { ContentState } from "./content";
import { DebugState } from "./debug";
import { DeepLinkState } from "./deepLink";
import { EmailValidationState } from "./emailValidation";
import { PersistedEntitiesState } from "./entities";
import { IdentificationState } from "./identification";
import { InstabugUnreadMessagesState } from "./instabug/instabugUnreadMessages";
import { InstallationState } from "./installation";
import { NavigationHistoryState } from "./navigationHistory";
import { NotificationsState } from "./notifications";
import { OnboardingState } from "./onboarding";
import { PaymentsState } from "./payments";
import { PersistedPreferencesState } from "./persistedPreferences";
import { PreferencesState } from "./preferences";
import { ProfileState } from "./profile";
import { SearchState } from "./search";
import { UserDataProcessingState } from "./userDataProcessing";
import { UserMetadataState } from "./userMetadata";
import { WalletState } from "./wallet";

export type NetworkState = Readonly<{
  isConnected: boolean;
}>;

export type GlobalState = Readonly<{
  appState: AppState;
  authentication: PersistedAuthenticationState;
  backendStatus: BackendStatusState;
  backendInfo: BackendInfoState;
  deepLink: DeepLinkState;
  entities: PersistedEntitiesState;
  instabug: InstabugUnreadMessagesState;
  nav: NavigationState;
  network: NetworkState;
  notifications: NotificationsState;
  onboarding: OnboardingState;
  profile: ProfileState;
  userDataProcessing: UserDataProcessingState;
  wallet: WalletState;
  preferences: PreferencesState;
  persistedPreferences: PersistedPreferencesState;
  content: ContentState;
  navigationHistory: NavigationHistoryState;
  identification: IdentificationState;
  installation: InstallationState;
  debug: DebugState;
  search: SearchState;
  payments: PaymentsState;
  userMetadata: UserMetadataState;
  emailValidation: EmailValidationState;
  cie: CieState;
}>;

export type PersistedGlobalState = GlobalState & PersistPartial;
