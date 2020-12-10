import * as t from "io-ts";
import {
  ApiHeaderJson,
  basicResponseDecoder,
  BasicResponseType,
  createFetchRequestForApi,
  IGetApiRequestType,
  IPostApiRequestType
} from "italia-ts-commons/lib/requests";
import { AccessToken } from "../../definitions/backend/AccessToken";
import { PasswordLogin } from "../../definitions/backend/PasswordLogin";
import { ServerInfo } from "../../definitions/backend/ServerInfo";
import { defaultRetryingFetch } from "../utils/fetch";

type GetServerInfoT = IGetApiRequestType<
  Record<string, unknown>,
  never,
  never,
  BasicResponseType<ServerInfo>
>;

type PostTestLoginT = IPostApiRequestType<
  PasswordLogin,
  "Content-Type",
  never,
  BasicResponseType<AccessToken>
>;

const LocalizedMessage = t.interface({
  "en-EN": t.string,
  "it-IT": t.string
});

const BackendStatusR = t.interface({
  is_alive: t.boolean,
  message: LocalizedMessage
});

const Levels = t.keyof({
  critical: null,
  normal: null,
  warning: null
});

// SectionStatus represents the status of a single section
const SectionStatusR = t.interface({
  is_visible: t.boolean,
  level: Levels,
  message: LocalizedMessage
});

const SectionStatusO = t.partial({
  badge: LocalizedMessage,
  web_url: LocalizedMessage
});

export const SectionStatus = t.intersection(
  [SectionStatusR, SectionStatusO],
  "SectionStatus"
);
export type SectionStatus = t.TypeOf<typeof SectionStatus>;

const Sections = t.interface({
  bancomat: SectionStatus,
  bancomatpay: SectionStatus,
  cashback: SectionStatus,
  credit_card: SectionStatus,
  digital_payments: SectionStatus,
  email_validation: SectionStatus,
  ingress: SectionStatus,
  login: SectionStatus,
  messages: SectionStatus,
  satispay: SectionStatus,
  services: SectionStatus,
  wallets: SectionStatus
});
export type Sections = t.TypeOf<typeof Sections>;
const BackendStatusO = t.partial({
  sections: Sections
});

export const BackendStatus = t.intersection(
  [BackendStatusR, BackendStatusO],
  "BackendStatus"
);
export type SectionStatusKey = keyof Sections;
export type BackendStatus = t.TypeOf<typeof BackendStatus>;

type GetStatusT = IGetApiRequestType<
  Record<string, unknown>,
  never,
  never,
  BasicResponseType<BackendStatus>
>;

export function CdnBackendStatusClient(
  baseUrl: string,
  fetchApi: typeof fetch = defaultRetryingFetch()
) {
  const options = {
    baseUrl,
    fetchApi
  };

  const getStatusT: GetStatusT = {
    method: "get",
    // to avoid response caching
    url: () => `backend.json?ms=${new Date().getTime()}`,
    query: _ => ({}),
    headers: () => ({}),
    response_decoder: basicResponseDecoder(BackendStatus)
  };
  return {
    getStatus: createFetchRequestForApi(getStatusT, options)
  };
}
//
// Create client
//

export function BackendPublicClient(
  baseUrl: string,
  fetchApi: typeof fetch = defaultRetryingFetch()
) {
  const options = {
    baseUrl,
    fetchApi
  };

  const getServerInfoT: GetServerInfoT = {
    method: "get",
    // to avoid response caching
    url: () => `/info?ms=${new Date().getTime()}`,
    query: _ => ({}),
    headers: () => ({}),
    response_decoder: basicResponseDecoder(ServerInfo)
  };

  const postLoginTestT: PostTestLoginT = {
    method: "post",
    url: () => `/test-login`,
    query: _ => ({}),
    headers: ApiHeaderJson,
    body: (passwordLogin: PasswordLogin) => JSON.stringify(passwordLogin),
    response_decoder: basicResponseDecoder(AccessToken)
  };

  return {
    getServerInfo: createFetchRequestForApi(getServerInfoT, options),
    postTestLogin: createFetchRequestForApi(postLoginTestT, options)
  };
}
