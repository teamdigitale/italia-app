import { Either, left, right } from "fp-ts/lib/Either";
import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { readableReport } from "italia-ts-commons/lib/reporters";
import {
  call,
  Effect,
  fork,
  put,
  select,
  takeLatest
} from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";

import { UserMetadata as BackendUserMetadata } from "../../../definitions/backend/UserMetadata";
import { BackendClient } from "../../api/backend";
import TypedI18n from "../../i18n";
import {
  userMetadataLoad,
  userMetadataUpsert
} from "../../store/actions/userMetadata";
import {
  backendUserMetadataToUserMetadata,
  emptyUserMetadata,
  UserMetadata,
  userMetadataSelector,
  userMetadataToBackendUserMetadata
} from "../../store/reducers/userMetadata";
import { SagaCallReturnType } from "../../types/utils";

/**
 * A saga to fetch user metadata from the Backend
 */
export function* fetchUserMetadata(
  getUserMetadata: ReturnType<typeof BackendClient>["getUserMetadata"]
): Generator<
  Effect,
  Either<Error, BackendUserMetadata>,
  SagaCallReturnType<typeof getUserMetadata>
> {
  try {
    const response = yield call(getUserMetadata, {});

    // Can't decode response
    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }

    if (response.value.status !== 200) {
      if (response.value.status === 204) {
        // Return an empty object cause profile has no metadata yet (204 === No Content)
        return right<Error, BackendUserMetadata>(emptyUserMetadata);
      }

      const error =
        response.value.status === 500 ? response.value.value.title : undefined;
      // Return the error
      return left<Error, BackendUserMetadata>(Error(error));
    }

    return right<Error, BackendUserMetadata>(response.value.value);
  } catch (error) {
    return left<Error, BackendUserMetadata>(error);
  }
}

/**
 * Call this saga to load userMetadata and to store the
 * result in the redux store.
 */
export function* loadUserMetadata(
  getUserMetadata: ReturnType<typeof BackendClient>["getUserMetadata"],
  setLoading: boolean = false
): Generator<
  Effect,
  Option<UserMetadata>,
  SagaCallReturnType<typeof fetchUserMetadata>
> {
  if (setLoading) {
    yield put(userMetadataLoad.request());
  }

  const backendUserMetadataOrError = yield call(
    fetchUserMetadata,
    getUserMetadata
  );

  if (backendUserMetadataOrError.isLeft()) {
    yield put(userMetadataLoad.failure(backendUserMetadataOrError.value));
    return none;
  }

  const backendUserMetadata = backendUserMetadataOrError.value;

  const userMetadataOrError = backendUserMetadataToUserMetadata(
    backendUserMetadata
  );

  if (userMetadataOrError.isLeft()) {
    yield put(userMetadataLoad.failure(userMetadataOrError.value));
    return none;
  }

  yield put(userMetadataLoad.success(userMetadataOrError.value));

  return some(userMetadataOrError.value);
}

/**
 * Listen for userMetadataLoad.request and calls loadUserMetadata saga.
 */
export function* watchLoadUserMetadata(
  getUserMetadata: ReturnType<typeof BackendClient>["getUserMetadata"]
) {
  yield takeLatest(
    getType(userMetadataLoad.request),
    loadUserMetadataManager,
    getUserMetadata
  );
}

/**
 * Call loadUserMetadata saga.
 */
function* loadUserMetadataManager(
  getUserMetadata: ReturnType<typeof BackendClient>["getUserMetadata"]
) {
  yield fork(loadUserMetadata, getUserMetadata);
}

/**
 * Used to post new userMetadata to the Backend
 */
export function* postUserMetadata(
  createOrUpdateUserMetadata: ReturnType<
    typeof BackendClient
  >["createOrUpdateUserMetadata"],
  backendUserMetadata: BackendUserMetadata
): Generator<
  Effect,
  Either<Error, BackendUserMetadata>,
  SagaCallReturnType<typeof createOrUpdateUserMetadata>
> {
  try {
    const response = yield call(createOrUpdateUserMetadata, {
      body: backendUserMetadata
    });

    // Can't decode response
    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }

    if (response.value.status !== 200) {
      const error =
        response.value.status === 500 ? response.value.value.title : undefined;
      // Return the error
      return left<Error, BackendUserMetadata>(Error(error));
    }

    return right<Error, BackendUserMetadata>(response.value.value);
  } catch (error) {
    return left<Error, BackendUserMetadata>(error);
  }
}

/**
 * Post new userMetadata to the Backend and store
 * the result in the redux store.
 */
export function* upsertUserMetadata(
  createOrUpdateUserMetadata: ReturnType<
    typeof BackendClient
  >["createOrUpdateUserMetadata"],
  userMetadata: UserMetadata,
  setLoading: boolean = false
): Generator<Effect, Option<UserMetadata>, any> {
  if (setLoading) {
    yield put(userMetadataUpsert.request(userMetadata));
  }

  const currentUserMetadata: ReturnType<typeof userMetadataSelector> = yield select(
    userMetadataSelector
  );

  // The version of the new userMetadata must be one more
  // the old one.
  const currentVersion: number = pot.getOrElse(
    pot.map(currentUserMetadata, _ => _.version),
    0
  );

  if (userMetadata.version !== currentVersion + 1) {
    yield put(
      userMetadataUpsert.failure(
        new Error(TypedI18n.t("userMetadata.errors.upsertVersion"))
      )
    );
    return none;
  }

  // Call the saga that perform the API request.
  const updatedBackendUserMetadataOrError: SagaCallReturnType<typeof postUserMetadata> = yield call(
    postUserMetadata,
    createOrUpdateUserMetadata,
    // Backend stores the metadata as a plain string
    // so we do the conversion here.
    userMetadataToBackendUserMetadata(userMetadata)
  );

  if (updatedBackendUserMetadataOrError.isLeft()) {
    yield put(
      userMetadataUpsert.failure(updatedBackendUserMetadataOrError.value)
    );
    return none;
  }

  const updatedBackendUserMetadata = updatedBackendUserMetadataOrError.value;

  // Trasform back the metadata from plain string to an object.
  const updatedUserMetadataOrError = backendUserMetadataToUserMetadata(
    updatedBackendUserMetadata
  );

  if (updatedUserMetadataOrError.isLeft()) {
    yield put(userMetadataUpsert.failure(updatedUserMetadataOrError.value));
    return none;
  }

  yield put(userMetadataUpsert.success(updatedUserMetadataOrError.value));
  return some(updatedUserMetadataOrError.value);
}

/**
 * Extract the action payload and call upsertUserMetadata saga.
 */
export function* upsertUserMetadataManager(
  createOrUpdateUserMetadata: ReturnType<
    typeof BackendClient
  >["createOrUpdateUserMetadata"],
  action: ActionType<typeof userMetadataUpsert.request>
) {
  yield fork(upsertUserMetadata, createOrUpdateUserMetadata, action.payload);
}

/**
 * Listen for userMetadataUpsert.request and calls upsertUserMetadata saga.
 */
export function* watchUpserUserMetadata(
  createOrUpdateUserMetadata: ReturnType<
    typeof BackendClient
  >["createOrUpdateUserMetadata"]
) {
  yield takeLatest(
    getType(userMetadataUpsert.request),
    upsertUserMetadataManager,
    createOrUpdateUserMetadata
  );
}
