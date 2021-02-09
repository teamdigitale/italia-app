/**
 * A saga that manages the Profile.
 */
import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { readableReport } from "italia-ts-commons/lib/reporters";
import {
  all,
  call,
  Effect,
  put,
  select,
  take,
  takeLatest
} from "redux-saga/effects";
import { ActionType, getType, isActionOf } from "typesafe-actions";
import { ExtendedProfile } from "../../definitions/backend/ExtendedProfile";
import { InitializedProfile } from "../../definitions/backend/InitializedProfile";
import { UserDataProcessingChoiceEnum } from "../../definitions/backend/UserDataProcessingChoice";
import { Locales } from "../../locales/locales";
import { BackendClient } from "../api/backend";
import { tosVersion } from "../config";
import { loadAllBonusActivations } from "../features/bonus/bonusVacanze/store/actions/bonusVacanze";
import { allBonusActiveSelector } from "../features/bonus/bonusVacanze/store/reducers/allActive";
import { bpdLoadActivationStatus } from "../features/bonus/bpd/store/actions/details";
import { bpdEnabledSelector } from "../features/bonus/bpd/store/reducers/details/activation";
import I18n from "../i18n";
import { sessionExpired } from "../store/actions/authentication";
import { navigateToRemoveAccountSuccess } from "../store/actions/navigation";
import { preferredLanguageSaveSuccess } from "../store/actions/persistedPreferences";
import {
  loadBonusBeforeRemoveAccount,
  profileLoadFailure,
  profileLoadRequest,
  profileLoadSuccess,
  profileUpsert,
  removeAccountMotivation,
  startEmailValidation
} from "../store/actions/profile";
import { upsertUserDataProcessing } from "../store/actions/userDataProcessing";
import { preferredLanguageSelector } from "../store/reducers/persistedPreferences";
import { profileSelector } from "../store/reducers/profile";
import { SagaCallReturnType } from "../types/utils";
import {
  fromLocaleToPreferredLanguage,
  fromPreferredLanguageToLocale,
  getLocalePrimaryWithFallback
} from "../utils/locale";
import {
  differentProfileLoggedIn,
  setProfileHashedFiscalCode
} from "../store/actions/crossSessions";
import { isDifferentFiscalCodeSelector } from "../store/reducers/crossSessions";
import { isTestEnv } from "../utils/environment";
import { deletePin } from "../utils/keychain";

// A saga to load the Profile.
export function* loadProfile(
  getProfile: ReturnType<typeof BackendClient>["getProfile"]
): Generator<
  Effect,
  Option<InitializedProfile>,
  SagaCallReturnType<typeof getProfile>
> {
  try {
    const response = yield call(getProfile, {});
    // we got an error, throw it
    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }
    if (response.value.status === 200) {
      // Ok we got a valid response, send a SESSION_LOAD_SUCCESS action
      // BEWARE: we need to cast to UserProfileUnion to make UserProfile a
      // discriminated union!
      // eslint-disable-next-line
      yield put(profileLoadSuccess(response.value.value as InitializedProfile));
      return some(response.value.value);
    }
    if (response.value.status === 401) {
      // in case we got an expired session while loading the profile, we reset
      // the session
      yield put(sessionExpired());
    }
    throw response
      ? Error(`response status ${response.value.status}`)
      : Error(I18n.t("profile.errors.load"));
  } catch (error) {
    yield put(profileLoadFailure(error));
  }
  return none;
}

