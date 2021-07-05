/* eslint-disable no-fallthrough */
// disabled in order to allows comments between the switch
import { NavigationActions } from "react-navigation";
import { getType } from "typesafe-actions";
import { setInstabugUserAttribute } from "../../boot/configureInstabug";
import {
  loadAllBonusActivations,
  loadAvailableBonuses
} from "../../features/bonus/bonusVacanze/store/actions/bonusVacanze";
import { trackBPayAction } from "../../features/wallet/onboarding/bancomatPay/analytics";
import { trackCoBadgeAction } from "../../features/wallet/onboarding/cobadge/analytics";
import { trackPrivativeAction } from "../../features/wallet/onboarding/privative/analytics";
import { mixpanel } from "../../mixpanel";
import { getCurrentRouteName } from "../../utils/navigation";
import {
  analyticsAuthenticationCompleted,
  analyticsAuthenticationStarted,
  analyticsOnboardingStarted
} from "../actions/analytics";
import { applicationChangeState } from "../actions/application";
import {
  idpLoginUrlChanged,
  idpSelected,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  sessionExpired,
  sessionInformationLoadFailure,
  sessionInformationLoadSuccess,
  sessionInvalid
} from "../actions/authentication";
import { cieAuthenticationError } from "../actions/cie";
import {
  contentMunicipalityLoad,
  loadServiceMetadata
} from "../actions/content";
import { instabugReportClosed, instabugReportOpened } from "../actions/debug";
import {
  identificationCancel,
  identificationFailure,
  identificationForceLogout,
  identificationPinReset,
  identificationRequest,
  identificationStart,
  identificationSuccess
} from "../actions/identification";
import {
  loadMessage,
  loadMessages,
  loadMessagesCancel,
  removeMessages,
  setMessageReadState
} from "../actions/messages";
import { setMixpanelEnabled } from "../actions/mixpanel";
import {
  updateNotificationInstallationFailure,
  updateNotificationsInstallationToken
} from "../actions/notifications";
import { tosAccepted } from "../actions/onboarding";
import { createPinSuccess, updatePin } from "../actions/pinset";
import {
  profileFirstLogin,
  profileLoadFailure,
  profileLoadSuccess,
  profileUpsert,
  removeAccountMotivation
} from "../actions/profile";
import { profileEmailValidationChanged } from "../actions/profileEmailValidationChange";
import {
  loadServiceDetail,
  loadServicesDetail,
  loadVisibleServices
} from "../actions/services";
import { Action, Dispatch, MiddlewareAPI } from "../actions/types";
import {
  deleteUserDataProcessing,
  upsertUserDataProcessing
} from "../actions/userDataProcessing";
import { userMetadataLoad, userMetadataUpsert } from "../actions/userMetadata";
import {
  abortRunningPayment,
  paymentAttiva,
  paymentCheck,
  paymentCompletedFailure,
  paymentCompletedSuccess,
  paymentDeletePayment,
  paymentExecuteStart,
  paymentFetchPspsForPaymentId,
  paymentIdPolling,
  paymentInitializeState,
  paymentUpdateWalletPsp,
  paymentVerifica,
  paymentWebViewEnd
} from "../actions/wallet/payment";
import {
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess
} from "../actions/wallet/transactions";
import {
  addCreditCardWebViewEnd,
  addWalletCreditCardFailure,
  addWalletCreditCardInit,
  addWalletCreditCardRequest,
  addWalletNewCreditCardFailure,
  addWalletNewCreditCardSuccess,
  creditCardCheckout3dsRequest,
  creditCardCheckout3dsSuccess,
  deleteWalletFailure,
  deleteWalletRequest,
  deleteWalletSuccess,
  refreshPMTokenWhileAddCreditCard,
  setFavouriteWalletFailure,
  setFavouriteWalletRequest,
  setFavouriteWalletSuccess
} from "../actions/wallet/wallets";

