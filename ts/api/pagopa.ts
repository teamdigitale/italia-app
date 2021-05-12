/**
 * pagoPA backend client, with functions
 * to call the different API available
 */
import { flip } from "fp-ts/lib/function";
import { fromNullable } from "fp-ts/lib/Option";

import * as t from "io-ts";
import * as r from "italia-ts-commons/lib/requests";
import {
  AddResponseType,
  ApiHeaderJson,
  composeHeaderProducers,
  composeResponseDecoders,
  constantResponseDecoder,
  createFetchRequestForApi,
  ioResponseDecoder,
  MapResponseType,
  ReplaceRequestParams,
  RequestHeaderProducer,
  RequestHeaders,
  TypeofApiParams
} from "italia-ts-commons/lib/requests";
import { Omit } from "italia-ts-commons/lib/types";
import _ from "lodash";
import { BancomatCardsRequest } from "../../definitions/pagopa/walletv2/BancomatCardsRequest";
import {
  AddWalletSatispayUsingPOSTT,
  addWalletsBancomatCardUsingPOSTDecoder,
  addWalletsBPayUsingPOSTDecoder,
  addWalletsCobadgePaymentInstrumentAsCreditCardUsingPOSTDecoder,
  getAbiListUsingGETDefaultDecoder,
  GetAbiListUsingGETT,
  getBpayListUsingGETDefaultDecoder,
  GetBpayListUsingGETT,
  getCobadgeByRequestIdUsingGETDefaultDecoder,
  GetCobadgeByRequestIdUsingGETT,
  getCobadgesUsingGETDefaultDecoder,
  GetCobadgesUsingGETT,
  GetConsumerUsingGETT,
  getPansUsingGETDefaultDecoder,
  GetPansUsingGETT,
  getWalletsV2UsingGETDecoder
} from "../../definitions/pagopa/walletv2/requestTypes";
import {
  addWalletCreditCardUsingPOSTDecoder,
  AddWalletCreditCardUsingPOSTT,
  addWalletSatispayUsingPOSTDecoder,
  checkPaymentUsingGETDefaultDecoder,
  CheckPaymentUsingGETT,
  DeleteBySessionCookieExpiredUsingDELETET,
  DeleteWalletUsingDELETET,
  favouriteWalletUsingPOSTDecoder,
  FavouriteWalletUsingPOSTT,
  GetAllPspsUsingGETT,
  getConsumerUsingGETDefaultDecoder,
  getPspListUsingGETDecoder,
  GetPspListUsingGETT,
  getPspUsingGETDecoder,
  GetPspUsingGETT,
  getSelectedPspUsingGETDecoder,
  getTransactionsUsingGETDecoder,
  getTransactionUsingGETDecoder,
  GetTransactionUsingGETT,
  GetWalletsUsingGETT,
  payCreditCardVerificationUsingPOSTDecoder,
  PayCreditCardVerificationUsingPOSTT,
  startSessionUsingGETDecoder,
  StartSessionUsingGETT,
  updateWalletUsingPUTDecoder,
  UpdateWalletUsingPUTT
} from "../../definitions/pagopa/requestTypes";
import {
  NullableWallet,
  PagoPAErrorResponse,
  PatchedWalletV2ListResponse,
  PatchedWalletV2Response,
  PaymentManagerToken,
  PspListResponse,
  PspResponse,
  SessionResponse,
  TransactionListResponse,
  TransactionResponse,
  WalletListResponse,
  WalletResponse
} from "../types/pagopa";
import { getLocalePrimaryWithFallback } from "../utils/locale";
import { fixWalletPspTagsValues } from "../utils/wallet";
import { SatispayRequest } from "../../definitions/pagopa/walletv2/SatispayRequest";
import { BPayRequest } from "../../definitions/pagopa/walletv2/BPayRequest";
import { CobadegPaymentInstrumentsRequest } from "../../definitions/pagopa/walletv2/CobadegPaymentInstrumentsRequest";
import { format } from "../utils/dates";
import { getLookUpId, pmLookupHeaderKey } from "../utils/pmLookUpId";

/**
 * A decoder that ignores the content of the payload and only decodes the status
 */
