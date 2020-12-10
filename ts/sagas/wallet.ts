/* eslint-disable */

/**
 * A saga that manages the Wallet.
 */

import { none, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";

import { DeferredPromise } from "italia-ts-commons/lib/promises";
import {
  call,
  delay,
  Effect,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { ActionType, getType, isActionOf } from "typesafe-actions";

import { TypeEnum } from "../../definitions/pagopa/Wallet";
import { BackendClient } from "../api/backend";
import { PaymentManagerClient } from "../api/pagopa";
import { getCardIconFromBrandLogo } from "../components/wallet/card/Logo";
import {
  apiUrlPrefix,
  bpdEnabled,
  fetchPagoPaTimeout,
  fetchPaymentManagerLongTimeout
} from "../config";
import {
  handleAddPan,
  handleLoadAbi,
  handleLoadPans
} from "../features/wallet/onboarding/bancomat/saga/networking";
import { addBancomatToWalletAndActivateBpd } from "../features/wallet/onboarding/bancomat/saga/orchestration/addBancomatToWallet";
import {
  addBancomatToWallet,
  loadAbi,
  searchUserPans,
  walletAddBancomatStart
} from "../features/wallet/onboarding/bancomat/store/actions";
import {
  handleAddUserSatispayToWallet,
  handleSearchUserSatispay
} from "../features/wallet/onboarding/satispay/saga/networking";
import { addSatispayToWalletAndActivateBpd } from "../features/wallet/onboarding/satispay/saga/orchestration/addSatispayToWallet";
import ROUTES from "../navigation/routes";
import { navigateBack } from "../store/actions/navigation";
import { profileLoadSuccess, profileUpsert } from "../store/actions/profile";
import {
  backToEntrypointPayment,
  paymentAttiva,
  paymentCheck,
  paymentDeletePayment,
  paymentExecutePayment,
  paymentFetchAllPspsForPaymentId,
  paymentFetchPspsForPaymentId,
  paymentIdPolling,
  paymentInitializeEntrypointRoute,
  paymentInitializeState,
  paymentUpdateWalletPsp,
  paymentVerifica,
  runDeleteActivePaymentSaga,
  runStartOrResumePaymentActivationSaga
} from "../store/actions/wallet/payment";
import {
  deleteReadTransaction,
  fetchPsp,
  fetchTransactionFailure,
  fetchTransactionRequest,
  fetchTransactionsLoadComplete,
  fetchTransactionsRequest,
  fetchTransactionsRequestWithExpBackoff,
  fetchTransactionSuccess,
  pollTransactionSagaCompleted,
  pollTransactionSagaTimeout,
  runPollTransactionSaga
} from "../store/actions/wallet/transactions";
import {
  addWalletCreditCardFailure,
  addWalletCreditCardRequest,
  addWalletCreditCardSuccess,
  addWalletNewCreditCardSuccess,
  addWalletNewCreditCardFailure,
  creditCardCheckout3dsRequest,
  creditCardCheckout3dsSuccess,
  deleteWalletRequest,
  fetchWalletsFailure,
  fetchWalletsRequest,
  fetchWalletsSuccess,
  payCreditCardVerificationFailure,
  payCreditCardVerificationRequest,
  payCreditCardVerificationSuccess,
  runStartOrResumeAddCreditCardSaga,
  setFavouriteWalletRequest,
  setWalletSessionEnabled,
  fetchWalletsRequestWithExpBackoff
} from "../store/actions/wallet/wallets";
import { isProfileEmailValidatedSelector } from "../store/reducers/profile";
import { GlobalState } from "../store/reducers/types";

import {
  EnableableFunctionsTypeEnum,
  isRawCreditCard,
  NullableWallet,
  PaymentManagerToken,
  PayRequest
} from "../types/pagopa";
import { SessionToken } from "../types/SessionToken";

import { defaultRetryingFetch } from "../utils/fetch";
import { getCurrentRouteKey, getCurrentRouteName } from "../utils/navigation";
import { SessionManager } from "../utils/SessionManager";
import { paymentsDeleteUncompletedSaga } from "./payments";
import {
  addWalletCreditCardRequestHandler,
  deleteWalletRequestHandler,
  fetchPspRequestHandler,
  fetchTransactionRequestHandler,
  fetchTransactionsRequestHandler,
  getWallets,
  payCreditCardVerificationRequestHandler,
  paymentAttivaRequestHandler,
  paymentCheckRequestHandler,
  paymentDeletePaymentRequestHandler,
  paymentExecutePaymentRequestHandler,
  paymentFetchAllPspsForWalletRequestHandler,
  paymentFetchPspsForWalletRequestHandler,
  paymentIdPollingRequestHandler,
  paymentVerificaRequestHandler,
  setFavouriteWalletRequestHandler,
  updateWalletPspRequestHandler
} from "./wallet/pagopaApis";
import { getTransactionsRead } from "../store/reducers/entities/readTransactions";
import _ from "lodash";
import { hasFunctionEnabled } from "../utils/walletv2";
import { bpdEnabledSelector } from "../features/bonus/bpd/store/reducers/details/activation";
import { isReady } from "../features/bonus/bpd/model/RemoteValue";
import {
  navigateToActivateBpdOnNewCreditCard,
  navigateToSuggestBpdActivation
} from "../features/wallet/onboarding/bancomat/navigation/action";
import { navigationHistoryPop } from "../store/actions/navigationHistory";
import { getTitleFromCard } from "../utils/paymentMethod";
import {
  addSatispayToWallet,
  searchUserSatispay,
  walletAddSatispayStart
} from "../features/wallet/onboarding/satispay/store/actions";
import { ContentClient } from "../api/content";
import { backOffWaitingTime } from "../store/reducers/wallet/lastRequestError";

/**
 * Configure the max number of retries and delay between retries when polling
 * for the completion of a transaction during payment.
 *
 * Max wait time will be POLL_TRANSACTION_MAX_RETRIES * POLL_TRANSACTION_DELAY_MILLIS
 */
const POLL_TRANSACTION_MAX_RETRIES = 30;
const POLL_TRANSACTION_DELAY_MILLIS = 500;

/**
 * This saga manages the flow for adding a new card.
 *
 * Adding a new card can happen either from the wallet home screen or during the
 * payment process from the payment method selection screen.
 *
 * To board a new card, we must complete the following steps:
 *
 * 1) add the card to the user wallets
 * 2) execute a "fake" payment to validate the card
 * 3) if required, complete the 3DS checkout for the payment in step (2)
 *
 * This saga updates a state for each step, thus it can be run multiple times
 * to resume the flow from the last succesful step (retry behavior).
 *
 * This saga gets run from ConfirmCardDetailsScreen that is also responsible
 * for showing relevant error and loading states to the user based on the
 * potential state of the flow substates (see GlobalState.wallet.wallets).
 *
 */
// eslint-disable-next-line
function* startOrResumeAddCreditCardSaga(
  pmSessionManager: SessionManager<PaymentManagerToken>,
  action: ActionType<typeof runStartOrResumeAddCreditCardSaga>
) {
  // prepare a new wallet (payment method) that describes the credit card we
  // want to add
  const creditCardWallet: NullableWallet = {
    idWallet: undefined,
    type: TypeEnum.CREDIT_CARD,
    favourite: action.payload.setAsFavorite,
    creditCard: action.payload.creditCard,
    psp: undefined
  };

  while (true) {
    // before each step we select the updated payment state to know what has
    // been already done.
    const state: GlobalState["wallet"]["wallets"] = yield select(
      _ => _.wallet.wallets
    );

    //
    // First step: add the credit card to the user wallets
    //
    // Note that the new wallet will not be visibile to the user until all the
    // card onboarding steps have been completed.
    //

    if (pot.isNone(state.creditCardAddWallet)) {
      yield put(addWalletCreditCardRequest({ creditcard: creditCardWallet }));
      const responseAction = yield take([
        getType(addWalletCreditCardSuccess),
        getType(addWalletCreditCardFailure)
      ]);
      if (isActionOf(addWalletCreditCardFailure, responseAction)) {
        // this step failed, exit the flow
        if (
          responseAction.payload.kind === "ALREADY_EXISTS" &&
          action.payload.onFailure
        ) {
          // if the card already exists, run onFailure before exiting the flow
          action.payload.onFailure(responseAction.payload.kind);
        }
        return;
      }
      // all is ok, continue to the next step
      continue;
    }

    //
    // Second step: verify the card with a "fake" payment.
    //
    // Note that this is not actually a real payment, the card processor will
    // just lock the amount from the card available credit. The user will not
    // see this transaction in the transaction list and he will not receive
    // any email notification concerning this transaction.
    //

    const { idWallet } = state.creditCardAddWallet.value.data;

    if (pot.isNone(state.creditCardVerification)) {
      const payRequest: PayRequest = {
        data: {
          idWallet,
          tipo: "web",
          cvv: action.payload.creditCard.securityCode
            ? action.payload.creditCard.securityCode
            : undefined
        }
      };
      yield put(
        payCreditCardVerificationRequest({
          payRequest,
          language: action.payload.language
        })
      );
      const responseAction = yield take([
        getType(payCreditCardVerificationSuccess),
        getType(payCreditCardVerificationFailure)
      ]);
      if (isActionOf(payCreditCardVerificationFailure, responseAction)) {
        // this step failed, exit the flow
        return;
      }
      // all is ok, continue to the next step
      continue;
    }

    //
    // Third step: process the optional 3ds checkout.
    //
    // The previous payment step may provide a web URL for the 3DS checkout
    // flow that must be completed by the user to authorize the transaction.
    // Even though this step is optional, in practice Pagopa will always
    // require the 3DS checkout for cards that gets added to the wallet.
    //

    const urlCheckout3ds =
      state.creditCardVerification.value.data.urlCheckout3ds;
    const pagoPaToken = pmSessionManager.get();

    if (pot.isNone(state.creditCardCheckout3ds)) {
      if (urlCheckout3ds !== undefined && pagoPaToken.isSome()) {
        yield put(
          creditCardCheckout3dsRequest({
            urlCheckout3ds,
            paymentManagerToken: pagoPaToken.value
          })
        );
        yield take(getType(creditCardCheckout3dsSuccess));
        // all is ok, continue to the next step
        continue;
      } else {
        // if there is no need for a 3ds checkout, simulate a success checkout
        // to proceed to the next step
        yield put(creditCardCheckout3dsSuccess("done"));
        continue;
      }
    }

    //
    // Fourth step: verify that the new card exists in the user wallets
    //
    // There currently is no way of determining whether the card has been added
    // successfully from the URL returned in the webview, so the approach here
    // is to fetch the wallets and look for a wallet with the same ID of the
    // wallet we just added.
    // TODO: find a way of finding out the result of the request from the URL
    //
    // FIXME: we may want to trigger a success here and leave the fetching of
    //        the wallets to the caller
    yield put(fetchWalletsRequest());
    const fetchWalletsResultAction = yield take([
      getType(fetchWalletsSuccess),
      getType(fetchWalletsFailure)
    ]);
    if (isActionOf(fetchWalletsSuccess, fetchWalletsResultAction)) {
      const updatedWallets = fetchWalletsResultAction.payload;
      const maybeAddedWallet = updatedWallets.find(
        _ => _.idWallet === idWallet
      );
      // if the new method has been added
      if (maybeAddedWallet !== undefined) {
        const bpdEnroll: ReturnType<typeof bpdEnabledSelector> = yield select(
          bpdEnabledSelector
        );
        // dispatch the action: a new card has been added
        yield put(addWalletNewCreditCardSuccess());
        // check if the new method is compliant with bpd
        if (bpdEnabled) {
          const hasBpdFeature = hasFunctionEnabled(
            maybeAddedWallet.paymentMethod,
            EnableableFunctionsTypeEnum.BPD
          );
          // if the method is bpd compliant check if we have info about bpd activation
          if (hasBpdFeature && isReady(bpdEnroll)) {
            // if bdp is active navigate to a screen where it asked to enroll that method in bpd
            // otherwise navigate to a screen where is asked to join bpd
            if (
              bpdEnroll.value &&
              isRawCreditCard(maybeAddedWallet.paymentMethod)
            ) {
              yield put(
                navigateToActivateBpdOnNewCreditCard({
                  creditCards: [
                    {
                      ...maybeAddedWallet.paymentMethod,
                      icon: getCardIconFromBrandLogo(
                        maybeAddedWallet.paymentMethod.info
                      ),
                      caption: getTitleFromCard(maybeAddedWallet.paymentMethod)
                    }
                  ]
                })
              );
            } else {
              yield put(navigateToSuggestBpdActivation());
            }
            // remove these screens from the navigation stack: method choice, credit card form, credit card resume
            // this pop could be easily break when this flow is entered by other points
            // different from the current ones (i.e see https://www.pivotaltracker.com/story/show/175757212)
            yield put(navigationHistoryPop(3));
            return;
          }
        }
        if (action.payload.setAsFavorite === true) {
          yield put(setFavouriteWalletRequest(maybeAddedWallet.idWallet));
        }
        // signal the completion
        if (action.payload.onSuccess) {
          action.payload.onSuccess(maybeAddedWallet);
        }
      } else {
        yield put(addWalletNewCreditCardFailure());

        if (action.payload.onFailure) {
          action.payload.onFailure();
        }
      }
    }
    break;
  }
}

/**
 * This saga will run in sequence the requests needed to activate a payment:
 *
 * 1) attiva -> nodo
 * 2) polling for a payment id <- nodo
 * 3) check -> payment manager
 *
 * Each step has a corresponding state in the wallet.payment state that gets
 * updated with the "pot" state (none -> loading -> some|error).
 *
 * Each time the saga is run, it will resume from the next step that needs to
 * be executed (either because it never executed or because it previously
 * returned an error).
 *
 * Not that the pagoPA activation flow is not really resumable in case a step
 * returns an error (i.e. the steps are not idempotent).
 *
 * TODO: the resume logic may be made more intelligent by analyzing the error
 *       of each step and proceeed to the next step under certain conditions
 *       (e.g. when resuming a previous payment flow from scratch, some steps
 *       may fail because they are not idempotent, but we could just proceed
 *       to the next step).
 */
// eslint-disable-next-line
function* startOrResumePaymentActivationSaga(
  action: ActionType<typeof runStartOrResumePaymentActivationSaga>
) {
  while (true) {
    // before each step we select the updated payment state to know what has
    // been already done.
    const paymentState: GlobalState["wallet"]["payment"] = yield select(
      _ => _.wallet.payment
    );

    // first step: Attiva
    if (pot.isNone(paymentState.attiva)) {
      // this step needs to be executed
      yield put(
        paymentAttiva.request({
          rptId: action.payload.rptId,
          verifica: action.payload.verifica
        })
      );
      const responseAction = yield take([
        getType(paymentAttiva.success),
        getType(paymentAttiva.failure)
      ]);
      if (isActionOf(paymentAttiva.failure, responseAction)) {
        // this step failed, exit the flow
        return;
      }
      // all is ok, continue to the next step
      continue;
    }

    // second step: poll for payment ID
    if (pot.isNone(paymentState.paymentId)) {
      // this step needs to be executed
      yield put(paymentIdPolling.request(action.payload.verifica));
      const responseAction = yield take([
        getType(paymentIdPolling.success),
        getType(paymentIdPolling.failure)
      ]);
      if (isActionOf(paymentIdPolling.failure, responseAction)) {
        // this step failed, exit the flow
        return;
      }
      // all is ok, continue to the next step
      continue;
    }

    // third step: "check" the payment
    if (pot.isNone(paymentState.check)) {
      // this step needs to be executed
      yield put(paymentCheck.request(paymentState.paymentId.value));
      const responseAction = yield take([
        getType(paymentCheck.success),
        getType(paymentCheck.failure)
      ]);
      if (isActionOf(paymentCheck.failure, responseAction)) {
        // this step failed, exit the flow
        return;
      }
      // all is ok, continue to the next step
      continue;
    }

    // finally, we signal the success of the activation flow
    action.payload.onSuccess(paymentState.paymentId.value);

    // since this is the last step, we exit the flow
    break;
  }
}

/**
 * This saga will poll for a transaction until it reaches a certain "valid"
 * status, as defined by the isValid predicate.
 * The saga will retry for POLL_TRANSACTION_MAX_RETRIES times, with a delay
 * of POLL_TRANSACTION_DELAY_MILLIS between retries.
 */
function* pollTransactionSaga(
  action: ActionType<typeof runPollTransactionSaga>
) {
  // eslint-disable-next-line no-var
  var count = POLL_TRANSACTION_MAX_RETRIES;

  const { id, isValid, onValid, onTimeout } = action.payload;

  while (count > 0) {
    // cycle until POLL_TRANSACTION_MAX_RETRIES

    // issue a request for fetch the transaction
    yield put(fetchTransactionRequest(id));
    const result = yield take([
      getType(fetchTransactionSuccess),
      getType(fetchTransactionFailure)
    ]);

    if (isActionOf(fetchTransactionSuccess, result)) {
      // on success, emit the completed action and call the (optional) callback
      const transaction = result.payload;
      if (isValid(transaction)) {
        yield put(pollTransactionSagaCompleted(transaction));
        if (onValid) {
          onValid(transaction);
        }
        return;
      }
    }

    // on failure, try again after a delay

    // eslint-disable-next-line
    yield delay(POLL_TRANSACTION_DELAY_MILLIS);

    count -= 1;
  }
  // no more retries, emit a timeout action and call the (optional) failure
  // callback
  yield put(pollTransactionSagaTimeout());
  if (onTimeout) {
    onTimeout();
  }
}

/**
 * This saga attempts to delete the active payment, if there's one.
 *
 * This is a best effort operation as the result is actually ignored.
 */
function* deleteActivePaymentSaga() {
  const potPaymentId: GlobalState["wallet"]["payment"]["paymentId"] = yield select(
    _ => _.wallet.payment.paymentId
  );
  const maybePaymentId = pot.toOption(potPaymentId);
  // stop polling
  shouldAbortPaymentIdPollingRequest.e2(true);
  if (maybePaymentId.isSome()) {
    yield put(
      paymentDeletePayment.request({ paymentId: maybePaymentId.value })
    );
  }
}

// this is a shared DeferredPromise used to stop polling when user aborts a running payment
// eslint-disable-next-line
let shouldAbortPaymentIdPollingRequest = DeferredPromise<boolean>();
/**
 * Main wallet saga.
 *
 * This saga is responsible for handling actions the mostly correspond to API
 * requests towards the pagoPA "nodo" and the pagoPA "PaymentManager" APIs.
 *
 * This saga gets forked from the startup saga each time the user authenticates
 * and a new PagopaToken gets received from the backend. Infact, the
 * pagoPaClient passed as paramenter to this saga, embeds the PagopaToken.
 */
// eslint-disable-next-line
export function* watchWalletSaga(
  sessionToken: SessionToken,
  walletToken: string,
  paymentManagerUrlPrefix: string
): Generator<Effect, void, boolean> {
  // Builds a backend client specifically for the pagopa-proxy endpoints that
  // need a fetch instance that doesn't retry requests and have longer timeout
  const pagopaNodoClient = BackendClient(
    apiUrlPrefix,
    sessionToken,
    defaultRetryingFetch(fetchPagoPaTimeout, 0)
  );

  // Backend client for polling for paymentId - uses an instance of fetch that
  // considers a 404 as a transient error and retries with a constant delay
  const pollingPagopaNodoClient = BackendClient(apiUrlPrefix, sessionToken);

  // Client for the PagoPA PaymentManager
  const paymentManagerClient: PaymentManagerClient = PaymentManagerClient(
    paymentManagerUrlPrefix,
    walletToken,
    // despite both fetch have same configuration, keeping both ensures possible modding
    defaultRetryingFetch(fetchPaymentManagerLongTimeout, 0),
    defaultRetryingFetch(fetchPaymentManagerLongTimeout, 0)
  );

  // Helper function that requests a new session token from the PaymentManager.
  // When calling the PM APIs, we must use separate session, generated from the
  // walletToken.
  const getPaymentManagerSession = async () => {
    try {
      const response = await paymentManagerClient.getSession(walletToken);
      if (response.isRight() && response.value.status === 200) {
        return some(response.value.value.data.sessionToken);
      }
      return none;
    } catch {
      return none;
    }
  };

  // The session manager for the PagoPA PaymentManager (PM) will manage the
  // refreshing of the PM session when calling its APIs, keeping a shared token
  // and serializing the refresh requests.
  const pmSessionManager = new SessionManager(getPaymentManagerSession);
  // check if the current profile (this saga starts only when the user is logged in)
  // has an email address validated
  const isEmailValidated = yield select(isProfileEmailValidatedSelector);
  yield call(pmSessionManager.setSessionEnabled, isEmailValidated);
  //
  // Sagas
  //

  yield takeLatest(
    getType(runStartOrResumeAddCreditCardSaga),
    startOrResumeAddCreditCardSaga,
    pmSessionManager
  );

  yield takeLatest(
    getType(runStartOrResumePaymentActivationSaga),
    startOrResumePaymentActivationSaga
  );

  yield takeLatest(getType(runPollTransactionSaga), pollTransactionSaga);

  yield takeLatest(
    getType(runDeleteActivePaymentSaga),
    deleteActivePaymentSaga
  );

  //
  // API requests
  //

  yield takeLatest(
    getType(fetchTransactionsRequest),
    fetchTransactionsRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(getType(fetchTransactionsRequestWithExpBackoff), function* (
    action: ActionType<typeof fetchTransactionsRequestWithExpBackoff>
  ) {
    const waiting: ReturnType<typeof backOffWaitingTime> = yield select(
      backOffWaitingTime
    );
    if (waiting > 0) {
      yield delay(waiting);
    }
    yield put(fetchTransactionsRequest(action.payload));
  });

  /**
   * watch when all transactions are been loaded
   * check if transaction read store section (entities.transactionsRead) is dirty:
   * it could contain transactions different from the loaded ones
   * This scenario could happen when same app instance is used across multiple users
   */
  yield takeLatest(getType(fetchTransactionsLoadComplete), function* (
    action: ActionType<typeof fetchTransactionsLoadComplete>
  ) {
    const transactionRead: ReturnType<typeof getTransactionsRead> = yield select(
      getTransactionsRead
    );
    const transactionReadId = Object.keys(transactionRead).map(
      k => transactionRead[k]
    );
    const allTransactionsId = action.payload.map(t => t.id);
    const toDelete = _.difference(transactionReadId, allTransactionsId);
    if (toDelete.length > 0) {
      yield put(deleteReadTransaction(toDelete));
    }
  });

  yield takeLatest(
    getType(fetchTransactionRequest),
    fetchTransactionRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(getType(fetchWalletsRequestWithExpBackoff), function* () {
    const waiting: ReturnType<typeof backOffWaitingTime> = yield select(
      backOffWaitingTime
    );
    if (waiting > 0) {
      yield delay(waiting);
    }
    yield put(fetchWalletsRequest());
  });

  yield takeLatest(
    getType(fetchWalletsRequest),
    getWallets,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(addWalletCreditCardRequest),
    addWalletCreditCardRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(payCreditCardVerificationRequest),
    payCreditCardVerificationRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(setFavouriteWalletRequest),
    setFavouriteWalletRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentUpdateWalletPsp.request),
    updateWalletPspRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(deleteWalletRequest),
    deleteWalletRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentVerifica.request),
    paymentVerificaRequestHandler,
    pagopaNodoClient.getVerificaRpt
  );

  yield takeLatest(
    getType(paymentAttiva.request),
    paymentAttivaRequestHandler,
    pagopaNodoClient.postAttivaRpt
  );

  yield takeLatest(getType(paymentIdPolling.request), function* (
    action: ActionType<typeof paymentIdPolling["request"]>
  ) {
    // getPaymentId is a tuple2
    // e1: deferredPromise, used to abort the constantPollingFetch
    // e2: the fetch to execute
    const getPaymentId = pollingPagopaNodoClient.getPaymentId();
    shouldAbortPaymentIdPollingRequest = getPaymentId.e1;
    yield call(paymentIdPollingRequestHandler, getPaymentId, action);
  });

  yield takeLatest(
    getType(paymentCheck.request),
    paymentCheckRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentFetchPspsForPaymentId.request),
    paymentFetchPspsForWalletRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentFetchAllPspsForPaymentId.request),
    paymentFetchAllPspsForWalletRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentExecutePayment.request),
    paymentExecutePaymentRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(paymentDeletePayment.request),
    paymentDeletePaymentRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  yield takeLatest(
    getType(fetchPsp.request),
    fetchPspRequestHandler,
    paymentManagerClient,
    pmSessionManager
  );

  /**
   * whenever the profile is loaded (from a load request or from un update)
   * check if the email is validated. If it not the session manager has to be disabled
   */
  yield takeLatest(
    [getType(profileUpsert.success), getType(profileLoadSuccess)],
    checkProfile
  );

  yield takeLatest(
    getType(setWalletSessionEnabled),
    setWalletSessionEnabledSaga,
    pmSessionManager
  );

  if (bpdEnabled) {
    const contentClient = ContentClient();

    // watch for load abi request
    yield takeLatest(loadAbi.request, handleLoadAbi, contentClient.getAbiList);

    // watch for load pans request
    yield takeLatest(
      searchUserPans.request,
      handleLoadPans,
      paymentManagerClient.getPans,
      pmSessionManager
    );

    // watch for add pan request
    yield takeLatest(
      addBancomatToWallet.request,
      handleAddPan,
      paymentManagerClient.addPans,
      pmSessionManager
    );

    // watch for add Bancomat to Wallet workflow
    yield takeLatest(walletAddBancomatStart, addBancomatToWalletAndActivateBpd);

    // watch for add Satispay to Wallet workflow
    yield takeLatest(walletAddSatispayStart, addSatispayToWalletAndActivateBpd);

    // watch for load satispay request
    yield takeLatest(
      searchUserSatispay.request,
      handleSearchUserSatispay,
      paymentManagerClient.searchSatispay,
      pmSessionManager
    );

    // watch for add satispay to the user's wallet
    yield takeLatest(
      addSatispayToWallet.request,
      handleAddUserSatispayToWallet,
      paymentManagerClient.addSatispayToWallet,
      pmSessionManager
    );
  }

  yield fork(paymentsDeleteUncompletedSaga);
}