import trackBpdAction from "../../features/bonus/bpd/analytics/index";
import trackCgnAction from "../../features/bonus/cgn/analytics/index";
import trackEuCovidCertificateActions from "../../features/euCovidCert/analytics/index";
import trackBancomatAction from "../../features/wallet/onboarding/bancomat/analytics/index";
import trackSatispayAction from "../../features/wallet/satispay/analytics/index";
import {
  addCreditCardOutcomeCode,
  paymentOutcomeCode
} from "../actions/wallet/outcomeCode";
import { noAnalyticsRoutes } from "../../utils/analytics";
import { RTron } from "../../boot/configureStoreAndPersistor";
import { getError } from "../../utils/errors";
import { trackContentAction } from "./contentAnalytics";

// eslint-disable-next-line complexity
const trackAction = (mp: NonNullable<typeof mixpanel>) => (
  action: Action
): Promise<void | ReadonlyArray<null>> => {
  // eslint-disable-next-line sonarjs/max-switch-cases
  switch (action.type) {
    //
    // Application state actions
    //
    case getType(applicationChangeState):
      return mp.track("APP_STATE_CHANGE", {
        APPLICATION_STATE_NAME: action.payload
      });
    //
    // Onboarding (with properties)
    //
    case getType(tosAccepted):
      return mp.track(action.type, {
        acceptedTosVersion: action.payload
      });
    //
    // Authentication actions (with properties)
    //
    case getType(idpSelected):
      return mp.track(action.type, {
        SPID_IDP_ID: action.payload.id,
        SPID_IDP_NAME: action.payload.name
      });

    case getType(idpLoginUrlChanged):
      return mp.track(action.type, {
        SPID_URL: action.payload.url
      });

    // dispatch to mixpanel when the email is validated
    case getType(profileEmailValidationChanged):
      return mp.track(action.type, { isEmailValidated: action.payload });

    case getType(fetchTransactionsSuccess):
      return mp.track(action.type, {
        count: action.payload.data.length,
        total: action.payload.total.getOrElse(-1)
      });
    // messages
    case getType(loadMessages.success):
    //
    // wallets success / services load requests
    case getType(loadServicesDetail):
      return mp.track(action.type, {
        count: action.payload.length
      });
    // end pay webview Payment (payment + onboarding credit card) actions (with properties)
    case getType(addCreditCardWebViewEnd):
    case getType(paymentWebViewEnd):
      return mp.track(action.type, {
        exitType: action.payload
      });
    case getType(addCreditCardOutcomeCode):
    case getType(paymentOutcomeCode):
      return mp.track(action.type, {
        outCome: action.payload.getOrElse("")
      });
    //
    // Payment actions (with properties)
    //
    case getType(paymentVerifica.request):
      return mp.track(action.type, {
        organizationFiscalCode: action.payload.organizationFiscalCode,
        paymentNoticeNumber: action.payload.paymentNoticeNumber
      });
    case getType(paymentVerifica.success):
      return mp.track(action.type, {
        amount: action.payload.importoSingoloVersamento
      });
    case getType(paymentAttiva.request):
      return mp.track(action.type, {
        organizationFiscalCode: action.payload.rptId.organizationFiscalCode,
        paymentNoticeNumber: action.payload.rptId.paymentNoticeNumber
      });
    case getType(paymentCompletedSuccess):
      // PaymentCompletedSuccess may be generated by a completed payment or
      // by a verifica operation that return a duplicated payment error.
      // Only in the former case we have a transaction and an amount.
      if (action.payload.kind === "COMPLETED") {
        const amount = action.payload.transaction?.amount.amount;
        return mp
          .track(action.type, {
            amount,
            kind: action.payload.kind
          })
          .then(_ => mp.trackCharge(amount ?? -1));
      } else {
        return mp.track(action.type, {
          kind: action.payload.kind
        });
      }
    //
    // Wallet / payment failure actions (reason in the payload)
    //
    case getType(addWalletCreditCardFailure):
      return mp.track(action.type, {
        reason: action.payload.kind,
        // only GENERIC_ERROR could have details of the error
        error:
          action.payload.kind === "GENERIC_ERROR"
            ? action.payload.reason
            : "n/a"
      });
    case getType(addWalletNewCreditCardFailure):
      return mp.track(action.type);

    case getType(paymentAttiva.failure):
    case getType(paymentVerifica.failure):
    case getType(paymentIdPolling.failure):
    case getType(paymentCheck.failure):
      return mp.track(action.type, {
        reason: action.payload
      });

    // Messages actions with properties
    case getType(removeMessages): {
      return mp.track(action.type, {
        messagesIdsToRemoveFromCache: action.payload
      });
    }
    case getType(setMessageReadState): {
      if (action.payload.read === true) {
        setInstabugUserAttribute("lastSeenMessageID", action.payload.id);
      }
      return mp.track(action.type, action.payload);
    }

    // instabug
    case getType(instabugReportClosed):
    case getType(instabugReportOpened):
      return mp.track(action.type, action.payload);

    // logout / load message / failure
    case getType(upsertUserDataProcessing.failure):
    case getType(loadMessage.failure):
    case getType(logoutFailure):
    case getType(loadServiceDetail.failure):
    case getType(loadServiceMetadata.failure):
      return mp.track(action.type, {
        reason: action.payload.error.message
      });
    // Failures with reason as Error and optional description
    case getType(cieAuthenticationError):
      return mp.track(action.type, action.payload);
    // Failures with reason as Error
    case getType(sessionInformationLoadFailure):
    case getType(profileLoadFailure):
    case getType(profileUpsert.failure):
    case getType(userMetadataUpsert.failure):
    case getType(userMetadataLoad.failure):
    case getType(loginFailure):
    case getType(loadMessages.failure):
    case getType(loadVisibleServices.failure):
    case getType(refreshPMTokenWhileAddCreditCard.failure):
    case getType(deleteWalletFailure):
    case getType(setFavouriteWalletFailure):
    case getType(fetchTransactionsFailure):
    case getType(paymentFetchPspsForPaymentId.failure):
    case getType(paymentDeletePayment.failure):
    case getType(paymentUpdateWalletPsp.failure):
    case getType(paymentExecuteStart.failure):
    case getType(updateNotificationInstallationFailure):
    //  Bonus vacanze
    case getType(loadAllBonusActivations.failure):
    case getType(loadAvailableBonuses.failure):
      return mp.track(action.type, {
        reason: action.payload.message
      });
    // track when a missing municipality is detected
    case getType(contentMunicipalityLoad.failure):
      return mp.track(action.type, {
        reason: action.payload.error.message,
        codice_catastale: action.payload.codiceCatastale
      });
    // download / delete profile
    case getType(upsertUserDataProcessing.success):
      return mp.track(action.type, action.payload);

    //
    // Actions (without properties)
    //
    // authentication
    case getType(analyticsAuthenticationStarted):
    case getType(analyticsAuthenticationCompleted):
    case getType(loginSuccess):
    case getType(sessionInformationLoadSuccess):
    case getType(sessionExpired):
    case getType(sessionInvalid):
    case getType(logoutSuccess):
    // identification
    case getType(identificationRequest):
    case getType(identificationStart):
    case getType(identificationCancel):
    case getType(identificationSuccess):
    case getType(identificationFailure):
    case getType(identificationPinReset):
    case getType(identificationForceLogout):
    // onboarding
    case getType(analyticsOnboardingStarted):
    case getType(createPinSuccess):
    case getType(updatePin):
    // profile
    case getType(profileUpsert.success):
    case getType(profileLoadSuccess):
    // userMetadata
    case getType(userMetadataUpsert.request):
    case getType(userMetadataUpsert.success):
    case getType(userMetadataLoad.request):
    case getType(userMetadataLoad.success):
    // messages
    case getType(loadMessages.request):
    case getType(loadMessagesCancel):
    // services
    case getType(loadVisibleServices.request):
    case getType(loadVisibleServices.success):
    case getType(loadServiceDetail.request):
    case getType(loadServiceDetail.success):
    case getType(loadServiceMetadata.request):
    case getType(loadServiceMetadata.success):
    // wallet
    case getType(addWalletCreditCardInit):
    case getType(addWalletCreditCardRequest):
    case getType(addWalletNewCreditCardSuccess):
    case getType(creditCardCheckout3dsRequest):
    case getType(creditCardCheckout3dsSuccess):
    case getType(deleteWalletRequest):
    case getType(deleteWalletSuccess):
    case getType(setFavouriteWalletRequest):
    case getType(setFavouriteWalletSuccess):
    case getType(fetchTransactionsRequest):
    case getType(refreshPMTokenWhileAddCreditCard.request):
    case getType(refreshPMTokenWhileAddCreditCard.success):
    // payment
    case getType(abortRunningPayment):
    case getType(paymentInitializeState):
    case getType(paymentAttiva.success):
    case getType(paymentIdPolling.request):
    case getType(paymentIdPolling.success):
    case getType(paymentCheck.request):
    case getType(paymentCheck.success):
    case getType(paymentFetchPspsForPaymentId.request):
    case getType(paymentFetchPspsForPaymentId.success):
    case getType(paymentExecuteStart.request):
    case getType(paymentExecuteStart.success):
    case getType(paymentUpdateWalletPsp.request):
    case getType(paymentUpdateWalletPsp.success):
    case getType(paymentCompletedFailure):
    case getType(paymentDeletePayment.request):
    case getType(paymentDeletePayment.success):
    //  profile First time Login
    case getType(profileFirstLogin):
    // other
    case getType(loadMessage.success):
    case getType(updateNotificationsInstallationToken):
    // bonus vacanze
    case getType(loadAllBonusActivations.request):
    case getType(loadAllBonusActivations.success):
    case getType(loadAvailableBonuses.success):
    case getType(loadAvailableBonuses.request):
      return mp.track(action.type);

    case getType(deleteUserDataProcessing.request):
      return mp.track(action.type, { choice: action.payload });
    case getType(removeAccountMotivation):
    case getType(deleteUserDataProcessing.success):
      return mp.track(action.type, action.payload);
    case getType(deleteUserDataProcessing.failure):
      return mp.track(action.type, {
        choice: action.payload.choice,
        reason: action.payload.error.message
      });
    case getType(setMixpanelEnabled):
      return mp.track(action.type, {
        value: action.payload
      });
  }
  return Promise.resolve();
};