// A saga to update the Profile.
function* createOrUpdateProfileSaga(
  createOrUpdateProfile: ReturnType<
    typeof BackendClient
  >["createOrUpdateProfile"],
  action: ActionType<typeof profileUpsert["request"]>
): Generator<Effect, void, any> {
  // Get the current Profile from the state
  const profileState: ReturnType<typeof profileSelector> = yield select(
    profileSelector
  );

  if (pot.isNone(profileState)) {
    // somewhing's wrong, we don't even have an AuthenticatedProfile meaning
    // the user didn't yet authenticated: ignore this upsert request.
    return;
  }

  const currentProfile = profileState.value;

  // If we already have a profile, merge it with the new updated attributes
  // or else, create a new profile from the provided object
  // FIXME: perhaps this is responsibility of the caller?
  const newProfile: ExtendedProfile = currentProfile.has_profile
    ? {
        is_inbox_enabled: currentProfile.is_inbox_enabled,
        is_webhook_enabled: currentProfile.is_webhook_enabled,
        is_email_validated: currentProfile.is_email_validated || false,
        is_email_enabled: currentProfile.is_email_enabled,
        version: currentProfile.version,
        email: currentProfile.email,
        preferred_languages: currentProfile.preferred_languages,
        blocked_inbox_or_channels: currentProfile.blocked_inbox_or_channels,
        accepted_tos_version: currentProfile.accepted_tos_version,
        ...action.payload
      }
    : {
        is_inbox_enabled: false,
        is_webhook_enabled: false,
        is_email_validated: action.payload.is_email_validated || false,
        is_email_enabled: action.payload.is_email_enabled || false,
        ...action.payload,
        accepted_tos_version: tosVersion,
        version: 0
      };
  try {
    const response: SagaCallReturnType<typeof createOrUpdateProfile> = yield call(
      createOrUpdateProfile,
      {
        body: newProfile
      }
    );

    if (response.isLeft()) {
      throw new Error(readableReport(response.value));
    }

    if (response.value.status === 409) {
      // It could happen that profile update fails due to version number mismatch
      // app has a different version of profile compared to that one owned by the backend
      // so we force profile reloading (see https://www.pivotaltracker.com/n/projects/2048617/stories/171994417)
      yield put(profileLoadRequest());
      throw new Error(response.value.value.title);
    }

    if (response.value.status === 401) {
      // on 401, expire the current session and restart the authentication flow
      yield put(sessionExpired());
      throw new Error(I18n.t("profile.errors.upsert"));
    }

    if (response.value.status !== 200) {
      // We got a error, send a SESSION_UPSERT_FAILURE action
      throw new Error(response.value.value.title);
    } else {
      // Ok we got a valid response, send a SESSION_UPSERT_SUCCESS action
      yield put(profileUpsert.success(response.value.value));
    }
  } catch (e) {
    const error: Error = e || Error(I18n.t("profile.errors.upsert"));
    yield put(profileUpsert.failure(error));
  }
}

// This function listens for Profile upsert requests and calls the needed saga.
export function* watchProfileUpsertRequestsSaga(
  createOrUpdateProfile: ReturnType<
    typeof BackendClient
  >["createOrUpdateProfile"]
): Iterator<Effect> {
  yield takeLatest(
    getType(profileUpsert.request),
    createOrUpdateProfileSaga,
    createOrUpdateProfile
  );
}

// This function listens for Profile refresh requests and calls the needed saga.
export function* watchProfileRefreshRequestsSaga(
  getProfile: ReturnType<typeof BackendClient>["getProfile"]
): Iterator<Effect> {
  yield takeLatest(getType(profileLoadRequest), loadProfile, getProfile);
}

// make a request to start the email validation process that sends to the user
// an email with a link to validate it
function* startEmailValidationProcessSaga(
  startEmailValidationProcess: ReturnType<
    typeof BackendClient
  >["startEmailValidationProcess"]
): Generator<
  Effect,
  void,
  SagaCallReturnType<typeof startEmailValidationProcess>
> {
  try {
    const response = yield call(startEmailValidationProcess, {});
    // we got an error, throw it
    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }
    if (response.value.status === 202) {
      yield put(startEmailValidation.success());
    }
    if (response.value.status === 401) {
      // in case we got an expired session while loading the profile, we reset
      // the session
      yield put(sessionExpired());
    }
    throw response
      ? Error(`response status ${response.value.status}`)
      : Error(I18n.t("profile.errors.load"));
  } catch (error) {
    yield put(startEmailValidation.failure(error));
  }
}

// check if the current device language matches the one saved in the profile
function* checkPreferredLanguage(
  profileLoadSuccessAction: ActionType<typeof profileLoadSuccess>
): Generator<Effect, any, Option<Locales>> {
  // check if the preferred_languages is up to date
  const preferredLanguages =
    profileLoadSuccessAction.payload.preferred_languages;
  const currentStoredLocale: ReturnType<typeof preferredLanguageSelector> = yield select(
    preferredLanguageSelector
  );
  // deviceLocale could be the one stored or the one retrieved from the running device
  const deviceLocale = currentStoredLocale.getOrElse(
    getLocalePrimaryWithFallback()
  );
  // if the preferred language isn't set, update it with the current device locale
  if (!preferredLanguages || preferredLanguages.length === 0) {
    yield put(
      profileUpsert.request({
        preferred_languages: [fromLocaleToPreferredLanguage(deviceLocale)]
      })
    );
  }
  const currentLocale =
    preferredLanguages && preferredLanguages.length > 0
      ? fromPreferredLanguageToLocale(preferredLanguages[0])
      : deviceLocale;
  // if there is not value stored about preferred language or
  // the stored value is different from one into the profile, update it
  if (
    currentStoredLocale.isNone() ||
    currentStoredLocale.value !== currentLocale
  ) {
    yield put(
      preferredLanguageSaveSuccess({
        preferredLanguage: currentLocale
      })
    );
  }
}