const constantEmptyDecoder = composeResponseDecoders(
  composeResponseDecoders(
    composeResponseDecoders(
      constantResponseDecoder(200, undefined),
      constantResponseDecoder<undefined, 204>(204, undefined)
    ),
    constantResponseDecoder<undefined, 401>(401, undefined)
  ),
  constantResponseDecoder<undefined, 403>(403, undefined)
);

const getSession: MapResponseType<
  StartSessionUsingGETT,
  200,
  SessionResponse
> = {
  method: "get",
  url: _ => "/v1/users/actions/start-session",
  query: _ => _,
  headers: () => ({}),
  response_decoder: startSessionUsingGETDecoder(SessionResponse)
};

// to support 'start' param in query string we re-define the type GetTransactionsUsingGETT
// because the generated one doesn't support 'start' due to weak specs in api definition
export type GetTransactionsUsingGETT = r.IGetApiRequestType<
  { readonly Bearer: string; readonly start: number },
  "Authorization",
  never,
  // eslint-disable-next-line
  | r.IResponseType<200, TransactionListResponse>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;

type GetTransactionsUsingGETTExtra = MapResponseType<
  GetTransactionsUsingGETT,
  200,
  TransactionListResponse
>;

const ParamAuthorizationBearerHeader = <
  P extends { readonly Bearer: string; readonly LookUpId?: string }
>(
  p: P
): { Authorization: string; LookUpId?: string } => ({
  Authorization: `Bearer ${p.Bearer}`,
  ...(p.LookUpId ? { [pmLookupHeaderKey]: p.LookUpId } : {})
});

const ParamAuthorizationBearerHeaderProducer = <
  P extends { readonly Bearer: string }
>(): RequestHeaderProducer<P, "Authorization"> => (
  p: P
): RequestHeaders<"Authorization"> => ParamAuthorizationBearerHeader(p);

const tokenHeaderProducer = ParamAuthorizationBearerHeaderProducer();
const transactionsSliceLength = 10;
const getTransactions: GetTransactionsUsingGETTExtra = {
  method: "get",
  url: ({ start }) =>
    `/v1/transactions?start=${start}&size=${transactionsSliceLength}`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getTransactionsUsingGETDecoder(TransactionListResponse)
};

type GetTransactionUsingGETTExtra = MapResponseType<
  GetTransactionUsingGETT,
  200,
  TransactionResponse
>;

const getTransaction: GetTransactionUsingGETTExtra = {
  method: "get",
  url: ({ id }) => `/v1/transactions/${id}`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getTransactionUsingGETDecoder(TransactionResponse)
};

type GetWalletsUsingGETExtraT = MapResponseType<
  GetWalletsUsingGETT,
  200,
  WalletListResponse
>;

/**
 *
 * This patch is needed because 'tags' field (an array of strings) in psp objects
 * often contains mixed (and duplicated too) values
 * e.g tags = ["value1",null,null]
 * Psp codec fails decoding 'tags' having these values, so this getPatchedWalletsUsingGETDecoder alterates the
 * payload just before the decoding phase making 'tags' an empty array
 * TODO: temporary patch. Remove this patch once SIA has fixed the spec.
 * @see https://www.pivotaltracker.com/story/show/166665367
 */
const getPatchedWalletsUsingGETDecoder = <O>(
  type: t.Type<WalletListResponse, O>
) =>
  r.composeResponseDecoders(
    r.composeResponseDecoders(
      r.composeResponseDecoders(
        r.ioResponseDecoder<200, typeof type["_A"], typeof type["_O"]>(
          200,
          type,
          payload => {
            if (payload && payload.data && Array.isArray(payload.data)) {
              // sanitize wallets from values with type different
              // from string contained in psp.tags arrays
              const newData = payload.data.map((w: any) =>
                fixWalletPspTagsValues(w)
              );
              return { ...payload, data: newData };
            }
            return payload;
          }
        ),
        r.constantResponseDecoder<undefined, 401>(401, undefined)
      ),
      r.constantResponseDecoder<undefined, 403>(403, undefined)
    ),
    r.constantResponseDecoder<undefined, 404>(404, undefined)
  );

const getWallets: GetWalletsUsingGETExtraT = {
  method: "get",
  url: () => "/v1/wallet",
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getPatchedWalletsUsingGETDecoder(WalletListResponse)
};

