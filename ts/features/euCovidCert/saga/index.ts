import { SagaIterator } from "redux-saga";
import { call, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { euCovidCertificateGet } from "../store/actions";
import { BackendEuCovidCertClient } from "../api/backendEuCovidCert";
import { apiUrlPrefix } from "../../../config";
import { SessionToken } from "../../../types/SessionToken";
import { waitBackoffError } from "../../../utils/backoffError";
import { handleGetEuCovidCertificate } from "./networking/handleGetEuCovidCertificate";

/**
 * Handle the EU Covid Certificate requests
 * @param bearerToken
 */
export function* watchEUCovidCertificateSaga(
  bearerToken: SessionToken
): SagaIterator {
  const euCovidCertClient = BackendEuCovidCertClient(apiUrlPrefix, bearerToken);

  // handle the request of getting eu covid cert
  yield takeLatest(euCovidCertificateGet.request, function* (
    action: ActionType<typeof euCovidCertificateGet.request>
  ) {
    // wait backoff time it there were previous errors
    yield call(waitBackoffError, euCovidCertificateGet.failure);
    yield call(
      handleGetEuCovidCertificate,
      euCovidCertClient.getCertificate,
      action
    );
  });
}
