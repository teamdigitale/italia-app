/**
 * This module implements the types and a client for retrieving the static
 * content published at https://github.com/pagopa/io-services-metadata
 */
import {
  basicResponseDecoder,
  BasicResponseType,
  createFetchRequestForApi,
  IGetApiRequestType
} from "italia-ts-commons/lib/requests";
import { ServiceId } from "../../definitions/backend/ServiceId";
import { ContextualHelp } from "../../definitions/content/ContextualHelp";
import { Municipality as MunicipalityMedadata } from "../../definitions/content/Municipality";
import { Service as ServiceMetadata } from "../../definitions/content/Service";
import { CoBadgeServices } from "../../definitions/pagopa/cobadge/configuration/CoBadgeServices";
import { PrivativeServices } from "../../definitions/pagopa/privative/configuration/PrivativeServices";
import { contentRepoUrl } from "../config";
import { CodiceCatastale } from "../types/MunicipalityCodiceCatastale";
import { defaultRetryingFetch } from "../utils/fetch";
import { BonusesAvailable } from "../../definitions/content/BonusesAvailable";
import { AbiListResponse } from "../../definitions/pagopa/walletv2/AbiListResponse";
import { SpidIdps } from "../../definitions/content/SpidIdps";

type GetServiceT = IGetApiRequestType<
  {
    serviceId: ServiceId;
  },
  never,
  never,
  BasicResponseType<ServiceMetadata>
>;

const getServiceT: GetServiceT = {
  method: "get",
  url: params => `/services/${params.serviceId.toLowerCase()}.json`,
  query: _ => ({}),
  headers: _ => ({}),
  response_decoder: basicResponseDecoder(ServiceMetadata)
};

type GetMunicipalityT = IGetApiRequestType<
  {
    codiceCatastale: CodiceCatastale;
  },
  never,
  never,
  BasicResponseType<MunicipalityMedadata>
>;

const getMunicipalityT: GetMunicipalityT = {
  method: "get",
  url: params =>
    `/municipalities/${params.codiceCatastale[0]}/${params.codiceCatastale[1]}/${params.codiceCatastale}.json`,
  query: _ => ({}),
  headers: _ => ({}),
  response_decoder: basicResponseDecoder(MunicipalityMedadata)
};

type GetContextualHelpT = IGetApiRequestType<
  void,
  never,
  never,
  BasicResponseType<ContextualHelp>
>;

const getContextualHelpT: GetContextualHelpT = {
  method: "get",
  url: () => `/contextualhelp/data.json`,
  query: _ => ({}),
  headers: _ => ({}),
  response_decoder: basicResponseDecoder(ContextualHelp)
};

type GetBonusListT = IGetApiRequestType<
  Record<string, unknown>,
  never,
  never,
  BasicResponseType<BonusesAvailable>
>;

const getAvailableBonusesT: GetBonusListT = {
  method: "get",
  url: () => "/bonus/bonus_available_v2.json",
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(BonusesAvailable)
};

type GetAbisListT = IGetApiRequestType<
  void,
  never,
  never,
  BasicResponseType<AbiListResponse>
>;

const getAbisListT: GetAbisListT = {
  method: "get",
  url: () => "/status/abi.json",
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(AbiListResponse)
};

type GetCoBadgeServicesT = IGetApiRequestType<
  void,
  never,
  never,
  BasicResponseType<CoBadgeServices>
>;
const getCobadgeServicesT: GetCoBadgeServicesT = {
  method: "get",
  url: () => "/status/cobadgeServices.json",
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(CoBadgeServices)
};

type GetPrivativeServicesT = IGetApiRequestType<
  void,
  never,
  never,
  BasicResponseType<PrivativeServices>
>;
const getPrivativeServicesT: GetPrivativeServicesT = {
  method: "get",
  url: () => "/status/privativeServices.json",
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(PrivativeServices)
};

type GetIdpsListT = IGetApiRequestType<
  void,
  never,
  never,
  BasicResponseType<SpidIdps>
>;

const getIdpsT: GetIdpsListT = {
  method: "get",
  url: () => "/spid/idps/list.json",
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(SpidIdps)
};

/**
 * A client for the static content
 */
export function ContentClient(fetchApi: typeof fetch = defaultRetryingFetch()) {
  const options = {
    baseUrl: contentRepoUrl,
    fetchApi
  };

  return {
    getBonusAvailable: createFetchRequestForApi(getAvailableBonusesT, options),
    getService: createFetchRequestForApi(getServiceT, options),
    getMunicipality: createFetchRequestForApi(getMunicipalityT, options),
    getContextualHelp: createFetchRequestForApi(getContextualHelpT, options),
    getAbiList: createFetchRequestForApi(getAbisListT, options),
    getCobadgeServices: createFetchRequestForApi(getCobadgeServicesT, options),
    getPrivativeServices: createFetchRequestForApi(
      getPrivativeServicesT,
      options
    ),
    getIdps: createFetchRequestForApi(getIdpsT, options)
  };
}
