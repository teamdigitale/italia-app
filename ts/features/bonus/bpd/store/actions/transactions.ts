import { IUnitTag } from "italia-ts-commons/lib/units";
import { ActionType, createAsyncAction } from "typesafe-actions";
import { TrxCountByDayResourceArray } from "../../../../../../definitions/bpd/winning_transactions_v2/TrxCountByDayResourceArray";
import { WinningTransactionPageResource } from "../../../../../../definitions/bpd/winning_transactions_v2/WinningTransactionPageResource";
import { HPan } from "./paymentMethods";
import { AwardPeriodId, WithAwardPeriodId } from "./periods";

// TODO: placeholder, TBD how to map the circuit Type
export type CircuitType =
  | "PagoBancomat"
  | "Visa"
  | "Mastercard"
  | "Amex"
  | "JCB"
  | "UnionPay"
  | "Diners"
  | "PostePay"
  | "BancomatPay"
  | "Satispay"
  | "Private"
  | "Unknown";

/**
 * The single transaction acquired in a cashback period
 */
export type BpdTransaction = WithAwardPeriodId & {
  // The hashPan of the payment method used for the transaction
  hashPan: HPan;
  // id acquirer
  idTrxAcquirer: string;
  // id issuer
  idTrxIssuer: string;
  // total amount of the transaction, if negative the operation has been canceled
  amount: number;
  trxDate: Date;
  // cashback received from the transaction, if negative the operation has been canceled and also the cashback
  cashback: number;
  circuitType: CircuitType;
};

export type BpdTransactionId = string & IUnitTag<"BpdTransactionId">;

// TODO: integrate in BpdTransaction after removing the feature flag
export type BpdTransactionV2 = BpdTransaction & {
  idTrx: BpdTransactionId;
  validForCashback: boolean;
};

export type BpdTransactions = WithAwardPeriodId & {
  results: ReadonlyArray<BpdTransaction>;
};

type BpdTransactionsError = WithAwardPeriodId & {
  error: Error;
};

/**
 * Request all the transactions for a specific period
 */
export const bpdTransactionsLoad = createAsyncAction(
  "BPD_TRANSACTIONS_REQUEST",
  "BPD_TRANSACTIONS_SUCCESS",
  "BPD_TRANSACTIONS_FAILURE"
)<AwardPeriodId, BpdTransactions, BpdTransactionsError>();

type BpdTransactionPageRequestPayload = WithAwardPeriodId & {
  nextCursor?: string;
};

type BpdTransactionPageSuccessPayload = WithAwardPeriodId & {
  results: WinningTransactionPageResource;
};

export const bpdTransactionsLoadPage = createAsyncAction(
  "BPD_TRANSACTIONS_PAGE_REQUEST",
  "BPD_TRANSACTIONS_PAGE_SUCCESS",
  "BPD_TRANSACTIONS_PAGE_FAILURE"
)<
  BpdTransactionPageRequestPayload,
  BpdTransactionPageSuccessPayload,
  BpdTransactionsError
>();

export type TrxCountByDayResource = WithAwardPeriodId & {
  results: TrxCountByDayResourceArray;
};

export const bpdTransactionsLoadCountByDay = createAsyncAction(
  "BPD_TRANSACTIONS_COUNT_BY_DAY_REQUEST",
  "BPD_TRANSACTIONS_COUNT_BY_DAY_SUCCESS",
  "BPD_TRANSACTIONS_COUNT_BY_DAY_FAILURE"
)<AwardPeriodId, TrxCountByDayResource, BpdTransactionsError>();

export type BpdTransactionsAction =
  | ActionType<typeof bpdTransactionsLoad>
  | ActionType<typeof bpdTransactionsLoadPage>
  | ActionType<typeof bpdTransactionsLoadCountByDay>;
