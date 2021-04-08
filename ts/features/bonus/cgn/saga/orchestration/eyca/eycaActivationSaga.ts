import { call, put, race, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { NavigationActions } from "react-navigation";
import {
  navigateToCgnDetails,
  navigateToEycaActivationLoading
} from "../../../navigation/actions";
import {
  getActivation,
  handleEycaActivationSaga,
  handleStartActivation
} from "../../networking/eyca/activation/getEycaActivationSaga";
import { navigationHistoryPop } from "../../../../../../store/actions/navigationHistory";
import {
  cgnEycaActivation,
  cgnEycaActivationCancel
} from "../../../store/actions/eyca/activation";
import { BackendCGN } from "../../../api/backendCgn";
import { cgnEycaStatus } from "../../../store/actions/eyca/details";
import { SagaCallReturnType } from "../../../../../../types/utils";

export function* eycaActivationWorker(
  getEycaActivation: ReturnType<typeof BackendCGN>["getEycaActivation"],
  startEycaActivation: ReturnType<typeof BackendCGN>["startEycaActivation"]
) {
  yield put(navigateToEycaActivationLoading());
  yield put(navigationHistoryPop(1));

  const eycaActivation: SagaCallReturnType<typeof getActivation> = yield call(
    getActivation,
    getEycaActivation
  );

  if (eycaActivation.isRight()) {
    if (eycaActivation.value === "PROCESSING") {
      yield call(handleEycaActivationSaga, getEycaActivation);
    } else {
      const startActivation: SagaCallReturnType<typeof handleStartActivation> = yield call(
        handleStartActivation,
        startEycaActivation
      );
      // activation not handled error, stop
      if (startActivation.isLeft()) {
        yield put(cgnEycaActivation.failure(startActivation.value));
        return;
      } else {
        // could be: ALREADY_ACTIVE, INELIGIBLE
        if (startActivation.value !== "PROCESSING") {
          yield put(cgnEycaActivation.success(startActivation.value));
          return;
        } else {
          yield call(handleEycaActivationSaga, getEycaActivation);
        }
      }
    }
  }

  // Activation saga ended, request again the details
  yield put(cgnEycaStatus.request());

  yield put(navigateToCgnDetails());
  yield put(navigationHistoryPop(1));
}

/**
 * This saga handles the CGN activation polling
 */
export function* eycaActivationSaga(
  getEycaActivation: ReturnType<typeof BackendCGN>["getEycaActivation"],
  startEycaActivation: ReturnType<typeof BackendCGN>["startEycaActivation"]
): SagaIterator {
  const { cancelAction } = yield race({
    activation: call(
      eycaActivationWorker,
      getEycaActivation,
      startEycaActivation
    ),
    cancelAction: take(cgnEycaActivationCancel)
  });
  if (cancelAction) {
    yield put(NavigationActions.back());
  }
}
