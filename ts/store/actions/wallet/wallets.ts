import { ActionType, createStandardAction } from "typesafe-actions";

import {
  CreditCard,
  NullableWallet,
  PaymentManagerToken,
  PayRequest,
  TransactionResponse,
  Wallet,
  WalletResponse
} from "../../../types/pagopa";
import { PayloadForAction } from "../../../types/utils";

// this action load wallets following a backoff retry strategy
export const fetchWalletsRequestWithExpBackoff = createStandardAction(
  "WALLETS_LOAD_BACKOFF_REQUEST"
)();

export const fetchWalletsRequest = createStandardAction(
  "WALLETS_LOAD_REQUEST"
)();

export const fetchWalletsSuccess = createStandardAction("WALLETS_LOAD_SUCCESS")<
  ReadonlyArray<Wallet>
>();

export const fetchWalletsFailure = createStandardAction("WALLETS_LOAD_FAILURE")<
  Error
>();

export const addWalletCreditCardInit = createStandardAction(
  "WALLET_ADD_CREDITCARD_INIT"
)();

type AddWalletCreditCardRequestPayload = Readonly<{
  creditcard: NullableWallet;
}>;

export const addWalletCreditCardRequest = createStandardAction(
  "WALLET_ADD_CREDITCARD_REQUEST"
)<AddWalletCreditCardRequestPayload>();

// this action follows a backoff retry strategy
export const addWalletCreditCardWithBackoffRetryRequest = createStandardAction(
  "WALLET_ADD_CREDITCARD_WITH_BACKOFF_REQUEST"
)<AddWalletCreditCardRequestPayload>();

export const addWalletCreditCardSuccess = createStandardAction(
  "WALLET_ADD_CREDITCARD_SUCCESS"
)<WalletResponse>();

// this action describes when a new card is completed onboarded (add + pay + checkout)
// and available in wallets list
export const addWalletNewCreditCardSuccess = createStandardAction(
  "WALLET_ADD_NEW_CREDITCARD_SUCCESS"
)();

export const addWalletNewCreditCardFailure = createStandardAction(
  "WALLET_ADD_NEW_CREDITCARD_FAILURE"
)();

export type CreditCardFailure =
  | {
      kind: "GENERIC_ERROR";
      reason: string;
    }
  | {
      kind: "ALREADY_EXISTS";
    };

export const addWalletCreditCardFailure = createStandardAction(
  "WALLET_ADD_CREDITCARD_FAILURE"
)<CreditCardFailure>();

export const payCreditCardVerificationSuccess = createStandardAction(
  "WALLET_ADD_CREDITCARD_VERIFICATION_SUCCESS"
)<TransactionResponse>();

export const payCreditCardVerificationFailure = createStandardAction(
  "WALLET_ADD_CREDITCARD_VERIFICATION_FAILURE"
)<Error>();

type CreditCardCheckout3dsRequestPayload = Readonly<{
  urlCheckout3ds: string;
  paymentManagerToken: PaymentManagerToken;
}>;

export const creditCardCheckout3dsRequest = createStandardAction(
  "WALLET_ADD_CREDITCARD_CHECKOUT_3DS_REQUEST"
)<CreditCardCheckout3dsRequestPayload>();

export const creditCardCheckout3dsSuccess = createStandardAction(
  "WALLET_ADD_CREDITCARD_CHECKOUT_3DS_SUCCESS"
)<string>();

export const creditCardCheckout3dsRedirectionUrls = createStandardAction(
  "WALLET_ADD_CREDITCARD_CHECKOUT_3DS_REDIRECTION_URLS"
)<ReadonlyArray<string>>();

type DeleteWalletRequestPayload = Readonly<{
  walletId: number;
  onSuccess?: (action: ActionType<typeof deleteWalletSuccess>) => void;
  onFailure?: (action: ActionType<typeof deleteWalletFailure>) => void;
}>;

export const deleteWalletRequest = createStandardAction(
  "WALLET_DELETE_REQUEST"
)<DeleteWalletRequestPayload>();

export const deleteWalletSuccess = createStandardAction(
  "WALLET_DELETE_SUCCESS"
)<PayloadForAction<typeof fetchWalletsSuccess>>();

export const deleteWalletFailure = createStandardAction(
  "WALLET_DELETE_FAILURE"
)<PayloadForAction<typeof fetchWalletsFailure>>();

export const setFavouriteWalletRequest = createStandardAction(
  "WALLET_SET_FAVOURITE_REQUEST"
)<number | undefined>();

export const setFavouriteWalletSuccess = createStandardAction(
  "WALLET_SET_FAVOURITE_SUCCESS"
)<Wallet>();

export const setFavouriteWalletFailure = createStandardAction(
  "WALLET_SET_FAVOURITE_FAILURE"
)<Error>();

export const setWalletSessionEnabled = createStandardAction(
  "WALLET_SET_SESSION_ENABLED"
)<boolean>();

type StartOrResumeAddCreditCardSagaPayload = Readonly<{
  creditCard: CreditCard;
  language?: string;
  setAsFavorite: boolean;
  onSuccess?: (wallet: Wallet) => void;
  onFailure?: (error?: "ALREADY_EXISTS") => void;
}>;

export const runStartOrResumeAddCreditCardSaga = createStandardAction(
  "RUN_ADD_CREDIT_CARD_SAGA"
)<StartOrResumeAddCreditCardSagaPayload>();

export type WalletsActions =
  | ActionType<typeof fetchWalletsRequest>
  | ActionType<typeof fetchWalletsSuccess>
  | ActionType<typeof fetchWalletsFailure>
  | ActionType<typeof deleteWalletRequest>
  | ActionType<typeof deleteWalletSuccess>
  | ActionType<typeof deleteWalletFailure>
  | ActionType<typeof setFavouriteWalletRequest>
  | ActionType<typeof setFavouriteWalletSuccess>
  | ActionType<typeof setFavouriteWalletFailure>
  | ActionType<typeof runStartOrResumeAddCreditCardSaga>
  | ActionType<typeof addWalletCreditCardInit>
  | ActionType<typeof addWalletCreditCardRequest>
  | ActionType<typeof addWalletCreditCardWithBackoffRetryRequest>
  | ActionType<typeof addWalletCreditCardSuccess>
  | ActionType<typeof addWalletCreditCardFailure>
  | ActionType<typeof addWalletNewCreditCardSuccess>
  | ActionType<typeof addWalletNewCreditCardFailure>
  | ActionType<typeof payCreditCardVerificationSuccess>
  | ActionType<typeof payCreditCardVerificationFailure>
  | ActionType<typeof creditCardCheckout3dsRequest>
  | ActionType<typeof creditCardCheckout3dsSuccess>
  | ActionType<typeof setWalletSessionEnabled>
  | ActionType<typeof creditCardCheckout3dsRedirectionUrls>
  | ActionType<typeof fetchWalletsRequestWithExpBackoff>;
