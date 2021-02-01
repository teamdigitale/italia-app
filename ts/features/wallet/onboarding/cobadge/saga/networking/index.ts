import { fromNullable } from "fp-ts/lib/Option";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { select } from "redux-saga-test-plan/matchers";
import { call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { ContentClient } from "../../../../../../api/content";
import { PaymentManagerClient } from "../../../../../../api/pagopa";
import {
  isRawCreditCard,
  PaymentManagerToken
} from "../../../../../../types/pagopa";
import { SagaCallReturnType } from "../../../../../../types/utils";
import { getNetworkError } from "../../../../../../utils/errors";
import { getPaymentMethodHash } from "../../../../../../utils/paymentMethod";
import { SessionManager } from "../../../../../../utils/SessionManager";
import { convertWalletV2toWalletV1 } from "../../../../../../utils/walletv2";
import {
  addCoBadgeToWallet,
  loadCoBadgeAbiConfiguration,
  searchUserCoBadge
} from "../../store/actions";
import { onboardingCoBadgeSearchRequestId } from "../../store/reducers/searchCoBadgeRequestId";

/**
 * Load the user's cobadge cards. if a previous stored SearchRequestId is found then it will be used
 * within the search searchCobadgePans API, otherwise getCobadgePans will be used
 */
export function* handleSearchUserCoBadge(
  getCobadgePans: ReturnType<typeof PaymentManagerClient>["getCobadgePans"],
  searchCobadgePans: ReturnType<
    typeof PaymentManagerClient
  >["searchCobadgePans"],
  sessionManager: SessionManager<PaymentManagerToken>,
  searchAction: ActionType<typeof searchUserCoBadge.request>
) {
  try {
    const onboardingCoBadgeSearchRequest: ReturnType<typeof onboardingCoBadgeSearchRequestId> = yield select(
      onboardingCoBadgeSearchRequestId
    );
    const getPansWithRefresh = sessionManager.withRefresh(
      getCobadgePans(searchAction.payload)
    );

    const getPansWithRefreshResult:
      | SagaCallReturnType<typeof getPansWithRefresh>
      | SagaCallReturnType<typeof searchCobadgePans> = yield call(
      onboardingCoBadgeSearchRequest
        ? sessionManager.withRefresh(
            searchCobadgePans(onboardingCoBadgeSearchRequest)
          )
        : getPansWithRefresh
    );
    if (getPansWithRefreshResult.isRight()) {
      if (getPansWithRefreshResult.value.status === 200) {
        if (getPansWithRefreshResult.value.value.data) {
          return yield put(
            searchUserCoBadge.success(getPansWithRefreshResult.value.value.data)
          );
        } else {
          // it should not never happen
          return yield put(
            searchUserCoBadge.failure({
              kind: "generic",
              value: new Error(`data is undefined`)
            })
          );
        }
      } else {
        return yield put(
          searchUserCoBadge.failure({
            kind: "generic",
            value: new Error(
              `response status ${getPansWithRefreshResult.value.status}`
            )
          })
        );
      }
    } else {
      return yield put(
        searchUserCoBadge.failure({
          kind: "generic",
          value: new Error(readableReport(getPansWithRefreshResult.value))
        })
      );
    }
  } catch (e) {
    return yield put(searchUserCoBadge.failure(getNetworkError(e)));
  }
}

/**
 * Add Cobadge to wallet
 */
export function* handleAddCoBadgeToWallet(
  addCobadgeToWallet: ReturnType<
    typeof PaymentManagerClient
  >["addCobadgeToWallet"],
  sessionManager: SessionManager<PaymentManagerToken>,
  action: ActionType<typeof addCoBadgeToWallet.request>
) {
  try {
    const cobadgePaymentInstrument = action.payload;
    const addCobadgeToWalletWithRefresh = sessionManager.withRefresh(
      addCobadgeToWallet({
        data: { payload: { paymentInstruments: [cobadgePaymentInstrument] } }
      })
    );
    const addCobadgeToWalletWithRefreshResult: SagaCallReturnType<typeof addCobadgeToWalletWithRefresh> = yield call(
      addCobadgeToWalletWithRefresh
    );
    if (addCobadgeToWalletWithRefreshResult.isRight()) {
      if (addCobadgeToWalletWithRefreshResult.value.status === 200) {
        const wallets = (
          addCobadgeToWalletWithRefreshResult.value.value.data ?? []
        ).map(convertWalletV2toWalletV1);
        // search for the added cobadge.
        const maybeWallet = fromNullable(
          wallets.find(
            w =>
              w.paymentMethod &&
              getPaymentMethodHash(w.paymentMethod) ===
                cobadgePaymentInstrument.hpan
          )
        );
        if (
          maybeWallet.isSome() &&
          isRawCreditCard(maybeWallet.value.paymentMethod)
        ) {
          yield put(
            // success
            addCoBadgeToWallet.success(maybeWallet.value.paymentMethod)
          );
        } else {
          throw new Error(`cannot find added cobadge in wallets list response`);
        }
      } else {
        throw new Error(
          `response status ${addCobadgeToWalletWithRefreshResult.value.status}`
        );
      }
    } else {
      throw new Error(
        readableReport(addCobadgeToWalletWithRefreshResult.value)
      );
    }
  } catch (e) {
    yield put(addCoBadgeToWallet.failure(getNetworkError(e)));
  }
}

/**
 * Load CoBadge configuration
 */
export function* handleLoadCoBadgeConfiguration(
  getCobadgeServices: ReturnType<typeof ContentClient>["getCobadgeServices"],
  _: ActionType<typeof loadCoBadgeAbiConfiguration.request>
) {
  try {
    const getCobadgeServicesResult: SagaCallReturnType<typeof getCobadgeServices> = yield call(
      getCobadgeServices
    );
    if (getCobadgeServicesResult.isRight()) {
      if (getCobadgeServicesResult.value.status === 200) {
        yield put(
          loadCoBadgeAbiConfiguration.success(
            getCobadgeServicesResult.value.value
          )
        );
      } else {
        throw new Error(
          `response status ${getCobadgeServicesResult.value.status}`
        );
      }
    } else {
      throw new Error(readableReport(getCobadgeServicesResult.value));
    }
  } catch (e) {
    yield put(loadCoBadgeAbiConfiguration.failure(getNetworkError(e)));
  }
}