export type GetWalletsV2UsingGETTExtra = r.IGetApiRequestType<
  { readonly Bearer: string },
  "Authorization",
  never,
  | r.IResponseType<200, PatchedWalletV2ListResponse>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;
const getWalletsV2: GetWalletsV2UsingGETTExtra = {
  method: "get",
  url: () => "/v2/wallet",
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getWalletsV2UsingGETDecoder(PatchedWalletV2ListResponse)
};

const checkPayment: CheckPaymentUsingGETT = {
  method: "get",
  url: ({ id }) => `/v1/payments/${id}/actions/check`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeaderProducer,
  response_decoder: checkPaymentUsingGETDefaultDecoder()
};

type GetPspListUsingGETTExtra = MapResponseType<
  ReplaceRequestParams<
    GetPspListUsingGETT,
    // TODO: temporary patch, see https://www.pivotaltracker.com/story/show/161475199
    TypeofApiParams<GetPspListUsingGETT> & {
      idWallet?: number;
      language?: string;
    }
  >,
  200,
  PspListResponse
>;

const getPspList: GetPspListUsingGETTExtra = {
  method: "get",
  url: () => "/v1/psps",
  query: ({ idPayment, idWallet, language }) =>
    idWallet
      ? {
          paymentType: "CREDIT_CARD",
          idPayment,
          idWallet,
          language
        }
      : {
          paymentType: "CREDIT_CARD",
          idPayment,
          language
        },
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getPspListUsingGETDecoder(PspListResponse)
};

type PspParams = {
  readonly Bearer: string;
  readonly idWallet: string;
  readonly idPayment: string;
  readonly language: string;
};
export type GetSelectedPspUsingGETTExtra = r.IGetApiRequestType<
  PspParams,
  "Authorization",
  never,
  | r.IResponseType<200, PspListResponse>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;
const getPspQuery = (params: PspParams) => {
  const { idPayment, idWallet, language } = params;
  return {
    idPayment,
    idWallet,
    language
  };
};
const getPspSelected: GetSelectedPspUsingGETTExtra = {
  method: "get",
  url: () => "/v1/psps/selected",
  query: getPspQuery,
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getSelectedPspUsingGETDecoder(PspListResponse)
};

type GetAllPspListUsingGETTExtra = MapResponseType<
  GetAllPspsUsingGETT,
  200,
  PspListResponse
>;

const getAllPspList: GetAllPspListUsingGETTExtra = {
  method: "get",
  url: () => "/v1/psps/all",
  query: getPspQuery,
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getPspListUsingGETDecoder(PspListResponse)
};

type GetPspUsingGETTExtra = MapResponseType<GetPspUsingGETT, 200, PspResponse>;

const getPsp: GetPspUsingGETTExtra = {
  method: "get",
  url: ({ id }) => `/v1/psps/${id}`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getPspUsingGETDecoder(PspResponse)
};

type UpdateWalletUsingPUTTExtra = MapResponseType<
  UpdateWalletUsingPUTT,
  200,
  WalletResponse
>;

const updateWalletPsp: UpdateWalletUsingPUTTExtra = {
  method: "put",
  url: ({ id }) => `/v1/wallet/${id}`,
  query: () => ({}),
  body: ({ walletRequest }) => JSON.stringify(walletRequest),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: updateWalletUsingPUTDecoder(WalletResponse)
};

type FavouriteWalletUsingPOSTTExtra = MapResponseType<
  FavouriteWalletUsingPOSTT,
  200,
  WalletResponse
>;

const favouriteWallet: FavouriteWalletUsingPOSTTExtra = {
  method: "post",
  url: ({ id }) => `/v1/wallet/${id}/actions/favourite`,
  query: () => ({}),
  body: () => "",
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: favouriteWalletUsingPOSTDecoder(WalletResponse)
};

// Remove this patch once SIA has fixed the spec.
type AddWalletCreditCardUsingPOSTTExtra = MapResponseType<
  AddResponseType<AddWalletCreditCardUsingPOSTT, 422, PagoPAErrorResponse>,
  200,
  WalletResponse
>;

