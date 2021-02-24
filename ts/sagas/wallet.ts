/* eslint-disable */

/**
 * A saga that manages the Wallet.
 */
import { none, some, Option, isSome } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";

import { DeferredPromise } from "italia-ts-commons/lib/promises";
import _ from "lodash";
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
import { ContentClient } from "../api/content";
import { PaymentManagerClient } from "../api/pagopa";
import { getCardIconFromBrandLogo } from "../components/wallet/card/Logo";
import {
  apiUrlPrefix,
  bpdEnabled,
  fetchPagoPaTimeout,
  fetchPaymentManagerLongTimeout
} from "../config";
import { bpdEnabledSelector } from "../features/bonus/bpd/store/reducers/details/activation";
import {
  navigateToActivateBpdOnNewCreditCard,
  navigateToSuggestBpdActivation
} from "../features/wallet/onboarding/bancomat/navigation/action";
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
  handleAddpayToWallet,
  handleSearchUserBPay
} from "../features/wallet/onboarding/bancomatPay/saga/networking";
import { addBPayToWalletAndActivateBpd } from "../features/wallet/onboarding/bancomatPay/saga/orchestration/addBPayToWallet";
import {
  addBPayToWallet,
  searchUserBPay,
  walletAddBPayStart
} from "../features/wallet/onboarding/bancomatPay/store/actions";
import {
  handleAddCoBadgeToWallet,
  handleLoadCoBadgeConfiguration,
  handleSearchUserCoBadge
} from "../features/wallet/onboarding/cobadge/saga/networking";
import { addCoBadgeToWalletAndActivateBpd } from "../features/wallet/onboarding/cobadge/saga/orchestration/addCoBadgeToWallet";
import {
  addCoBadgeToWallet,
  loadCoBadgeAbiConfiguration,
  searchUserCoBadge,
  walletAddCoBadgeStart
} from "../features/wallet/onboarding/cobadge/store/actions";
import {
  handleAddUserSatispayToWallet,
  handleSearchUserSatispay
} from "../features/wallet/onboarding/satispay/saga/networking";
import { addSatispayToWalletAndActivateBpd } from "../features/wallet/onboarding/satispay/saga/orchestration/addSatispayToWallet";
import {
  addSatispayToWallet,
  searchUserSatispay,
  walletAddSatispayStart
} from "../features/wallet/onboarding/satispay/store/actions";
import { mixpanelTrack } from "../mixpanel";
import ROUTES from "../navigation/routes";
import { navigateBack } from "../store/actions/navigation";
import { navigationHistoryPop } from "../store/actions/navigationHistory";
import { profileLoadSuccess, profileUpsert } from "../store/actions/profile";
import {
  backToEntrypointPayment,
  paymentAttiva,
  paymentCheck,
  paymentDeletePayment,
  paymentExecuteStart,
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
  fetchTransactionRequest,
  fetchTransactionsFailure,
  fetchTransactionsLoadComplete,
  fetchTransactionsRequest,
  fetchTransactionsRequestWithExpBackoff
} from "../store/actions/wallet/transactions";
import {
  addWalletCreditCardFailure,
  addWalletCreditCardRequest,
  addWalletCreditCardSuccess,
  addWalletCreditCardWithBackoffRetryRequest,
  addWalletNewCreditCardFailure,
  addWalletNewCreditCardSuccess,
  deleteWalletRequest,
  fetchWalletsFailure,
  fetchWalletsRequest,
  fetchWalletsRequestWithExpBackoff,
  fetchWalletsSuccess,
  runStartOrResumeAddCreditCardSaga,
  setFavouriteWalletRequest,
  setWalletSessionEnabled
} from "../store/actions/wallet/wallets";
import { getTransactionsRead } from "../store/reducers/entities/readTransactions";
import { isProfileEmailValidatedSelector } from "../store/reducers/profile";
import { GlobalState } from "../store/reducers/types";
import { getAllWallets } from "../store/reducers/wallet/wallets";

import {
  EnableableFunctionsTypeEnum,
  isRawCreditCard,
  NullableWallet,
  PaymentManagerToken
} from "../types/pagopa";
import { SessionToken } from "../types/SessionToken";

