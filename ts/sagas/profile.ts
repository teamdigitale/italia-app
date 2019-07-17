/**
 * A saga that manages the Profile.
 */
import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { call, Effect, put, select, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { ExtendedProfile } from "../../definitions/backend/ExtendedProfile";
import { UserProfileUnion } from "../api/backend";

import I18n from "../i18n";

import { BackendClient } from "../api/backend";
import { sessionExpired } from "../store/actions/authentication";
import {
  profileLoadFailure,
  profileLoadSuccess,
  profileUpsert
} from "../store/actions/profile";
import { profileSelector } from "../store/reducers/profile";
import { GlobalState } from "../store/reducers/types";
import { SagaCallReturnType } from "../types/utils";

// A saga to load the Profile.
export function* loadProfile(
  getProfile: ReturnType<typeof BackendClient>["getProfile"]
): Iterator<Effect | Option<UserProfileUnion>> {
  try {
    const response: SagaCallReturnType<typeof getProfile> = yield call(
      getProfile,
      {}
    );
    // we got an error, throw it
    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }
    if (response.value.status === 200) {
      // Ok we got a valid response, send a SESSION_LOAD_SUCCESS action
      // BEWARE: we need to cast to UserProfileUnion to make UserProfile a
      // discriminated union!
      // tslint:disable-next-line:no-useless-cast
      yield put(profileLoadSuccess(response.value.value as UserProfileUnion));
      return some(response.value.value);
    }
    if (response.value.status === 401) {
      // in case we got an expired session while loading the profile, we reset
      // the session
      yield put(sessionExpired());
    }
    throw response
      ? response.value.value
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
): Iterator<Effect> {
  try {
    // Get the current Profile from the state
    const profileState: ReturnType<typeof profileSelector> = yield select<
      GlobalState
    >(profileSelector);

    if (pot.isNone(profileState)) {
      // somewhing's wrong, we don't even have an AuthenticatedProfile meaning
      // the used didn't yet authenticated: ignore this upsert request.
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
          version: currentProfile.version,
          email: currentProfile.email,
          preferred_languages: currentProfile.preferred_languages,
          blocked_inbox_or_channels: currentProfile.blocked_inbox_or_channels,
          ...action.payload
        }
      : {
          is_inbox_enabled: false,
          is_webhook_enabled: false,
          ...action.payload,
          version: 0
        };

    const response: SagaCallReturnType<
      typeof createOrUpdateProfile
    > = yield call(createOrUpdateProfile, {
      extendedProfile: newProfile
    });

    if (response.isLeft()) {
      yield put(
        profileUpsert.failure(new Error(readableReport(response.value)))
      );
      return;
    }

    if (response.value.status === 401) {
      // on 401, expire the current session and restart the authentication flow
      yield put(sessionExpired());
      return;
    }

    if (response.value.status !== 200) {
      // We got a error, send a SESSION_UPSERT_FAILURE action
      const error: Error = Error(
        response.value.value.title || I18n.t("profile.errors.upsert")
      );

      yield put(profileUpsert.failure(error));
    } else {
      // Ok we got a valid response, send a SESSION_UPSERT_SUCCESS action
      yield put(profileUpsert.success(response.value.value));
    }
  } catch (err) {
    const error: Error = Error(I18n.t("profile.errors.upsert"));
    yield put(profileUpsert.failure(error));
  }
}

// This function listens for Profile related requests and calls the needed saga.
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