function* handleLoadBonusBeforeRemoveAccount() {
  const bpdActive: ReturnType<typeof bpdEnabledSelector> = yield select(
    bpdEnabledSelector
  );

  // check if there are some bpd
  if (pot.isNone(bpdActive)) {
    // Load the bpd data and wait for a response
    yield put(bpdLoadActivationStatus.request());

    yield take([
      bpdLoadActivationStatus.success,
      bpdLoadActivationStatus.failure
    ]);
  }

  const bonusVacanzeBonus: ReturnType<typeof allBonusActiveSelector> = yield select(
    allBonusActiveSelector
  );

  // check if there are some bonus vacanze
  if (bonusVacanzeBonus.length === 0) {
    // Load the bonus data and no wait because if there are some bonus
    // they will be loaded individually
    yield put(loadAllBonusActivations.request());
  }
}

// watch for action of removing account
function* handleRemoveAccount() {
  // dispatch an action to request account deletion
  yield put(
    upsertUserDataProcessing.request(UserDataProcessingChoiceEnum.DELETE)
  );
  // wait for response (success/failure)
  const upsertUserDataProcessingResponse = yield take([
    upsertUserDataProcessing.success,
    upsertUserDataProcessing.failure
  ]);

  // if success go to remove account success screen
  if (
    isActionOf(
      upsertUserDataProcessing.success,
      upsertUserDataProcessingResponse
    )
  ) {
    yield put(navigateToRemoveAccountSuccess());
  }
}

/**
 * check if the current logged profile fiscal code is the same of the previous stored one
 * @param profileLoadSuccessAction
 */
function* checkStoreHashedFiscalCode(
  profileLoadSuccessAction: ActionType<typeof profileLoadSuccess>
) {
  const checkIsDifferentFiscalCode: boolean | undefined = yield select(
    isDifferentFiscalCodeSelector,
    profileLoadSuccessAction.payload.fiscal_code
  );
  // the current logged user has a different fiscal code from the stored hashed one
  if (checkIsDifferentFiscalCode === true) {
    // delete current store pin
    yield call(deletePin);
    yield put(differentProfileLoggedIn());
  }
  yield put(
    setProfileHashedFiscalCode(profileLoadSuccessAction.payload.fiscal_code)
  );
}

// make some check after the profile is loaded successfully
function* checkLoadedProfile(
  profileLoadSuccessAction: ActionType<typeof profileLoadSuccess>
) {
  yield all([
    call(checkPreferredLanguage, profileLoadSuccessAction),
    call(checkStoreHashedFiscalCode, profileLoadSuccessAction)
  ]);
}

// watch for some actions about profile
export function* watchProfile(
  startEmailValidationProcess: ReturnType<
    typeof BackendClient
  >["startEmailValidationProcess"]
): Iterator<Effect> {
  // user requests to send again the email validation to profile email
  yield takeLatest(
    getType(startEmailValidation.request),
    startEmailValidationProcessSaga,
    startEmailValidationProcess
  );
  // check the loaded profile
  yield takeLatest(getType(profileLoadSuccess), checkLoadedProfile);

  // Start watching for request bonus before remove profile
  yield takeLatest(
    loadBonusBeforeRemoveAccount,
    handleLoadBonusBeforeRemoveAccount
  );
  // Start watching for request of remove profile
  yield takeLatest(removeAccountMotivation, handleRemoveAccount);
}

// to ensure right code encapsulation we export functions/variables just for tests purposes
export const profileSagaTestable = isTestEnv
  ? {
      startEmailValidationProcessSaga,
      checkLoadedProfile,
      handleLoadBonusBeforeRemoveAccount,
      handleRemoveAccount,
      checkStoreHashedFiscalCode
    }
  : undefined;
