import { EUCovidCertificateResponseFailure } from "../EUCovidCertificateResponse";

export const euCertificateNotFound: EUCovidCertificateResponseFailure = {
  kind: "notFound"
};

export const euCertificateNotOperational: EUCovidCertificateResponseFailure = {
  kind: "notOperational"
};

export const euCertificateTemporarilyNotAvailable: EUCovidCertificateResponseFailure = {
  kind: "temporarilyNotAvailable"
};

export const euCertificateWrongFormat: EUCovidCertificateResponseFailure = {
  kind: "wrongFormat"
};
