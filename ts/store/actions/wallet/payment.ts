import { RptId } from "italia-pagopa-commons/lib/pagopa";
import {
  OmitStatusFromResponse,
  TypeofApiResponse
} from "italia-ts-commons/lib/requests";
import {
  ActionType,
  createAsyncAction,
  createStandardAction
} from "typesafe-actions";
import { PaymentActivationsPostResponse } from "../../../../definitions/backend/PaymentActivationsPostResponse";
import { DetailEnum as PaymentProblemErrorEnum } from "../../../../definitions/backend/PaymentProblemJson";
import { PaymentRequestsGetResponse } from "../../../../definitions/backend/PaymentRequestsGetResponse";
import { CheckPaymentUsingGETT } from "../../../../definitions/pagopa/requestTypes";
import {
  PaymentManagerToken,
  Psp,
  Transaction,
  Wallet
} from "../../../types/pagopa";
import { PayloadForAction } from "../../../types/utils";
import {
  EntrypointRoute,
  PaymentStartPayload
} from "../../reducers/wallet/payment";
import { OutcomeCodesKey } from "../../../types/outcomeCode";
import { fetchWalletsFailure, fetchWalletsSuccess } from "./wallets";

/**
 * Resets the payment state before starting a new payment
 */
export const paymentInitializeState = createStandardAction(
  "PAYMENT_INITIALIZE_STATE"
)();

/**
 * Track the route whence the payment started
 */
export const paymentInitializeEntrypointRoute = createStandardAction(
  "PAYMENT_ENTRYPOINT_ROUTE"
)<EntrypointRoute>();

/**
 * For back to entrypoint (where the payment is initiated)
 */
export const backToEntrypointPayment = createStandardAction(
  "BACK_TO_PAYMENT_ENTRYPOINT_ROUTE"
)();

//
// verifica
//

// the error is undefined in case we weren't able to decode it, it should be
// interpreted as a generic error
export const paymentVerifica = createAsyncAction(
  "PAYMENT_VERIFICA_REQUEST",
  "PAYMENT_VERIFICA_SUCCESS",
  "PAYMENT_VERIFICA_FAILURE"
)<
  RptId,
  PaymentRequestsGetResponse,
  keyof typeof PaymentProblemErrorEnum | undefined
>();

//
// attiva
//

type paymentAttivaRequestPayload = Readonly<{
  rptId: RptId;
  verifica: PaymentRequestsGetResponse;
}>;

// the error is undefined in case we weren't able to decode it, it should be
// interpreted as a generic error
export const paymentAttiva = createAsyncAction(
  "PAYMENT_ATTIVA_REQUEST",
  "PAYMENT_ATTIVA_SUCCESS",
  "PAYMENT_ATTIVA_FAILURE"
)<
  paymentAttivaRequestPayload,
  PaymentActivationsPostResponse,
  PaymentProblemErrorEnum | undefined
>();

//
// paymentId polling
//

// the error is undefined in case we weren't able to decode it, it should be
// interpreted as a generic error
export const paymentIdPolling = createAsyncAction(
  "PAYMENT_ID_POLLING_REQUEST",
  "PAYMENT_ID_POLLING_SUCCESS",
  "PAYMENT_ID_POLLING_FAILURE"
)<PaymentRequestsGetResponse, string, "PAYMENT_ID_TIMEOUT" | undefined>();

//
// check payment
//

export const paymentCheck = createAsyncAction(
  "PAYMENT_CHECK_REQUEST",
  "PAYMENT_CHECK_SUCCESS",
  "PAYMENT_CHECK_FAILURE"
)<
  string,
  true,
  | OmitStatusFromResponse<TypeofApiResponse<CheckPaymentUsingGETT>, 200>
  | undefined
  | Error
>();

//
// fetch psp list
//

type PaymentFetchPspsForPaymentIdRequestPayload = Readonly<{
  idPayment: string;
  idWallet: number;
  onSuccess?: (
    action: ActionType<typeof paymentFetchPspsForPaymentId["success"]>
  ) => void;
  onFailure?: (
    action: ActionType<typeof paymentFetchPspsForPaymentId["failure"]>
  ) => void;
}>;

export const paymentFetchPspsForPaymentId = createAsyncAction(
  "PAYMENT_FETCH_PSPS_FOR_PAYMENT_ID_REQUEST",
  "PAYMENT_FETCH_PSPS_FOR_PAYMENT_ID_SUCCESS",
  "PAYMENT_FETCH_PSPS_FOR_PAYMENT_ID_FAILURE"
)<PaymentFetchPspsForPaymentIdRequestPayload, ReadonlyArray<Psp>, Error>();

type PaymentFetchAllPspsForPaymentIdRequestPayload = Readonly<{
  idPayment: string;
  idWallet: string;
}>;

export const paymentFetchAllPspsForPaymentId = createAsyncAction(
  "PAYMENT_FETCH_ALL_PSPS_FOR_PAYMENT_ID_REQUEST",
  "PAYMENT_FETCH_ALL_PSPS_FOR_PAYMENT_ID_SUCCESS",
  "PAYMENT_FETCH_ALL_PSPS_FOR_PAYMENT_ID_FAILURE"
)<PaymentFetchAllPspsForPaymentIdRequestPayload, ReadonlyArray<Psp>, Error>();