const addWalletCreditCard: AddWalletCreditCardUsingPOSTTExtra = {
  method: "post",
  url: () => "/v1/wallet/cc",
  query: () => ({}),
  body: ({ walletRequest }) => JSON.stringify(walletRequest),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: composeResponseDecoders(
    addWalletCreditCardUsingPOSTDecoder(WalletResponse),
    ioResponseDecoder<422, PagoPAErrorResponse>(422, PagoPAErrorResponse)
  )
};

const deletePayment: DeleteBySessionCookieExpiredUsingDELETET = {
  method: "delete",
  url: ({ id }) => `/v1/payments/${id}/actions/delete`,
  query: () => ({}),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: constantEmptyDecoder
};

type PayCreditCardVerificationUsingPOSTTExtra = MapResponseType<
  PayCreditCardVerificationUsingPOSTT,
  200,
  TransactionResponse
>;

const boardPay: PayCreditCardVerificationUsingPOSTTExtra = {
  method: "post",
  url: () => "/v1/payments/cc/actions/pay",
  query: () => ({}),
  body: ({ payRequest }) => JSON.stringify(payRequest),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: payCreditCardVerificationUsingPOSTDecoder(
    TransactionResponse
  )
};

const deleteWallet: DeleteWalletUsingDELETET = {
  method: "delete",
  url: ({ id }) => `/v1/wallet/${id}`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: constantEmptyDecoder
};

const getAbi: GetAbiListUsingGETT = {
  method: "get",
  url: () => `/v1/bancomat/abi?size=10000`, // FIXME needed to retrieve the whole bank list
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getAbiListUsingGETDefaultDecoder()
};

const getPans: GetPansUsingGETT = {
  method: "get",
  url: ({ abi }) => {
    const abiParameter = fromNullable(abi)
      .map(a => `?abi=${a}`)
      .getOrElse("");
    return `/v1/bancomat/pans${abiParameter}`;
  },
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getPansUsingGETDefaultDecoder()
};

export type AddWalletsBancomatCardUsingPOSTTExtra = r.IPostApiRequestType<
  {
    readonly Bearer: string;
    readonly bancomatCardsRequest: BancomatCardsRequest;
  },
  "Content-Type" | "Authorization",
  never,
  | r.IResponseType<200, PatchedWalletV2ListResponse>
  | r.IResponseType<201, undefined>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;

const addPans: AddWalletsBancomatCardUsingPOSTTExtra = {
  method: "post",
  url: () => `/v1/bancomat/add-wallets`,
  query: () => ({}),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  body: p => JSON.stringify(p.bancomatCardsRequest),
  response_decoder: addWalletsBancomatCardUsingPOSTDecoder(
    PatchedWalletV2ListResponse
  )
};

const searchSatispay: GetConsumerUsingGETT = {
  method: "get",
  url: () => `/v1/satispay/consumers`,
  query: () => ({}),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: getConsumerUsingGETDefaultDecoder()
};

const addSatispayToWallet: AddWalletSatispayUsingPOSTT = {
  method: "post",
  url: () => `/v1/satispay/add-wallet`,
  query: () => ({}),
  body: ({ satispayRequest }) => JSON.stringify(satispayRequest),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: addWalletSatispayUsingPOSTDecoder(PatchedWalletV2Response)
};

const searchBPay: GetBpayListUsingGETT = {
  method: "get",
  url: ({ abi }) => {
    const abiParameter = fromNullable(abi)
      .map(a => `?abi=${a}`)
      .getOrElse("");
    return `/v1/bpay/list${abiParameter}`;
  },
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getBpayListUsingGETDefaultDecoder()
};

const getCobadgePans: GetCobadgesUsingGETT = {
  method: "get",
  url: ({ abiCode }) => {
    const abiParameter = fromNullable(abiCode)
      .map(a => `?abiCode=${a}`)
      .getOrElse("");
    return `/v1/cobadge/pans${abiParameter}`;
  },
  query: () => ({}),
  headers: p => {
    const authBearer = ParamAuthorizationBearerHeader(p);
    return p.PanCode ? { ...authBearer, PanCode: p.PanCode } : authBearer;
  },
  response_decoder: getCobadgesUsingGETDefaultDecoder()
};

