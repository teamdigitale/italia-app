import { readableReport } from "italia-ts-commons/lib/reporters";
import { call, Effect, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { BackendClient } from "../../api/backend";
import { contentServiceLoad } from "../../store/actions/content";
import { loadService } from "../../store/actions/services";
import { SagaCallReturnType } from "../../types/utils";

/**
 * A generator to load the service details from the Backend
 *
 * @param {function} getService - The function that makes the Backend request
 * @param {string} id - The id of the service to load
 * @returns {IterableIterator<Effect | Either<Error, ServicePublic>>}
 */
export function* loadServiceRequestHandler(
  getService: ReturnType<typeof BackendClient>["getService"],
  action: ActionType<typeof loadService["request"]>
): IterableIterator<Effect> {
  try {
    const response: SagaCallReturnType<typeof getService> = yield call(
      getService,
      { service_id: action.payload }
    );

    if (response.isLeft()) {
      throw Error(readableReport(response.value));
    }

    if (response.value.status === 200) {
      yield put(loadService.success(response.value.value));

      // Once the service content is loaded, the service metadata loading is requested.
      // Service metadata contains service scope (national/local) used to identify where
      // the service should be displayed into the ServiceHomeScreen
      yield put(contentServiceLoad.request(response.value.value.service_id));
    } else if (response.value.status === 400 || response.value.status === 401) {
      yield put(
        loadService.failure({
          service_id: action.payload,
          to_remove: true
        })
      );
    } else {
      throw Error();
    }
  } catch {
    yield put(loadService.failure({ service_id: action.payload }));
  }
}
