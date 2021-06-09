import {
  call,
  Effect,
  put,
  select,
  take,
  takeLatest
} from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";

import { startApplicationInitialization } from "../store/actions/application";
import {
  checkCurrentSession,
  sessionInvalid
} from "../store/actions/authentication";
import {
  identificationCancel,
  identificationForceLogout,
  identificationPinReset,
  identificationRequest,
  identificationReset,
  identificationStart,
  identificationSuccess
} from "../store/actions/identification";
import {
  navigateToMessageRouterScreen,
  navigateToOnboardingPinScreenAction
} from "../store/actions/navigation";
import { clearNotificationPendingMessage } from "../store/actions/notifications";
import { updatePin } from "../store/actions/pinset";
import {
  paymentDeletePayment,
  runDeleteActivePaymentSaga
} from "../store/actions/wallet/payment";
import {
  IdentificationCancelData,
  IdentificationGenericData,
  IdentificationResult,
  IdentificationSuccessData
} from "../store/reducers/identification";
import { pendingMessageStateSelector } from "../store/reducers/notifications/pendingMessage";
import { paymentsCurrentStateSelector } from "../store/reducers/payments/current";
import { isPaymentOngoingSelector } from "../store/reducers/wallet/payment";
import { PinString } from "../types/PinString";
import { SagaCallReturnType } from "../types/utils";
import { deletePin } from "../utils/keychain";

type ResultAction =
  | ActionType<typeof identificationCancel>
  | ActionType<typeof identificationPinReset>
  | ActionType<typeof identificationForceLogout>
  | ActionType<typeof identificationSuccess>;
// Wait the identification and return the result
function* waitIdentificationResult(): Generator<
  Effect,
  void | IdentificationResult,
  any
> {
  const resultAction: ResultAction = yield take([
    getType(identificationCancel),
    getType(identificationPinReset),
    getType(identificationForceLogout),
    getType(identificationSuccess)
  ]);

  switch (resultAction.type) {
    case getType(identificationCancel):
      return IdentificationResult.cancel;

    case getType(identificationPinReset): {
      // If a payment is occurring, delete the active payment from pagoPA
      const paymentState: ReturnType<typeof paymentsCurrentStateSelector> = yield select(
        paymentsCurrentStateSelector
      );
      if (paymentState.kind === "ACTIVATED") {
        yield put(runDeleteActivePaymentSaga());
        // we try to wait untinl the payment deactivation is completed. If the request to backend fails for any reason, we proceed anyway with session invalidation
        yield take([
          paymentDeletePayment.failure,
          paymentDeletePayment.success
        ]);
      }

      // Invalidate the session
      yield put(sessionInvalid());

      // Delete the unlock code
      // eslint-disable-next-line
      yield call(deletePin);

      // Hide the identification screen
      yield put(identificationReset());

      return IdentificationResult.pinreset;
    }

    case getType(identificationSuccess): {
      // if the identification has been successfully, check if the current session is still valid
      yield put(checkCurrentSession.request());
      return IdentificationResult.success;
    }

    case getType(identificationForceLogout): {
      yield put(sessionInvalid());
      yield put(identificationReset());
      return IdentificationResult.pinreset;
    }

    default: {
      ((): never => resultAction)();
    }
  }
}

/**
 * If you need to start the identification process and wait the result in a "sync" way,
 * like we do in the startup saga, use this generator
 */
export function* startAndReturnIdentificationResult(
  pin: PinString,
  canResetPin: boolean = true,
  isValidatingTask: boolean = false,
  identificationGenericData?: IdentificationGenericData,
  identificationCancelData?: IdentificationCancelData,
  identificationSuccessData?: IdentificationSuccessData,
  shufflePad: boolean = false
): Iterator<Effect | SagaCallReturnType<typeof waitIdentificationResult>> {
  yield put(
    identificationStart(
      pin,
      canResetPin,
      isValidatingTask,
      identificationGenericData,
      identificationCancelData,
      identificationSuccessData,
      shufflePad
    )
  );

  return yield call(waitIdentificationResult);
}

// Started by redux action
function* startAndHandleIdentificationResult(
  pin: PinString,
  identificationRequestAction: ActionType<typeof identificationRequest>
) {
  yield put(
    identificationStart(
      pin,
      identificationRequestAction.payload.canResetPin,
      identificationRequestAction.payload.isValidatingTask,
      identificationRequestAction.payload.identificationGenericData,
      identificationRequestAction.payload.identificationCancelData,
      identificationRequestAction.payload.identificationSuccessData,
      identificationRequestAction.payload.shufflePad
    )
  );
  const identificationResult = yield call(waitIdentificationResult);

  if (identificationResult === IdentificationResult.pinreset) {
    yield put(startApplicationInitialization());
  } else if (identificationResult === IdentificationResult.success) {
    // Check if we have a pending notification message
    const pendingMessageState: ReturnType<typeof pendingMessageStateSelector> = yield select(
      pendingMessageStateSelector
    );

    // Check if there is a payment ongoing
    const isPaymentOngoing: ReturnType<typeof isPaymentOngoingSelector> = yield select(
      isPaymentOngoingSelector
    );

    if (!isPaymentOngoing && pendingMessageState) {
      // We have a pending notification message to handle
      const messageId = pendingMessageState.id;

      // Remove the pending message from the notification state
      yield put(clearNotificationPendingMessage());

      // Navigate to message router screen
      yield put(navigateToMessageRouterScreen({ messageId }));
    }
  }
}

export function* watchIdentification(pin: PinString): IterableIterator<Effect> {
  // Watch for identification request
  yield takeLatest(
    getType(identificationRequest),
    startAndHandleIdentificationResult,
    pin
  );

  // Watch for requests to update the unlock code.
  yield takeLatest(getType(updatePin), function* () {
    yield put(navigateToOnboardingPinScreenAction);
  });
}
