import { NavigationActions } from "react-navigation";
import { call, put, select } from "redux-saga/effects";
import {
  executeWorkUnit,
  withResetNavigationStack
} from "../../../../../../sagas/workUnit";
import { fetchWalletsRequest } from "../../../../../../store/actions/wallet/wallets";
import { navigationCurrentRouteSelector } from "../../../../../../store/reducers/navigation";
import { SagaCallReturnType } from "../../../../../../types/utils";
import { activateBpdOnNewPaymentMethods } from "../../../../../bonus/bpd/saga/orchestration/activateBpdOnNewAddedPaymentMethods";
import {
  navigateToActivateBpdOnNewBancomat,
  navigateToOnboardingBancomatSearchStartScreen
} from "../../navigation/action";
import WALLET_ONBOARDING_BANCOMAT_ROUTES from "../../navigation/routes";
import {
  walletAddBancomatBack,
  walletAddBancomatCancel,
  walletAddBancomatCompleted,
  walletAddBancomatFailure
} from "../../store/actions";
import { onboardingBancomatAddedPansSelector } from "../../store/reducers/addedPans";

/**
 * Define the workflow that allows the user to add a bancomat to the wallet.
 * The workflow ends when:
 * - The user add at least one owned bancomat to the wallet {@link walletAddBancomatCompleted}
 * - The user abort the insertion of a bancomat {@link walletAddBancomatCancel}
 * - The user choose back from the first screen {@link walletAddBancomatBack}
 */
function* bancomatWorkUnit() {
  return yield call(executeWorkUnit, {
    startScreenNavigation: navigateToOnboardingBancomatSearchStartScreen(),
    startScreenName: WALLET_ONBOARDING_BANCOMAT_ROUTES.BANCOMAT_START,
    complete: walletAddBancomatCompleted,
    back: walletAddBancomatBack,
    cancel: walletAddBancomatCancel,
    failure: walletAddBancomatFailure
  });
}

/**
 * Chain the add bancomat to wallet with "activate bpd on the new bancomat"
 */
export function* addBancomatToWalletAndActivateBpd() {
  const res: SagaCallReturnType<typeof executeWorkUnit> = yield call(
    withResetNavigationStack,
    bancomatWorkUnit
  );
  if (res !== "back") {
    // integration with the legacy "Add a payment"
    // If the payment starts from "WALLET_ADD_PAYMENT_METHOD" or "WALLET_BANCOMAT_DETAIL", remove from stack
    // This shouldn't happens if all the workflow will use the executeWorkUnit
    const currentRoute: ReturnType<typeof navigationCurrentRouteSelector> = yield select(
      navigationCurrentRouteSelector
    );

    if (
      currentRoute.isSome() &&
      currentRoute.value === "WALLET_ADD_PAYMENT_METHOD"
    ) {
      yield put(NavigationActions.back());
    }
  }

  if (res === "completed") {
    // refresh wallets list
    yield put(fetchWalletsRequest());
    // read the new added bancomat
    const bancomatAdded: ReturnType<typeof onboardingBancomatAddedPansSelector> = yield select(
      onboardingBancomatAddedPansSelector
    );

    yield call(
      activateBpdOnNewPaymentMethods,
      bancomatAdded,
      navigateToActivateBpdOnNewBancomat()
    );
  }
}
