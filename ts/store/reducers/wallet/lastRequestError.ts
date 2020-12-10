import { fromNullable } from "fp-ts/lib/Option";
import { Millisecond } from "italia-ts-commons/lib/units";
import { getType } from "typesafe-actions";
import { Action } from "../../actions/types";
import {
  fetchTransactionsFailure,
  fetchTransactionsSuccess
} from "../../actions/wallet/transactions";
import {
  fetchWalletsFailure,
  fetchWalletsSuccess
} from "../../actions/wallet/wallets";
import { GlobalState } from "../types";

export type LastRequestErrorState = {
  lastUpdate?: Date;
  attempts: number;
};

const defaultState: LastRequestErrorState = { attempts: 0 };
const backOffExpLimitAttempts = 4;
const backOffBase = 2;
const reducer = (
  state: LastRequestErrorState = defaultState,
  action: Action
): LastRequestErrorState => {
  switch (action.type) {
    case getType(fetchTransactionsFailure):
    case getType(fetchWalletsFailure):
      return {
        lastUpdate: new Date(),
        attempts: Math.min(state.attempts + 1, backOffExpLimitAttempts)
      };
    // on success reset state
    case getType(fetchTransactionsSuccess):
    case getType(fetchWalletsSuccess):
      return defaultState;
  }
  return state;
};

export const backOffWaitingTime = (state: GlobalState): Millisecond =>
  fromNullable(state.wallet.lastRequestError.lastUpdate).fold(
    0 as Millisecond,
    lu => {
      const wait =
        Math.pow(backOffBase, state.wallet.lastRequestError.attempts) * 1000;
      return (new Date().getTime() - lu.getTime() < wait
        ? wait
        : 0) as Millisecond;
    }
  );

export default reducer;