const searchCobadgePans: GetCobadgeByRequestIdUsingGETT = {
  method: "get",
  url: ({ searchRequestId }) => `/v1/cobadge/search/${searchRequestId}`,
  query: () => ({}),
  headers: ParamAuthorizationBearerHeader,
  response_decoder: getCobadgeByRequestIdUsingGETDefaultDecoder()
};

export type AddWalletsCobadge = r.IPostApiRequestType<
  {
    readonly Bearer: string;
    readonly cobadegPaymentInstrumentsRequest: CobadegPaymentInstrumentsRequest;
  },
  "Content-Type" | "Authorization",
  never,
  | r.IResponseType<200, PatchedWalletV2ListResponse>
  | r.IResponseType<201, undefined>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;

const cobadgeInstrumentReplacer = (key: string | number, value: any) => {
  if (key !== "expiringDate") {
    return value;
  }
  const date = new Date(value);
  if (!_.isDate(date)) {
    return value;
  }
  return format(date, "YYYY-MM-DD");
};

const addCobadgeToWallet: AddWalletsCobadge = {
  method: "post",
  url: () => `/v1/cobadge/add-wallets`,
  query: () => ({}),
  body: ({ cobadegPaymentInstrumentsRequest }) =>
    // request payload must have 'expiringDate' field with a specific format
    // see https://www.pivotaltracker.com/story/show/176720702
    JSON.stringify(cobadegPaymentInstrumentsRequest, cobadgeInstrumentReplacer),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: addWalletsCobadgePaymentInstrumentAsCreditCardUsingPOSTDecoder(
    PatchedWalletV2ListResponse
  )
};

export type AddWalletsBPayUsingPOSTTExtra = r.IPostApiRequestType<
  { readonly Bearer: string; readonly bPayRequest: BPayRequest },
  "Content-Type" | "Authorization",
  never,
  | r.IResponseType<200, PatchedWalletV2ListResponse>
  | r.IResponseType<201, undefined>
  | r.IResponseType<401, undefined>
  | r.IResponseType<403, undefined>
  | r.IResponseType<404, undefined>
>;

const addBPayToWallet: AddWalletsBPayUsingPOSTTExtra = {
  method: "post",
  url: () => `/v1/bpay/add-wallets`,
  query: () => ({}),
  body: ({ bPayRequest }) => JSON.stringify(bPayRequest),
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: addWalletsBPayUsingPOSTDecoder(PatchedWalletV2ListResponse)
};

const withPaymentManagerToken = <
  P extends { Bearer: string; LookUpId?: string },
  R
>(
  f: (p: P) => Promise<R>
) => (token: PaymentManagerToken) => async (
  po: Omit<P, "Bearer">
): Promise<R> => {
  const params = Object.assign(
    { Bearer: String(token), LookUpId: getLookUpId() },
    po
  ) as P;
  return f(params);
};

