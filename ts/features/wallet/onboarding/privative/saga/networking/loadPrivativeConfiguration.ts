import { readableReport } from "italia-ts-commons/lib/reporters";
import { call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { ContentClient } from "../../../../../../api/content";
import { SagaCallReturnType } from "../../../../../../types/utils";
import { getNetworkError } from "../../../../../../utils/errors";
import { loadCoBadgeAbiConfiguration } from "../../../cobadge/store/actions";
import { loadPrivativeBrandConfiguration } from "../../store/actions";

/**
 * Load CoBadge configuration
 */
export function* handleLoadPrivativeConfiguration(
  getPrivativeServices: ReturnType<
    typeof ContentClient
  >["getPrivativeServices"],
  _: ActionType<typeof loadPrivativeBrandConfiguration.request>
) {
  try {
    const getPrivativeServicesResult: SagaCallReturnType<typeof getPrivativeServices> = yield call(
      getPrivativeServices
    );
    if (getPrivativeServicesResult.isRight()) {
      if (getPrivativeServicesResult.value.status === 200) {
        yield put(
          loadPrivativeBrandConfiguration.success(
            getPrivativeServicesResult.value.value
          )
        );
      } else {
        throw new Error(
          `response status ${getPrivativeServicesResult.value.status}`
        );
      }
    } else {
      throw new Error(readableReport(getPrivativeServicesResult.value));
    }
  } catch (e) {
    yield put(loadCoBadgeAbiConfiguration.failure(getNetworkError(e)));
  }
}