import { defaultRetryingFetch } from "../utils/fetch";
import { getCurrentRouteKey, getCurrentRouteName } from "../utils/navigation";
import { getTitleFromCard } from "../utils/paymentMethod";
import { backoffWait } from "../utils/saga";
import { SessionManager } from "../utils/SessionManager";
import { hasFunctionEnabled } from "../utils/walletv2";
import { paymentsDeleteUncompletedSaga } from "./payments";
import {
  addWalletCreditCardRequestHandler,
  deleteWalletRequestHandler,
  fetchPspRequestHandler,
  fetchTransactionRequestHandler,
  fetchTransactionsRequestHandler,
  getWallets,
  paymentAttivaRequestHandler,
  paymentCheckRequestHandler,
  paymentDeletePaymentRequestHandler,
  paymentFetchAllPspsForWalletRequestHandler,
  paymentFetchPspsForWalletRequestHandler,
  paymentIdPollingRequestHandler,
  paymentStartRequest,
  paymentVerificaRequestHandler,
  setFavouriteWalletRequestHandler,
  updateWalletPspRequestHandler
} from "./wallet/pagopaApis";
import { isTestEnv } from "../utils/environment";
import { addCreditCardOutcomeCode } from "../store/actions/wallet/outcomeCode";
import { lastPaymentOutcomeCodeSelector } from "../store/reducers/wallet/outcomeCode";
import reactotron from "reactotron-react-native";

