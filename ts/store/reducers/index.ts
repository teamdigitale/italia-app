/**
 * Aggregates all defined reducers
 */
import AsyncStorage from "@react-native-community/async-storage";
import { reducer as networkReducer } from "react-native-offline";
import { combineReducers, Reducer } from "redux";
import { PersistConfig, persistReducer, purgeStoredState } from "redux-persist";
import { isActionOf } from "typesafe-actions";
import bonusReducer from "../../features/bonus/bonusVacanze/store/reducers";
import { featuresReducer } from "../../features/common/store/reducers";
import {
  logoutFailure,
  logoutSuccess,
  sessionExpired
} from "../actions/authentication";
import { Action } from "../actions/types";
import createSecureStorage from "../storages/keychain";
import { DateISO8601Transform } from "../transforms/dateISO8601Tranform";
import appStateReducer from "./appState";
import authenticationReducer, { AuthenticationState } from "./authentication";
import backendInfoReducer from "./backendInfo";
import backendStatusReducer from "./backendStatus";
import cieReducer from "./cie";
import contentReducer, {
  initialContentState as contentInitialContentState
} from "./content";
import { debugReducer } from "./debug";
import deepLinkReducer from "./deepLink";
import emailValidationReducer from "./emailValidation";
import entitiesReducer, {
  entitiesPersistConfig,
  EntitiesState
} from "./entities";
import identificationReducer, { IdentificationState } from "./identification";
import instabugUnreadMessagesReducer from "./instabug/instabugUnreadMessages";
import installationReducer from "./installation";
import navigationReducer from "./navigation";
import navigationHistoryReducer from "./navigationHistory";
import notificationsReducer from "./notifications";
import onboardingReducer from "./onboarding";
import paymentsReducer from "./payments";
import persistedPreferencesReducer, {
  initialPreferencesState
} from "./persistedPreferences";
import preferencesReducer from "./preferences";
import profileReducer from "./profile";
import crossSessionsReducer from "./crossSessions";
import searchReducer from "./search";
import { GlobalState } from "./types";
import userDataProcessingReducer from "./userDataProcessing";
import userMetadataReducer from "./userMetadata";
import walletReducer from "./wallet";
import internalRouteNavigationReducer from "./internalRouteNavigation";
import backoffErrorReducer from "./backoffError";

// A custom configuration to store the authentication into the Keychain
export const authenticationPersistConfig: PersistConfig = {
  key: "authentication",
  storage: createSecureStorage(),
  blacklist: ["deepLink"]
};

// A custom configuration to store the fail information of the identification section
export const identificationPersistConfig: PersistConfig = {
  key: "identification",
  storage: AsyncStorage,
  blacklist: ["progress"],
  transforms: [DateISO8601Transform]
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
export const appReducer: Reducer<GlobalState, Action> = combineReducers<
  GlobalState,
  Action
>({
  //
  // ephemeral state
  //
  appState: appStateReducer,
  network: networkReducer,
  backoffError: backoffErrorReducer,
  nav: navigationReducer,
  deepLink: deepLinkReducer,
  wallet: walletReducer,
  backendInfo: backendInfoReducer,
  backendStatus: backendStatusReducer,
  preferences: preferencesReducer,
  navigationHistory: navigationHistoryReducer,
  instabug: instabugUnreadMessagesReducer,
  search: searchReducer,
  cie: cieReducer,
  bonus: bonusReducer,
  features: featuresReducer,
  internalRouteNavigation: internalRouteNavigationReducer,
  //
  // persisted state
  //

  // custom persistor (uses secure storage)
  authentication: persistReducer<AuthenticationState, Action>(
    authenticationPersistConfig,
    authenticationReducer
  ),

  // standard persistor, see configureStoreAndPersistor.ts

  identification: persistReducer<IdentificationState, Action>(
    identificationPersistConfig,
    identificationReducer
  ),
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
  emailValidation: emailValidationReducer,
  crossSessions: crossSessionsReducer
});

export function createRootReducer(
  persistConfigs: ReadonlyArray<PersistConfig>
) {
  return (state: GlobalState | undefined, action: Action): GlobalState => {
    if (isActionOf(sessionExpired, action)) {
      persistConfigs.forEach(
        pc => pc.key === "wallets" && purgeStoredState(pc)
      );
    }
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
      // for retro-compatibility
      // eslint-disable-next-line no-param-reassign
      state =
        state &&
        ((isActionOf(logoutSuccess, action) && !action.payload.keepUserData) ||
          (isActionOf(logoutFailure, action) &&
            !action.payload.options.keepUserData))
          ? ({
              // eslint-disable-next-line no-underscore-dangle
              authentication: { _persist: state.authentication._persist },
              // data should be kept across multiple sessions
              entities: {
                services: state.entities.services,
                organizations: state.entities.organizations,
                messagesStatus: state.entities.messagesStatus,
                paymentByRptId: state.entities.paymentByRptId,
                calendarEvents: state.entities.calendarEvents,
                transactionsRead: state.entities.transactionsRead
              },
              // backend status must be kept
              backendStatus: state.backendStatus,
              crossSessions: state.crossSessions,
              // keep servicesMetadata from content section
              content: {
                ...contentInitialContentState,
                servicesMetadata: state.content.servicesMetadata
              },
              // isMixpanelEnabled must be kept
              persistedPreferences: {
                ...initialPreferencesState,
                isMixpanelEnabled: state.persistedPreferences.isMixpanelEnabled
              }
            } as GlobalState)
          : state;
    }

    return appReducer(state, action);
  };
}
