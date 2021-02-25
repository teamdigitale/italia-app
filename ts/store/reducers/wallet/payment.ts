import * as pot from "italia-ts-commons/lib/pot";
import { getType } from "typesafe-actions";
import { PotFromActions } from "../../../types/utils";
import { pspsForLocale } from "../../../utils/payment";
import { Action } from "../../actions/types";
import {
  paymentAttiva,
  paymentCheck,
  paymentExecuteStart,
  paymentFetchAllPspsForPaymentId,
  paymentFetchPspsForPaymentId,
  paymentIdPolling,
  paymentInitializeEntrypointRoute,
  paymentInitializeState,
  paymentVerifica,
  paymentWebViewEnd
} from "../../actions/wallet/payment";
import { GlobalState } from "../types";
import {
  remoteError,
  remoteLoading,
  remoteReady,
  remoteUndefined,
  RemoteValue
} from "../../../features/bonus/bpd/model/RemoteValue";
import { Locales } from "../../../../locales/locales";
import { PaymentManagerToken } from "../../../types/pagopa";
import {
  addCreditCardWebViewEnd,
  refreshPMTokenWhileAddCreditCard
} from "../../actions/wallet/wallets";

export type EntrypointRoute = Readonly<{
  name: string;
  key: string;
}>;

export type PaymentStartPayload = Readonly<{
  idWallet: number;
  idPayment: string;
  language: Locales;
}>;

export type PaymentStartWebViewPayload = PaymentStartPayload & {
  sessionToken: PaymentManagerToken;
};

// TODO: instead of keeping one single state, it would be more correct to keep
//       a state for each rptid - this will make unnecessary to reset the state
//       at the beginning of a new payment flow.
export type PaymentState = Readonly<{
  verifica: PotFromActions<
    typeof paymentVerifica["success"],
    typeof paymentVerifica["failure"]
  >;
  attiva: PotFromActions<
    typeof paymentAttiva["success"],
    typeof paymentAttiva["failure"]
  >;
  paymentId: PotFromActions<
    typeof paymentIdPolling["success"],
    typeof paymentIdPolling["failure"]
  >;
  check: PotFromActions<
    typeof paymentCheck["success"],
    typeof paymentCheck["failure"]
  >;
  psps: PotFromActions<
    typeof paymentFetchPspsForPaymentId["success"],
    typeof paymentFetchPspsForPaymentId["failure"]
  >;
  allPsps: PotFromActions<
    typeof paymentFetchAllPspsForPaymentId["success"],
    typeof paymentFetchAllPspsForPaymentId["failure"]
  >;
  entrypointRoute?: EntrypointRoute;
  // id payment, id wallet and locale (used inside paywebview)
  paymentStartPayload: PaymentStartPayload | undefined;
  // pm fresh session token (used inside paywebview)
  pmSessionToken: RemoteValue<PaymentManagerToken, Error>;
}>;

/**
 * Returns the payment ID if one has been fetched so far
 */
export const getPaymentIdFromGlobalState = (state: GlobalState) =>
  pot.toOption(state.wallet.payment.paymentId);

export const allPspsSelector = (state: GlobalState) =>
  state.wallet.payment.allPsps;

export const isPaymentOngoingSelector = (state: GlobalState) =>
  getPaymentIdFromGlobalState(state).isSome();

export const entrypointRouteSelector = (state: GlobalState) =>
  state.wallet.payment.entrypointRoute;

export const pmSessionTokenSelector = (
  state: GlobalState
): RemoteValue<PaymentManagerToken, Error> =>
  state.wallet.payment.pmSessionToken;

export const paymentStartPayloadSelector = (
  state: GlobalState
): PaymentStartPayload | undefined => state.wallet.payment.paymentStartPayload;

const PAYMENT_INITIAL_STATE: PaymentState = {
  verifica: pot.none,
  attiva: pot.none,
  paymentId: pot.none,
  check: pot.none,
  psps: pot.none,
  allPsps: pot.none,
  entrypointRoute: undefined,
  paymentStartPayload: undefined,
  pmSessionToken: remoteUndefined
};

/**
 * Reducer for actions that show the payment summary
 */
