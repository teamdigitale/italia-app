import AsyncStorage from "@react-native-community/async-storage";
import * as pot from "italia-ts-commons/lib/pot";
import { NavigationState } from "react-navigation";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import { createLogger } from "redux-logger";
import {
  createMigrate,
  MigrationManifest,
  PersistConfig,
  PersistedState,
  Persistor,
  persistReducer,
  persistStore
} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { Action, StoreEnhancer } from "../store/actions/types";
import { analytics } from "../store/middlewares";
import { createNavigationHistoryMiddleware } from "../store/middlewares/navigationHistory";
import { addMessagesIdsByServiceId } from "../store/migrations/addMessagesIdsByServiceId";
import {
  authenticationPersistConfig,
  createRootReducer
} from "../store/reducers";
import { ContentState } from "../store/reducers/content";
import { getInitialState as getInstallationInitialState } from "../store/reducers/notifications/installation";
import { GlobalState, PersistedGlobalState } from "../store/reducers/types";
import { walletsPersistConfig } from "../store/reducers/wallet";
import { DateISO8601Transform } from "../store/transforms/dateISO8601Tranform";
import { PotTransform } from "../store/transforms/potTransform";
import { NAVIGATION_MIDDLEWARE_LISTENERS_KEY } from "../utils/constants";
import { isDevEnv } from "../utils/environment";
import { remoteUndefined } from "../features/bonus/bpd/model/RemoteValue";
import { reactotronLogger } from "../store/middlewares/analytics";
import { configureReactotron } from "./configureRectotron";

/**
 * Redux persist will migrate the store to the current version
 */
const CURRENT_REDUX_STORE_VERSION = 15;

// see redux-persist documentation:
// https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
const migrations: MigrationManifest = {
  // version 0
  // we changed the way we comput the installation ID
  "0": (state: PersistedState): PersistedState =>
    ({
      ...state,
      notifications: {
        ...((state as any).notifications ? (state as any).notifications : {}),
        installation: getInstallationInitialState()
      }
    } as PersistedState),

  // version 1
  // we changed the type of the services state to use Pot types so we clear all
  // the entitie to force a reload of messages and services
  "1": (state: PersistedState): PersistedState =>
    ({
      ...state,
      entities: {}
    } as PersistedState),

  // Version 2
  // Adds messagesIdsByServiceId
  "2": (state: PersistedState) =>
    addMessagesIdsByServiceId(state as PersistedGlobalState),

  // Version 3
  // we changed the entities of organizations
  "3": (state: PersistedState) => {
    const entitiesState = (state as any).entities;
    const orgNameByFiscalCode = entitiesState.organizations;
    const allOrganizations = Object.keys(orgNameByFiscalCode).map(key => ({
      fiscalCode: key,
      name: orgNameByFiscalCode[key]
    }));

    return {
      ...state,
      entities: {
        ...(entitiesState ? entitiesState : {}),
        organizations: {
          nameByFiscalCode: orgNameByFiscalCode ? orgNameByFiscalCode : {},
          all: allOrganizations ? allOrganizations : {}
        }
      }
    };
  },

  // Version 4
  // we added a state to monitor what pagoPA environment is selected
  "4": (state: PersistedState) =>
    (state as PersistedGlobalState).persistedPreferences.isPagoPATestEnabled ===
    undefined
      ? {
          ...state,
          persistedPreferences: {
            ...(state as PersistedGlobalState).persistedPreferences,
            isPagoPATestEnabled: false
          }
        }
      : {
          ...state
        },

  // Version 5
  // we changed the way ToS acceptance is managed
  "5": (state: PersistedState) => ({
    ...state,
    onboarding: {
      isFingerprintAcknowledged: (state as PersistedGlobalState).onboarding
        .isFingerprintAcknowledged
    }
  }),

  // Version 6
  // we removed selectedFiscalCodes from organizations
  "6": (state: PersistedState) => {
    const entitiesState = (state as PersistedGlobalState).entities;
    const organizations = entitiesState.organizations;
    return {
      ...state,
      entities: {
        ...(entitiesState ? entitiesState : {}),
        organizations: {
          nameByFiscalCode: organizations.nameByFiscalCode
            ? organizations.nameByFiscalCode
            : {},
          all: organizations.all ? organizations.all : {}
        }
      }
    };
  },

  // Version 7
  // we empty the services list to get both services list and services metadata being reloaded and persisted
  "7": (state: PersistedState) => ({
    ...state,
    entities: {
      ...(state as PersistedGlobalState).entities,
      services: {
        ...(state as PersistedGlobalState).entities.services,
        byId: {}
      }
    }
  }),

  // Version 8
  // we load services scope in an specific view. So now it is uselss to hold (old) services metadata
  // they will be stored only when a service details screen is displayed
  "8": (state: PersistedState) => ({
    ...state,
    content: {
      ...(state as PersistedGlobalState).content,
      servicesMetadata: {
        ...(state as PersistedGlobalState).content.servicesMetadata,
        byId: {}
      }
    }
  }),

  // Version 9
  // we fix a bug on the version 8 of the migration implying a no proper creation of the content segment of store
  // (the servicesByScope state was not properly initialized)
  "9": (state: PersistedState) => ({
    ...state,
    content: {
      ...(state as PersistedGlobalState).content,
      servicesByScope: pot.none
    }
  }),
  // Version 10
  // since entities.messages are not persisted anymore, empty the related store section
  "10": (state: PersistedState) => ({
    ...state,
    entities: {
      ...(state as PersistedGlobalState).entities,
      messages: {}
    }
  }),

  // Version 11
  // add the default state for isCustomEmailChannelEnabled
  "11": (state: PersistedState) => ({
    ...state,
    persistedPreferences: {
      ...(state as PersistedGlobalState).persistedPreferences,
      isCustomEmailChannelEnabled: pot.none
    }
  }),
  // Version 12
  // change default state of isDebugModeEnabled: false
  "12": (state: PersistedState) => ({
    ...state,
    debug: {
      isDebugModeEnabled: false
    }
  }),
  // Version 13
  // add content.idpTextData
  // set default value
  "13": (state: PersistedState) => ({
    ...state,
    content: {
      ...(state as PersistedGlobalState).content,
      idpTextData: pot.none
    }
  }),
  // Version 14
  // remove content.idpTextData
  // add context.contextualHelp
  "14": (state: PersistedState) => {
    const content = (state as PersistedGlobalState).content;
    const newContent: ContentState = {
      servicesMetadata: content.servicesMetadata,
      municipality: content.municipality,
      contextualHelp: pot.none,
      idps: remoteUndefined
    };
    return {
      ...state,
      content: newContent
    };
  },
  // Version 15
  // added isMixpanelEnabled
  "15": (state: PersistedState) => {
    const persistedPreferences = (state as PersistedGlobalState)
      .persistedPreferences;
    return {
      ...state,
      persistedPreferences: { ...persistedPreferences, isMixpanelEnabled: null }
    };
  }
};

