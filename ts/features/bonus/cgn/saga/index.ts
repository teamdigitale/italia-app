import { SagaIterator } from "redux-saga";
import { takeEvery, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  cgnActivationStart,
  cgnRequestActivation
} from "../store/actions/activation";
import { apiUrlPrefix } from "../../../../config";
import { BackendCGN } from "../api/backendCgn";
import { cgnDetails } from "../store/actions/details";
import { cgnEycaDetails } from "../store/actions/eyca/details";
import { cgnEycaActivationRequest } from "../store/actions/eyca/activation";
import { cgnGenerateOtp as cgnGenerateOtpAction } from "../store/actions/otp";
import { handleCgnStartActivationSaga } from "./orchestration/activation/activationSaga";
import { handleCgnActivationSaga } from "./orchestration/activation/handleActivationSaga";
import {
  cgnActivationSaga,
  handleCgnStatusPolling
} from "./networking/activation/getBonusActivationSaga";
import { cgnGetInformationSaga } from "./networking/details/getCgnInformationSaga";
import { eycaGetInformationSaga } from "./networking/eyca/details/getEycaDetailSaga";
import { eycaActivationSaga } from "./orchestration/eyca/eycaActivationSaga";
import {
  handleEycaStatusPolling,
  requestEycaActivationSaga
} from "./networking/eyca/activation/getEycaActivationSaga";
import { cgnGenerateOtp } from "./networking/otp";


export function* watchBonusCgnSaga(bearerToken: string): SagaIterator {
  // create client to exchange data with the APIs
  const backendCGN = BackendCGN(apiUrlPrefix, bearerToken);

  // CGN Activation request with status polling
  yield takeLatest(
    getType(cgnRequestActivation),
    handleCgnActivationSaga,
    cgnActivationSaga(
      backendCGN.startCgnActivation,
      handleCgnStatusPolling(backendCGN.getCgnActivation)
    )
  );

  // CGN Activation workflow
  yield takeEvery(getType(cgnActivationStart), handleCgnStartActivationSaga);

  // CGN Load details
  yield takeLatest(
    getType(cgnDetails.request),
    cgnGetInformationSaga,
    backendCGN.getCgnStatus
  );

  // Eyca Load details
  yield takeLatest(
    getType(cgnEycaDetails.request),
    eycaGetInformationSaga,
    backendCGN.getEycaStatus,
    backendCGN.getEycaActivation
  );

  yield takeLatest(
    getType(cgnEycaActivationRequest),
    eycaActivationSaga,
    requestEycaActivationSaga(
      backendCGN.startEycaActivation,
      handleEycaStatusPolling(backendCGN.getEycaActivation)
    )
  );
  
  // CGN Otp generation
  yield takeLatest(
    getType(cgnGenerateOtpAction.request),
    cgnGenerateOtp,
    backendCGN.generateOtp
  );
}
