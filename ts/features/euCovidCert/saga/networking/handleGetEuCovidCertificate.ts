import * as pot from "italia-ts-commons/lib/pot";
import { fromNullable } from "fp-ts/lib/Option";
import { call, put, select } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { Certificate } from "../../../../../definitions/eu_covid_cert/Certificate";
import { mixpanelTrack } from "../../../../mixpanel";
import { SagaCallReturnType } from "../../../../types/utils";
import { getGenericError, getNetworkError } from "../../../../utils/errors";
import { readablePrivacyReport } from "../../../../utils/reporters";
import { BackendEuCovidCertClient } from "../../api/backendEuCovidCert";
import { euCovidCertificateGet } from "../../store/actions";
import {
  EUCovidCertificate,
  EUCovidCertificateAuthCode
} from "../../types/EUCovidCertificate";
import {
  EUCovidCertificateResponse,
  EUCovidCertificateResponseFailure
} from "../../types/EUCovidCertificateResponse";
import { profileSelector } from "../../../../store/reducers/profile";
import { PreferredLanguageEnum } from "../../../../../definitions/backend/PreferredLanguage";

const mapKinds: Record<number, EUCovidCertificateResponseFailure["kind"]> = {
  400: "wrongFormat",
  403: "notFound",
  410: "notOperational",
  504: "temporarilyNotAvailable"
};

// convert a success response to the logical app representation of it
const convertSuccess = (
  certificate: Certificate,
  authCode: EUCovidCertificateAuthCode
): EUCovidCertificateResponse => {
  const getCertificate = (): EUCovidCertificate | undefined => {
    switch (certificate.status) {
      case "valid":
        return {
          kind: "valid",
          id: certificate.uvci as EUCovidCertificate["id"],
          qrCode: {
            mimeType: certificate.qr_code.mime_type,
            content: certificate.qr_code.content
          },
          markdownInfo: certificate.info,
          markdownDetails: certificate.detail
        };
      case "revoked":
        return {
          kind: "revoked",
          id: certificate.uvci as EUCovidCertificate["id"],
          revokedOn: certificate.revoked_on,
          markdownInfo: certificate.info
        };
      case "expired":
        return {
          kind: "expired",
          id: certificate.uvci as EUCovidCertificate["id"],
          markdownInfo: certificate.info
        };
      default:
        return undefined;
    }
  };
  return fromNullable(getCertificate()).foldL<EUCovidCertificateResponse>(
    () => {
      // track the conversion failure
      void mixpanelTrack("EUCOVIDCERT_CONVERT_SUCCESS_ERROR", {
        status: certificate.status
      });
      return { kind: "wrongFormat", authCode };
    },
    value => ({ kind: "success", value, authCode })
  );
};

/**
 * Handle the remote call to retrieve the certificate data
 * @param getCertificate
 * @param action
 */
export function* handleGetEuCovidCertificate(
  getCertificate: ReturnType<typeof BackendEuCovidCertClient>["getCertificate"],
  action: ActionType<typeof euCovidCertificateGet.request>
) {
  const authCode = action.payload;

  const profile: ReturnType<typeof profileSelector> = yield select(
    profileSelector
  );

  try {
    const getCertificateResult: SagaCallReturnType<typeof getCertificate> = yield call(
      getCertificate,
      {
        getCertificateParams: {
          auth_code: authCode,
          preferred_languages: pot.getOrElse(
            pot.mapNullable(profile, p => p.preferred_languages),
            [PreferredLanguageEnum.it_IT]
          )
        }
      }
    );
    if (getCertificateResult.isRight()) {
      if (getCertificateResult.value.status === 200) {
        // handled success
        yield put(
          euCovidCertificateGet.success(
            convertSuccess(getCertificateResult.value.value, authCode)
          )
        );
        return;
      }
      if (mapKinds[getCertificateResult.value.status] !== undefined) {
        yield put(
          euCovidCertificateGet.success({
            kind: mapKinds[getCertificateResult.value.status],
            authCode
          })
        );
        return;
      }
      // not handled error codes
      yield put(
        euCovidCertificateGet.failure({
          ...getGenericError(
            new Error(
              `response status code ${getCertificateResult.value.status}`
            )
          ),
          authCode
        })
      );
    } else {
      // cannot decode response
      yield put(
        euCovidCertificateGet.failure({
          ...getGenericError(
            new Error(readablePrivacyReport(getCertificateResult.value))
          ),
          authCode
        })
      );
    }
  } catch (e) {
    yield put(
      euCovidCertificateGet.failure({ ...getNetworkError(e), authCode })
    );
  }
}