export function PaymentManagerClient(
  baseUrl: string,
  walletToken: string,
  fetchApi: typeof fetch,
  altFetchApi: typeof fetch
) {
  const options = { baseUrl, fetchApi };
  const altOptions = {
    ...options,
    fetchApi: altFetchApi
  };

  return {
    walletToken,
    getSession: (
      wt: string // wallet token
    ) => createFetchRequestForApi(getSession, options)({ token: wt }),
    getWallets: flip(
      withPaymentManagerToken(createFetchRequestForApi(getWallets, options))
    )({}),
    getWalletsV2: flip(
      withPaymentManagerToken(createFetchRequestForApi(getWalletsV2, options))
    )({}),
    getTransactions: (start: number) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(getTransactions, options)
        )
      )({ start }),
    getTransaction: (id: TypeofApiParams<GetTransactionUsingGETT>["id"]) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(getTransaction, options)
        )
      )({ id }),
    checkPayment: (id: TypeofApiParams<CheckPaymentUsingGETT>["id"]) =>
      createFetchRequestForApi(
        checkPayment,
        altOptions
      )({
        id
      }),
    getPspList: (
      idPayment: TypeofApiParams<GetPspListUsingGETTExtra>["idPayment"],
      idWallet?: TypeofApiParams<GetPspListUsingGETTExtra>["idWallet"]
    ) =>
      flip(
        withPaymentManagerToken(createFetchRequestForApi(getPspList, options))
      )(
        idWallet
          ? {
              idPayment,
              idWallet,
              language: getLocalePrimaryWithFallback()
            }
          : { idPayment, language: getLocalePrimaryWithFallback() }
      ),
    getAllPspList: (
      idPayment: TypeofApiParams<GetAllPspsUsingGETT>["idPayment"],
      idWallet: TypeofApiParams<GetAllPspsUsingGETT>["idWallet"]
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(getAllPspList, options)
        )
      )({
        idPayment,
        idWallet,
        language: getLocalePrimaryWithFallback()
      }),
    getPspSelected: (
      idPayment: TypeofApiParams<GetAllPspsUsingGETT>["idPayment"],
      idWallet: TypeofApiParams<GetAllPspsUsingGETT>["idWallet"]
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(getPspSelected, options)
        )
      )({
        idPayment,
        idWallet,
        language: getLocalePrimaryWithFallback()
      }),
    getPsp: (id: TypeofApiParams<GetPspUsingGETT>["id"]) =>
      flip(withPaymentManagerToken(createFetchRequestForApi(getPsp, options)))({
        id
      }),
    updateWalletPsp: (
      id: TypeofApiParams<UpdateWalletUsingPUTT>["id"],
      walletRequest: TypeofApiParams<UpdateWalletUsingPUTT>["walletRequest"]
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(updateWalletPsp, options)
        )
      )({
        id,
        walletRequest
      }),
    favouriteWallet: (
      id: TypeofApiParams<FavouriteWalletUsingPOSTTExtra>["id"]
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(favouriteWallet, options)
        )
      )({
        id
      }),
    deletePayment: (
      id: TypeofApiParams<DeleteBySessionCookieExpiredUsingDELETET>["id"]
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(deletePayment, options)
        )
      )({
        id
      }),
    addWalletCreditCard: (wallet: NullableWallet) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(addWalletCreditCard, options)
        )
      )({
        walletRequest: { data: wallet }
      }),
    payCreditCardVerification: (
      payRequest: TypeofApiParams<
        PayCreditCardVerificationUsingPOSTT
      >["payRequest"],
      language?: TypeofApiParams<
        PayCreditCardVerificationUsingPOSTT
      >["language"]
    ) =>
      flip(
        withPaymentManagerToken(createFetchRequestForApi(boardPay, altOptions))
      )({
        payRequest,
        language
      }),
    deleteWallet: (id: TypeofApiParams<DeleteWalletUsingDELETET>["id"]) =>
      flip(
        withPaymentManagerToken(createFetchRequestForApi(deleteWallet, options))
      )({
        id
      }),
    getAbi: flip(
      withPaymentManagerToken(createFetchRequestForApi(getAbi, altOptions))
    )({}),
    getPans: (abi?: string) =>
      flip(
        withPaymentManagerToken(createFetchRequestForApi(getPans, altOptions))
      )({ abi }),
    addPans: (cards: BancomatCardsRequest) =>
      flip(
        withPaymentManagerToken(createFetchRequestForApi(addPans, altOptions))
      )({ bancomatCardsRequest: cards }),
    searchSatispay: flip(
      withPaymentManagerToken(
        createFetchRequestForApi(searchSatispay, altOptions)
      )
    ),
    addSatispayToWallet: (satispayRequest: SatispayRequest) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(addSatispayToWallet, altOptions)
        )
      )({ satispayRequest }),
    searchBPay: (abi?: string) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(searchBPay, altOptions)
        )
      )({ abi }),
    addBPayToWallet: (bPayRequest: BPayRequest) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(addBPayToWallet, altOptions)
        )
      )({ bPayRequest }),
    getCobadgePans: (abiCode: string | undefined, panCode?: string) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(getCobadgePans, altOptions)
        )
      )({ abiCode, PanCode: panCode }),
    searchCobadgePans: (searchRequestId: string) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(searchCobadgePans, altOptions)
        )
      )({ searchRequestId }),
    addCobadgeToWallet: (
      cobadegPaymentInstrumentsRequest: CobadegPaymentInstrumentsRequest
    ) =>
      flip(
        withPaymentManagerToken(
          createFetchRequestForApi(addCobadgeToWallet, altOptions)
        )
      )({ cobadegPaymentInstrumentsRequest })
  };
}

export type PaymentManagerClient = ReturnType<typeof PaymentManagerClient>;
