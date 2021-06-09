import {
  EUCovidCertificate,
  EUCovidCertificateAuthCode
} from "./EUCovidCertificate";

export type EUCovidCertificateResponseSuccess = {
  kind: "success";
  value: EUCovidCertificate;
};

/**
 * The required certificated is not found (403)
 */
type EUCovidCertificateResponseNotFound = {
  kind: "notFound";
};

/**
 * The required certificate have a wrong format (400)
 */
type EUCovidCertificateResponseWrongFormat = {
  kind: "wrongFormat";
};

/**
 * The EU Covid certificate service is not operational (410)
 */
type EUCovidCertificateResponseNotOperational = {
  kind: "notOperational";
};

/**
 * The EU Covid certificate service is not operational (504)
 */
type EUCovidCertificateResponseTemporarilyNotAvailable = {
  kind: "temporarilyNotAvailable";
};

export type EUCovidCertificateResponseFailure =
  | EUCovidCertificateResponseNotFound
  | EUCovidCertificateResponseWrongFormat
  | EUCovidCertificateResponseNotOperational
  | EUCovidCertificateResponseTemporarilyNotAvailable;

/**
 * Bind the response with the initial authCode
 */
export type WithEUCovidCertAuthCode<T> = T & {
  authCode: EUCovidCertificateAuthCode;
};

/**
 * This type represents all the possible remote responses
 */
export type EUCovidCertificateResponse = WithEUCovidCertAuthCode<
  EUCovidCertificateResponseSuccess | EUCovidCertificateResponseFailure
>;

export const isEuCovidCertificateSuccessResponse = (
  r: EUCovidCertificateResponse
): r is WithEUCovidCertAuthCode<EUCovidCertificateResponseSuccess> =>
  r.kind === "success";
