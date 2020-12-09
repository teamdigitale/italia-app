import { select } from "redux-saga-test-plan/matchers";
import { all, put, take } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { loadAbi } from "../../../../wallet/onboarding/bancomat/store/actions";
import { abiSelector } from "../../../../wallet/onboarding/store/abi";
import { isReady } from "../../model/RemoteValue";
import { bpdAmountLoad } from "../../store/actions/amount";
import { bpdLoadActivationStatus } from "../../store/actions/details";
import { BpdPeriod, bpdPeriodsLoad } from "../../store/actions/periods";
import { bpdTransactionsLoad } from "../../store/actions/transactions";

/**
 * Prefetch all the BPD details data:
 * - Abi list
 * - Activation Status
 * - Periods
 * - Amount foreach periods
 * - Transactions foreach period
 */
export function* prefetchBpdData() {
  yield put(bpdLoadActivationStatus.request());

  const userActive: ActionType<
    | typeof bpdLoadActivationStatus.success
    | typeof bpdLoadActivationStatus.failure
  > = yield take([
    getType(bpdLoadActivationStatus.success),
    getType(bpdLoadActivationStatus.failure)
  ]);

  // First we need to receive the activation status with success
  if (userActive.type === getType(bpdLoadActivationStatus.success)) {
    yield put(bpdPeriodsLoad.request());

    const periodsResult: ActionType<
      typeof bpdPeriodsLoad.success | typeof bpdPeriodsLoad.failure
    > = yield take([
      getType(bpdPeriodsLoad.success),
      getType(bpdPeriodsLoad.failure)
    ]);
    if (periodsResult.type === getType(bpdPeriodsLoad.success)) {
      yield all(
        periodsResult.payload
          .filter(period =>
            isPrefetchNeeded(period, userActive.payload.enabled)
          )
          .map(period => put(bpdAmountLoad.request(period.awardPeriodId)))
      );
      yield all(
        periodsResult.payload
          .filter(period =>
            isPrefetchNeeded(period, userActive.payload.enabled)
          )
          .map(period => put(bpdTransactionsLoad.request(period.awardPeriodId)))
      );
    }
  }

  const abiList: ReturnType<typeof abiSelector> = yield select(abiSelector);

  // The volatility of the bank list is extremely low.
  // There is no need to refresh it every time.
  // A further refinement could be to insert an expiring cache
  if (!isReady(abiList)) {
    yield put(loadAbi.request());
  }
}

/**
 * Prefetch only the period additional data when needed
 * @param period
 * @param bpdActive
 */
const isPrefetchNeeded = (period: BpdPeriod, bpdActive: boolean) =>
  period.status === "Closed" || (period.status === "Active" && bpdActive);