/**
 * This saga manages the flow for adding a new card.
 *
 * Adding a new card can happen either from the wallet home screen or during the
 * payment process from the payment method selection screen.
 *
 * To board a new card, we must complete the following steps:
 *
 * 1) add the card to the user wallets
 * 2) complete the 3DS checkout for a fake payment
 *
 * This saga updates a state for each step, thus it can be run multiple times
 * to resume the flow from the last successful step (retry behavior).
 *
 * This saga gets run from ConfirmCardDetailsScreen that is also responsible
 * for showing relevant error and loading states to the user based on the
 * potential state of the flow substates (see GlobalState.wallet.wallets).
 *
 */
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
    const state: ReturnType<typeof getAllWallets> = yield select(getAllWallets);
    //
    // First step: add the credit card to the user wallets
    //
    // Note that the new wallet will not be visibile to the user until all the
    // card onboarding steps have been completed.
    //
    if (pot.isNone(state.creditCardAddWallet)) {
      yield put(
        addWalletCreditCardWithBackoffRetryRequest({
          creditcard: creditCardWallet
        })
      );
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

    const { idWallet } = state.creditCardAddWallet.value.data;

    //
    // Second step: process the 3ds checkout
    //

    try {
      // Request a new token to the PM. This prevent expired token during the webview navigation.
      // If the request for the new token fails a new Error is caught, the step fails and we exit the flow.
      const pagoPaToken: Option<PaymentManagerToken> = yield call(
        pmSessionManager.getNewToken
      );
      if (pagoPaToken.isSome()) {
        yield put(paymentExecuteStart.success(pagoPaToken.value));
        // Wait until the outcome code from the webview is available
        yield take(getType(addCreditCardOutcomeCode));

        const maybeOutcomeCode: ReturnType<typeof lastPaymentOutcomeCodeSelector> = yield select(
          lastPaymentOutcomeCodeSelector
        );
        // If the code is success:
        // - request all the wallets
        //   - if the request succeed:
        //      - Start the bpd enrolling
        //   - if the request fail:
        //      - ?
        if (isSome(maybeOutcomeCode.outcomeCode)) {
          const outcomeCode = maybeOutcomeCode.outcomeCode.value;

          // The credit card was added succesfully
          if (outcomeCode.status === "success") {
            yield put(addWalletNewCreditCardSuccess());

            // Get all the wallets
            yield put(fetchWalletsRequest());
            const fetchWalletsResultAction = yield take([
              getType(fetchWalletsSuccess),
              getType(fetchWalletsFailure)
            ]);
            if (isActionOf(fetchWalletsSuccess, fetchWalletsResultAction)) {
              // Start the bpd enrolling
              const updatedWallets = fetchWalletsResultAction.payload;
              const maybeAddedWallet = updatedWallets.find(
                _ => _.idWallet === idWallet
              );

              if (maybeAddedWallet !== undefined) {
                yield delay(2000);
                // The wallet was found
                const bpdEnroll: ReturnType<typeof bpdEnabledSelector> = yield select(
                  bpdEnabledSelector
                );
                // check if the new method is compliant with bpd
                if (bpdEnabled) {
                  const hasBpdFeature = hasFunctionEnabled(
                    maybeAddedWallet.paymentMethod,
                    EnableableFunctionsTypeEnum.BPD
                  );
                  // if the method is bpd compliant check if we have info about bpd activation
                  if (hasBpdFeature && pot.isSome(bpdEnroll)) {
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
                              caption: getTitleFromCard(
                                maybeAddedWallet.paymentMethod
                              )
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
                    yield put(navigationHistoryPop(4));
                    return;
                  }
                }
                if (action.payload.setAsFavorite === true) {
                  yield put(
                    setFavouriteWalletRequest(maybeAddedWallet.idWallet)
                  );
                }

                // TODO: is needed since that there are the outcome screen?
                // signal the completion
                if (action.payload.onSuccess) {
                  action.payload.onSuccess(maybeAddedWallet);
                }
              }
            }
          } else {
            // outcome is different from success
            yield put(addWalletNewCreditCardFailure());

            // TODO: is needed since that there are the outcome screen?
            if (action.payload.onFailure) {
              action.payload.onFailure();
            }
          }

          // There was a problem in the add credit card flow
        } else {
          yield put(addWalletNewCreditCardFailure());
          if (action.payload.onFailure) {
            action.payload.onFailure();
          }
        }
      } else {
        if (action.payload.onFailure) {
          yield call(mixpanelTrack, getType(addWalletNewCreditCardFailure), {
            reason: "cannot refresh wallet token"
          });
          action.payload.onFailure();
        }
        return;
      }
    } catch (e) {
      if (action.payload.onFailure) {
        action.payload.onFailure(e.message);
      }
      return;
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
    yield call(backoffWait, fetchTransactionsFailure);
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
    yield call(backoffWait, fetchWalletsFailure);
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
    getType(addWalletCreditCardWithBackoffRetryRequest),
    function* (
      action: ActionType<typeof addWalletCreditCardWithBackoffRetryRequest>
    ) {
      yield call(backoffWait, addWalletCreditCardFailure);
      yield put(addWalletCreditCardRequest(action.payload));
    }
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
    getType(paymentExecuteStart.request),
    paymentStartRequest,
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

    // watch for add Bancomat to Wallet workflow
    yield takeLatest(walletAddBancomatStart, addBancomatToWalletAndActivateBpd);

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

    // watch for add BPay to Wallet workflow
    yield takeLatest(walletAddBPayStart, addBPayToWalletAndActivateBpd);

    // watch for add Satispay to Wallet workflow
    yield takeLatest(walletAddSatispayStart, addSatispayToWalletAndActivateBpd);

    // watch for load Satispay request
    yield takeLatest(
      searchUserSatispay.request,
      handleSearchUserSatispay,
      paymentManagerClient.searchSatispay,
      pmSessionManager
    );

    // watch for add Satispay to the user's wallet
    yield takeLatest(
      addSatispayToWallet.request,
      handleAddUserSatispayToWallet,
      paymentManagerClient.addSatispayToWallet,
      pmSessionManager
    );

    // watch for BancomatPay search request
    yield takeLatest(
      searchUserBPay.request,
      handleSearchUserBPay,
      paymentManagerClient.searchBPay,
      pmSessionManager
    );
    // watch for add BancomatPay to the user's wallet
    yield takeLatest(
      addBPayToWallet.request,
      handleAddpayToWallet,
      paymentManagerClient.addBPayToWallet,
      pmSessionManager
    );

    // watch for CoBadge search request
    yield takeLatest(
      searchUserCoBadge.request,
      handleSearchUserCoBadge,
      paymentManagerClient.getCobadgePans,
      paymentManagerClient.searchCobadgePans,
      pmSessionManager
    );
    // watch for add CoBadge to the user's wallet
    yield takeLatest(
      addCoBadgeToWallet.request,
      handleAddCoBadgeToWallet,
      paymentManagerClient.addCobadgeToWallet,
      pmSessionManager
    );
    // watch for CoBadge configuration request
    yield takeLatest(
      loadCoBadgeAbiConfiguration.request,
      handleLoadCoBadgeConfiguration,
      contentClient.getCobadgeServices
    );

    // watch for add co-badge to Wallet workflow
    yield takeLatest(walletAddCoBadgeStart, addCoBadgeToWalletAndActivateBpd);
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

// to keep solid code encapsulation
export const testableWalletsSaga = isTestEnv
  ? { startOrResumeAddCreditCardSaga }
  : undefined;
