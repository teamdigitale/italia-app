import {
  ApiHeaderJson,
  composeHeaderProducers,
  createFetchRequestForApi
} from "italia-ts-commons/lib/requests";
import { SessionToken } from "../../../types/SessionToken";
import { defaultRetryingFetch } from "../../../utils/fetch";
import {
  tokenHeaderProducer,
  withBearerToken as withToken
} from "../../../utils/api";
import {
  getCertificateDefaultDecoder,
  GetCertificateT
} from "../../../../definitions/eu_covid_cert/requestTypes";

const getCertificate: GetCertificateT = {
  method: "post",
  url: () => "/api/v1/eucovidcert/certificate",
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  query: _ => ({}),
  body: p => JSON.stringify({ accessData: p.getCertificateParams }),
  response_decoder: getCertificateDefaultDecoder()
};

// client for eu covid to handle API communications
export const BackendEuCovidCertClient = (
  baseUrl: string,
  token: SessionToken,
  fetchApi: typeof fetch = defaultRetryingFetch()
) => {
  const options = {
    baseUrl,
    fetchApi
  };
  const withBearerToken = withToken(token);
  return {
    getCertificate: withBearerToken(
      createFetchRequestForApi(getCertificate, options)
    )
  };
};
