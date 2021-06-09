import { fromNullable } from "fp-ts/lib/Option";
import { Millisecond } from "italia-ts-commons/lib/units";
import { getType } from "typesafe-actions";
import _ from "lodash";
import { PayloadAC } from "typesafe-actions/dist/type-helpers";
import { index } from "fp-ts/lib/Array";
import {
  bpdTransactionsLoadPage,
  bpdTransactionsLoadRequiredData
} from "../../features/bonus/bpd/store/actions/transactions";
import { Action } from "../actions/types";
import {
  fetchTransactionsFailure,
  fetchTransactionsSuccess
} from "../actions/wallet/transactions";
import {
  addWalletCreditCardFailure,
  addWalletCreditCardSuccess,
  fetchWalletsFailure,
  fetchWalletsSuccess
} from "../actions/wallet/wallets";
import { bpdLoadActivationStatus } from "../../features/bonus/bpd/store/actions/details";
import { bpdPeriodsAmountLoad } from "../../features/bonus/bpd/store/actions/periods";
import { euCovidCertificateGet } from "../../features/euCovidCert/store/actions";
import { GlobalState } from "./types";

/**
 * list of monitored actions
 * each entry is a tuple of 2
 * 0 - the failure action that is considered to create/increment the backoff delay
 * 1 - the success action that is considered to delete the previous backoff delay
 */
const monitoredActions: ReadonlyArray<[
  failureAction: PayloadAC<any, any>,
  successAction: PayloadAC<any, any>
]> = [
  [addWalletCreditCardFailure, addWalletCreditCardSuccess],
  [fetchTransactionsFailure, fetchTransactionsSuccess],
  [fetchWalletsFailure, fetchWalletsSuccess],
  [bpdLoadActivationStatus.failure, bpdLoadActivationStatus.success],
  [bpdPeriodsAmountLoad.failure, bpdPeriodsAmountLoad.success],
  [bpdTransactionsLoadPage.failure, bpdTransactionsLoadPage.success],
  [
    bpdTransactionsLoadRequiredData.failure,
    bpdTransactionsLoadRequiredData.success
  ],
  [euCovidCertificateGet.failure, euCovidCertificateGet.success]
];

const failureActions = monitoredActions.map(ma => ma[0]);
const successActions = monitoredActions.map(ma => ma[1]);

export const failureActionTypes = () => failureActions.map(getType);
export const successActionTypes = () => successActions.map(getType);
export type FailureActions = typeof failureActions[number];

export type BackoffErrorState = {
  [key: string]: {
    lastUpdate: Date;
    attempts: number;
  };
};

const defaultState: BackoffErrorState = {};
export const backoffConfig = () => ({
  maxAttempts: 4,
  base: 2,
  mul: 1000
});

const reducer = (
  state: BackoffErrorState = defaultState,
  action: Action
): BackoffErrorState => {
  const failure = failureActionTypes().find(a => a === action.type);
  if (failure) {
    return {
      ...state,
      [failure]: {
        lastUpdate: new Date(),
        attempts: Math.min(
          (state[failure]?.attempts ?? 0) + 1,
          backoffConfig().maxAttempts
        )
      }
    };
  }
  const successIndex = successActionTypes().indexOf(action.type);
  // the failure type is that one at the same index of success type
  const keyToRemove = index(successIndex, failureActionTypes());
  if (keyToRemove.isSome() && keyToRemove.value in state) {
    // remove the previous record
    return _.omit(state, keyToRemove.value);
  }
  return state;
};

// return the waiting time from a given failure action
export const backOffWaitingTime = (state: GlobalState) => (
  failure: FailureActions
): Millisecond =>
  fromNullable(state.backoffError[getType(failure)]).fold(
    0 as Millisecond,
    lastError => {
      const wait =
        Math.pow(backoffConfig().base, lastError.attempts) *
        backoffConfig().mul;
      // if the last attempt is older that wait -> no wait
      return (new Date().getTime() - lastError.lastUpdate.getTime() < wait
        ? wait
        : 0) as Millisecond;
    }
  );

export default reducer;
