/**
 * Aggregates all defined reducers
 */
import { combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer, purgeStoredState } from "redux-persist";
import { isActionOf } from "typesafe-actions";

import AsyncStorage from "@react-native-community/async-storage";
import { logoutFailure, logoutSuccess } from "../actions/authentication";
import { Action } from "../actions/types";
import createSecureStorage from "../storages/keychain";
import appStateReducer from "./appState";
import authenticationReducer, { AuthenticationState } from "./authentication";
import backendInfoReducer from "./backendInfo";
import backendStatusReducer from "./backendStatus";
import cieReducer from "./cie";
import contentReducer from "./content";
import { debugReducer } from "./debug";
import deepLinkReducer from "./deepLink";
import emailValidationReducer from "./emailValidation";
import entitiesReducer, { EntitiesState } from "./entities";
import identificationReducer from "./identification";
import instabugUnreadMessagesReducer from "./instabug/instabugUnreadMessages";
import installationReducer from "./installation";
import navigationReducer from "./navigation";
import navigationHistoryReducer from "./navigationHistory";
import networkReducer from "./network";
import notificationsReducer from "./notifications";
import onboardingReducer from "./onboarding";
import paymentsReducer from "./payments";
import persistedPreferencesReducer from "./persistedPreferences";
import preferencesReducer from "./preferences";
import profileReducer from "./profile";
import searchReducer from "./search";
import { GlobalState } from "./types";
import userDataProcessingReducer from "./userDataProcessing";
import userMetadataReducer from "./userMetadata";
import walletReducer from "./wallet";

// A custom configuration to store the authentication into the Keychain
export const authenticationPersistConfig: PersistConfig = {
  key: "authentication",
  storage: createSecureStorage(),
  blacklist: ["deepLink"]
};

// A custom configuration to avoid to persist messages section
export const entitiesPersistConfig: PersistConfig = {
  key: "entities",
  storage: AsyncStorage,
  blacklist: ["messages"]
};

/**
 * Here we combine all the reducers.
 * We use the best practice of separating UI state from the DATA state.
 * UI state is mostly used to check what to show hide in the screens (ex.
 * errors/spinners).
 * DATA state is where we store real data fetched from the API (ex.
 * profile/messages).
 * More at
 * @https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1
 */
const appReducer: Reducer<GlobalState, Action> = combineReducers<
  GlobalState,
  Action
>({
  //
  // ephemeral state
  //
  appState: appStateReducer,
  network: networkReducer,
  nav: navigationReducer,
  deepLink: deepLinkReducer,
  wallet: walletReducer,
  backendInfo: backendInfoReducer,
  backendStatus: backendStatusReducer,
  preferences: preferencesReducer,
  identification: identificationReducer,
  navigationHistory: navigationHistoryReducer,
  instabug: instabugUnreadMessagesReducer,
  search: searchReducer,
  cie: cieReducer,

  //
  // persisted state
  //

  // custom persistor (uses secure storage)
  authentication: persistReducer<AuthenticationState, Action>(
    authenticationPersistConfig,
    authenticationReducer
  ),

  // standard persistor, see configureStoreAndPersistor.ts
  onboarding: onboardingReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  userDataProcessing: userDataProcessingReducer,
  userMetadata: userMetadataReducer,
  entities: persistReducer<EntitiesState, Action>(
    entitiesPersistConfig,
    entitiesReducer
  ),
  debug: debugReducer,
  persistedPreferences: persistedPreferencesReducer,
  installation: installationReducer,
  payments: paymentsReducer,
  content: contentReducer,
  emailValidation: emailValidationReducer
});

export function createRootReducer(
  persistConfigs: ReadonlyArray<PersistConfig>
) {
  return (state: GlobalState | undefined, action: Action): GlobalState => {
    // despite logout fails the user must be logged out
    if (
      isActionOf(logoutFailure, action) ||
      isActionOf(logoutSuccess, action)
    ) {
      // Purge the stored redux-persist state
      persistConfigs.forEach(persistConfig => purgeStoredState(persistConfig));

      /**
       * We can't return undefined for nested persist reducer, we need to return
       * the basic redux persist content.
       */
      state =
        state &&
        ((isActionOf(logoutSuccess, action) && !action.payload.keepUserData) ||
          (isActionOf(logoutFailure, action) &&
            !action.payload.options.keepUserData))
          ? ({
              authentication: { _persist: state.authentication._persist }
            } as GlobalState)
          : state;
    }

    return appReducer(state, action);
  };
}