function* checkProfile(
  action:
    | ActionType<typeof profileUpsert.success>
    | ActionType<typeof profileLoadSuccess>
) {
  const enabled = action.payload.is_email_validated === true;
  yield put(setWalletSessionEnabled(enabled));
}

function* enableSessionManager(
  enable: boolean,
  sessionManager: SessionManager<PaymentManagerToken>
) {
  yield call(sessionManager.setSessionEnabled, enable);
}

/**
 * enable the Session Manager to perform request with a fresh token
 * otherwise the Session Manager doesn't refresh the token and it doesn't
 * perform requests to payment manager
 * @param sessionManager
 * @param action
 */
function* setWalletSessionEnabledSaga(
  sessionManager: SessionManager<PaymentManagerToken>,
  action: ActionType<typeof setWalletSessionEnabled>
): Iterator<Effect> {
  yield call(enableSessionManager, action.payload, sessionManager);
}
/**
 * This saga checks what is the route whence a new payment is started
 */
export function* watchPaymentInitializeSaga(): Iterator<Effect> {
  yield takeEvery(getType(paymentInitializeState), function* () {
    const nav: GlobalState["nav"] = yield select(_ => _.nav);
    const currentRouteName = getCurrentRouteName(nav);
    const currentRouteKey = getCurrentRouteKey(nav);
    if (currentRouteName !== undefined && currentRouteKey !== undefined) {
      yield put(
        paymentInitializeEntrypointRoute({
          name: currentRouteName,
          key: currentRouteKey
        })
      );
    }
  });
}