//
// Update Wallet PSP request and responses
//

type WalletUpdatePspRequestPayload = Readonly<{
  idPsp: number;
  wallet: Wallet;
  onSuccess?: (
    action: ActionType<typeof paymentUpdateWalletPsp["success"]>
  ) => void;
  onFailure?: (
    action: ActionType<typeof paymentUpdateWalletPsp["failure"]>
  ) => void;
}>;

export const paymentUpdateWalletPsp = createAsyncAction(
  "PAYMENT_UPDATE_WALLET_PSP_REQUEST",
  "PAYMENT_UPDATE_WALLET_PSP_SUCCESS",
  "PAYMENT_UPDATE_WALLET_PSP_FAILURE"
)<
  WalletUpdatePspRequestPayload,
  {
    wallets: PayloadForAction<typeof fetchWalletsSuccess>;
    updatedWallet: Wallet;
  },
  PayloadForAction<typeof fetchWalletsFailure>
>();

//
// execute payment
//

/**
 * user wants to pay
 * - request: we already know the idPayment and the idWallet used to pay, we need a fresh PM session token
 * - success: we got a fresh PM session token
 * - failure: we can't get a fresh PM session token
 */
export const paymentExecuteStart = createAsyncAction(
  "PAYMENT_EXECUTE_START_REQUEST",
  "PAYMENT_EXECUTE_START_SUCCESS",
  "PAYMENT_EXECUTE_START_FAILURE"
)<PaymentStartPayload, PaymentManagerToken, Error>();

export type PaymentWebViewEndReason =
  | "ABORT_BY_THE_USER"
  | "EXIT_FROM_WEB_VIEW";
// event fired when the paywebview ends its challenge (used to reset payment values)
export const paymentWebViewEnd = createStandardAction("PAYMENT_WEB_VIEW_END")<
  PaymentWebViewEndReason
>();

//
// Signal the completion of a payment
//

type PaymentCompletedSuccessPayload = Readonly<
  | {
      kind: "COMPLETED";
      // TODO Transaction is not available, add it when PM make it available again
      //  see https://www.pivotaltracker.com/story/show/177067134
      transaction: Transaction | undefined;
      rptId: RptId;
    }
  | {
      kind: "DUPLICATED";
      rptId: RptId;
    }
>;

export const paymentCompletedSuccess = createStandardAction(
  "PAYMENT_COMPLETED_SUCCESS"
)<PaymentCompletedSuccessPayload>();

export const paymentCompletedFailure = createStandardAction(
  "PAYMENT_COMPLETED_FAILURE"
)<OutcomeCodesKey | undefined>();

//
// delete an ongoing payment
//

type PaymentDeletePaymentRequestPayload = Readonly<{
  paymentId: string;
}>;

export const paymentDeletePayment = createAsyncAction(
  "PAYMENT_DELETE_PAYMENT_REQUEST",
  "PAYMENT_DELETE_PAYMENT_SUCCESS",
  "PAYMENT_DELETE_PAYMENT_FAILURE"
)<PaymentDeletePaymentRequestPayload, void, Error>();

export const runDeleteActivePaymentSaga = createStandardAction(
  "PAYMENT_RUN_DELETE_ACTIVE_PAYMENT_SAGA"
)();

//
// run startOrResumePaymentSaga
//

type RunStartOrResumePaymentActivationSagaPayload = Readonly<{
  rptId: RptId;
  verifica: PaymentRequestsGetResponse;
  onSuccess: (idPayment: string) => void;
}>;

export const runStartOrResumePaymentActivationSaga = createStandardAction(
  "PAYMENT_RUN_START_OR_RESUME_PAYMENT_ACTIVATION_SAGA"
)<RunStartOrResumePaymentActivationSagaPayload>();

/**
 * All possible payment actions
 */
export type PaymentActions =
  | ActionType<typeof paymentInitializeState>
  | ActionType<typeof paymentInitializeEntrypointRoute>
  | ActionType<typeof backToEntrypointPayment>
  | ActionType<typeof paymentUpdateWalletPsp>
  | ActionType<typeof paymentVerifica>
  | ActionType<typeof paymentAttiva>
  | ActionType<typeof paymentIdPolling>
  | ActionType<typeof paymentWebViewEnd>
  | ActionType<typeof paymentCheck>
  | ActionType<typeof paymentFetchPspsForPaymentId>
  | ActionType<typeof paymentExecuteStart>
  | ActionType<typeof paymentCompletedSuccess>
  | ActionType<typeof paymentCompletedFailure>
  | ActionType<typeof paymentDeletePayment>
  | ActionType<typeof runDeleteActivePaymentSaga>
  | ActionType<typeof paymentFetchAllPspsForPaymentId>
  | ActionType<typeof runStartOrResumePaymentActivationSaga>;