export const reactotronLogger = (_: MiddlewareAPI) => (next: Dispatch) => (
  action: Action
): Action => {
  if (
    action.type.toLowerCase().endsWith("failure") &&
    (action as any).payload
  ) {
    RTron?.logImportant?.(
      action.type,
      getError((action as any).payload).message
    );
  }
  return next(action);
};

/*
 * The middleware acts as a general hook in order to track any meaningful action
 */
export const actionTracking = (_: MiddlewareAPI) => (next: Dispatch) => (
  action: Action
): Action => {
  if (mixpanel !== undefined) {
    // call mixpanel tracking only after we have initialized mixpanel with the
    // API token
    void trackAction(mixpanel)(action);
    void trackBpdAction(mixpanel)(action);
    void trackBancomatAction(mixpanel)(action);
    void trackSatispayAction(mixpanel)(action);
    void trackBPayAction(mixpanel)(action);
    void trackCoBadgeAction(mixpanel)(action);
    void trackPrivativeAction(mixpanel)(action);
    void trackCgnAction(mixpanel)(action);
    void trackContentAction(mixpanel)(action);
    void trackEuCovidCertificateActions(mixpanel)(action);
  }
  return next(action);
};

/*
  The middleware acts as a general hook in order to track any meaningful navigation action
  https://reactnavigation.org/docs/1.x/screen-tracking/#screen-tracking-with-redux
*/
export function screenTracking(
  store: MiddlewareAPI
): (_: Dispatch) => (__: Action) => Action {
  return (next: Dispatch): ((_: Action) => Action) => (
    action: Action
  ): Action => {
    if (
      action.type !== NavigationActions.NAVIGATE &&
      action.type !== NavigationActions.BACK
    ) {
      return next(action);
    }
    const currentScreen = getCurrentRouteName(store.getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRouteName(store.getState().nav);
    if (nextScreen !== currentScreen && mixpanel) {
      if (nextScreen) {
        setInstabugUserAttribute("activeScreen", nextScreen);
      }
      // track only those events that are not included in the blacklist
      if (nextScreen && !noAnalyticsRoutes.has(nextScreen)) {
        void mixpanel.track("SCREEN_CHANGE_V2", {
          SCREEN_NAME: nextScreen
        });
      }
      // sent to 10-days retention project
      void mixpanel.track("SCREEN_CHANGE", {
        SCREEN_NAME: nextScreen
      });
    }
    return result;
  };
}