/**
 * This saga back to entrypoint payment if the payment was initiated from the message list or detail
 * otherwise if the payment starts in scan qr code screen or in Manual data insertion screen
 * it makes one or two supplementary step backs (the correspondant step to wallet home from these screens)
 */
export function* watchBackToEntrypointPaymentSaga(): Iterator<Effect> {
  yield takeEvery(getType(backToEntrypointPayment), function* () {
    const entrypointRoute: GlobalState["wallet"]["payment"]["entrypointRoute"] = yield select(
      _ => _.wallet.payment.entrypointRoute
    );
    if (entrypointRoute !== undefined) {
      const key = entrypointRoute ? entrypointRoute.key : undefined;
      const routeName = entrypointRoute ? entrypointRoute.name : undefined;
      yield put(navigateBack({ key }));
      // back to the wallet home from PAYMENT_MANUAL_DATA_INSERTION
      if (routeName === ROUTES.PAYMENT_MANUAL_DATA_INSERTION) {
        yield put(navigateBack());
        yield put(navigateBack());
      }
      // back to the wallet home from PAYMENT_SCAN_QR_CODE
      else if (routeName === ROUTES.PAYMENT_SCAN_QR_CODE) {
        yield put(navigateBack());
      }
      yield put(paymentInitializeState());
    }
  });
}