// eslint-disable-next-line complexity
const reducer = (
  state: PaymentState = PAYMENT_INITIAL_STATE,
  action: Action
): PaymentState => {
  switch (action.type) {
    // start a new payment from scratch
    case getType(paymentInitializeState):
      return PAYMENT_INITIAL_STATE;
    // track the route whence the payment started
    case getType(paymentInitializeEntrypointRoute):
      return {
        ...state,
        entrypointRoute: action.payload
      };
    //
    // verifica
    //
    case getType(paymentVerifica.request):
      return {
        // a verifica operation will generate a new codice contesto pagamento
        // effectively starting a new payment session, thus we also invalidate
        // the rest of the payment state
        ...PAYMENT_INITIAL_STATE,
        entrypointRoute: state.entrypointRoute,
        verifica: pot.noneLoading
      };
    case getType(paymentVerifica.success):
      return {
        ...state,
        verifica: pot.some(action.payload)
      };
    case getType(paymentVerifica.failure):
      return {
        ...state,
        verifica: pot.noneError(action.payload)
      };

    //
    // attiva
    //
    case getType(paymentAttiva.request):
      return {
        ...state,
        attiva: pot.noneLoading
      };
    case getType(paymentAttiva.success):
      return {
        ...state,
        attiva: pot.some(action.payload)
      };
    case getType(paymentAttiva.failure):
      return {
        ...state,
        attiva: pot.noneError(action.payload)
      };

    //
    // payment ID polling
    //
    case getType(paymentIdPolling.request):
      return {
        ...state,
        paymentId: pot.noneLoading
      };
    case getType(paymentIdPolling.success):
      return {
        ...state,
        paymentId: pot.some(action.payload)
      };
    case getType(paymentIdPolling.failure):
      return {
        ...state,
        paymentId: pot.noneError(action.payload)
      };

    //
    // check payment
    //
    case getType(paymentCheck.request):
      return {
        ...state,
        check: pot.noneLoading
      };
    case getType(paymentCheck.success):
      return {
        ...state,
        check: pot.some<true>(true)
      };
    case getType(paymentCheck.failure):
      return {
        ...state,
        check: pot.noneError(action.payload)
      };

    //
    // fetch available psps
    //
    case getType(paymentFetchPspsForPaymentId.request):
      return {
        ...state,
        psps: pot.noneLoading
      };
    case getType(paymentFetchPspsForPaymentId.success):
      // before storing the PSPs, filter only the PSPs for the current locale
      return {
        ...state,
        psps: pot.some(pspsForLocale(action.payload))
      };
    case getType(paymentFetchPspsForPaymentId.failure):
      return {
        ...state,
        psps: pot.noneError(action.payload)
      };

    //
    // fetch all available psps
    //
    case getType(paymentFetchAllPspsForPaymentId.request):
      return {
        ...state,
        allPsps: pot.noneLoading
      };
    case getType(paymentFetchAllPspsForPaymentId.success):
      // before storing the PSPs, filter only the PSPs for the current locale
      return {
        ...state,
        allPsps: pot.some(pspsForLocale(action.payload))
      };
    case getType(paymentFetchAllPspsForPaymentId.failure):
      return {
        ...state,
        allPsps: pot.noneError(action.payload)
      };

    //
    // start payment or refresh token while add credit card
    //
    case getType(paymentExecuteStart.request):
      return {
        ...state,
        paymentStartPayload: action.payload,
        pmSessionToken: remoteLoading
      };
    case getType(refreshPMTokenWhileAddCreditCard.request):
      return {
        ...state,
        pmSessionToken: remoteLoading
      };
    case getType(refreshPMTokenWhileAddCreditCard.success):
    case getType(paymentExecuteStart.success):
      return {
        ...state,
        pmSessionToken: remoteReady(action.payload)
      };
    case getType(refreshPMTokenWhileAddCreditCard.failure):
    case getType(paymentExecuteStart.failure):
      return {
        ...state,
        pmSessionToken: remoteError(action.payload)
      };

    // end payment web view - reset data about payment
    case getType(paymentWebViewEnd):
      return {
        ...state,
        paymentStartPayload: PAYMENT_INITIAL_STATE.paymentStartPayload,
        pmSessionToken: PAYMENT_INITIAL_STATE.pmSessionToken
      };
    // end add credit card web view - reset pm session token data
    case getType(addCreditCardWebViewEnd):
      return {
        ...state,
        pmSessionToken: PAYMENT_INITIAL_STATE.pmSessionToken
      };
  }
  return state;
};

export default reducer;