const isDebuggingInChrome = isDevEnv && !!window.navigator.userAgent;

const rootPersistConfig: PersistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: CURRENT_REDUX_STORE_VERSION,
  migrate: createMigrate(migrations, { debug: isDevEnv }),
  // entities implement a persist reduce that avoids to persist messages. Other entities section will be persisted
  blacklist: ["entities"],
  // Sections of the store that must be persisted and rehydrated with this storage.
  whitelist: [
    "onboarding",
    "notifications",
    "profile",
    "debug",
    "persistedPreferences",
    "installation",
    "payments",
    "content",
    "userMetadata",
    "crossSessions"
  ],
  // Transform functions used to manipulate state on store/rehydrate
  // TODO: add optionTransform https://www.pivotaltracker.com/story/show/170998374
  transforms: [DateISO8601Transform, PotTransform]
};

const persistedReducer: Reducer<PersistedGlobalState, Action> = persistReducer<
  GlobalState,
  Action
>(
  rootPersistConfig,
  createRootReducer([
    rootPersistConfig,
    authenticationPersistConfig,
    walletsPersistConfig
  ])
);

const logger = createLogger({
  predicate: (): boolean => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

// configure Reactotron if the app is running in dev mode
export const RTron = isDevEnv ? configureReactotron() : undefined;
const sagaMiddleware = createSagaMiddleware(
  RTron?.createSagaMonitor ? { sagaMonitor: RTron.createSagaMonitor() } : {}
);

/**
 * The new react-navigation if integrated with redux need a middleware
 * so that any events that mutate the navigation state properly trigger
 * the event listeners.
 * For details check
 * @https://github.com/react-navigation/react-navigation/issues/3438.
 */
const navigation = createReactNavigationReduxMiddleware(
  // This is a selector to get the navigation state from the global state
  (state: GlobalState): NavigationState => state.nav,
  // This is just a key to identify the Set of the listeners.
  // The same key will be used by the createReduxBoundAddListener function
  NAVIGATION_MIDDLEWARE_LISTENERS_KEY
);

const navigationHistory = createNavigationHistoryMiddleware();

function configureStoreAndPersistor(): { store: Store; persistor: Persistor } {
  /**
   * If available use redux-devtool version of the compose function that allow
   * the inspection of the store from the devtool.
   */

  const composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = applyMiddleware(
    sagaMiddleware,
    logger,
    navigationHistory,
    navigation,
    analytics.actionTracking, // generic tracker for selected redux actions
    analytics.screenTracking, // tracks screen navigation,
    analytics.reactotronLogger
  );
  // add Reactotron enhancer if the app is running in dev mode

  const enhancer: StoreEnhancer = RTron?.createEnhancer
    ? composeEnhancers(middlewares, RTron.createEnhancer())
    : composeEnhancers(middlewares);

  const store: Store = createStore<
    PersistedGlobalState,
    Action,
    Record<string, unknown>,
    Record<string, unknown>
  >(persistedReducer, enhancer);
  const persistor = persistStore(store);

  if (isDebuggingInChrome) {
    // eslint-disable-next-line
    (window as any).store = store;
  }

  // Run the main saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

export default configureStoreAndPersistor;
