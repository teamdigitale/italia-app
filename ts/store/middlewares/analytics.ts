/* eslint-disable no-fallthrough */
// disabled in order to allows comments between the switch
import { constNull } from "fp-ts/lib/function";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import { NavigationActions } from "react-navigation";
import { getType } from "typesafe-actions";
import { setInstabugUserAttribute } from "../../boot/configureInstabug";
import {
  activateBonusVacanze,
  cancelBonusVacanzeRequest,
  checkBonusVacanzeEligibility,
  loadAllBonusActivations,
  loadAvailableBonuses,
  storeEligibilityRequestId
} from "../../features/bonus/bonusVacanze/store/actions/bonusVacanze";
import {
  isActivationResponseTrackable,
  isEligibilityResponseTrackable
} from "../../features/bonus/bonusVacanze/utils/bonus";
import { trackBPayAction } from "../../features/wallet/onboarding/bancomatPay/analytics";
import { trackCoBadgeAction } from "../../features/wallet/onboarding/cobadge/analytics";
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
  paymentAttiva,
  paymentCheck,
  paymentCompletedFailure,
  paymentCompletedSuccess,
  paymentDeletePayment,
  paymentFetchPspsForPaymentId,
  paymentIdPolling,
  paymentInitializeState,
  paymentUpdateWalletPsp,
  paymentVerifica
} from "../actions/wallet/payment";
import {
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess
} from "../actions/wallet/transactions";
import {
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
  payCreditCardVerificationFailure,
  payCreditCardVerificationSuccess,
  setFavouriteWalletFailure,
  setFavouriteWalletRequest,
  setFavouriteWalletSuccess
} from "../actions/wallet/wallets";

import trackBpdAction from "../../features/bonus/bpd/analytics/index";
import trackBancomatAction from "../../features/wallet/onboarding/bancomat/analytics/index";
import trackSatispayAction from "../../features/wallet/satispay/analytics/index";

// eslint-disable-next-line complexity
const trackAction = (mp: NonNullable<typeof mixpanel>) => (
  action: Action
): Promise<any> => {
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
    case getType(profileLoadSuccess):
      // as soon as we have the user fiscal code, attach the mixpanel
      // session to the hashed fiscal code of the user
      const fiscalnumber = action.payload.fiscal_code;

      // Re-identify the user using the hashed fiscal code.
      // It's important the flow order and the order in which the arguments are passed to the
      // mp.alias function because the second argument is the 'Main ID' for mixpanel so the events
      // will be showned in the Main ID page.
      const identifyAndAlias = sha256(fiscalnumber).then(hash =>
        mp.identify(hash).then(() => mp.alias(DeviceInfo.getUniqueId(), hash))
      );

      return Promise.all([
        mp.track(action.type).then(constNull, constNull),
        identifyAndAlias.then(constNull, constNull)
      ]);

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
    //
    // wallets success / services load requests
    //
    case getType(loadServicesDetail):
      return mp.track(action.type, {
        count: action.payload.length
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
    // @deprecated
    case getType(payCreditCardVerificationFailure):
    case getType(deleteWalletFailure):
    case getType(setFavouriteWalletFailure):
    case getType(fetchTransactionsFailure):
    case getType(paymentFetchPspsForPaymentId.failure):
    case getType(paymentDeletePayment.failure):
    case getType(paymentUpdateWalletPsp.failure):
    case getType(updateNotificationInstallationFailure):
    //  Bonus vacanze
    case getType(loadAllBonusActivations.failure):
    case getType(loadAvailableBonuses.failure):
    case getType(checkBonusVacanzeEligibility.failure):
    case getType(activateBonusVacanze.failure):
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
    // userMetadata
    case getType(userMetadataUpsert.request):
    case getType(userMetadataUpsert.success):
    case getType(userMetadataLoad.request):
    case getType(userMetadataLoad.success):
    // messages
    case getType(loadMessages.request):
    case getType(loadMessages.success):
    case getType(loadMessagesCancel):
    case getType(loadMessage.success):
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
    // @deprecated
    case getType(payCreditCardVerificationSuccess):
    case getType(creditCardCheckout3dsRequest):
    case getType(creditCardCheckout3dsSuccess):
    case getType(deleteWalletRequest):
    case getType(deleteWalletSuccess):
    case getType(setFavouriteWalletRequest):
    case getType(setFavouriteWalletSuccess):
    case getType(fetchTransactionsRequest):
    // payment
    case getType(paymentInitializeState):
    case getType(paymentAttiva.success):
    case getType(paymentIdPolling.request):
    case getType(paymentIdPolling.success):
    case getType(paymentCheck.request):
    case getType(paymentCheck.success):
    case getType(paymentFetchPspsForPaymentId.request):
    case getType(paymentFetchPspsForPaymentId.success):

    case getType(paymentUpdateWalletPsp.request):
    case getType(paymentUpdateWalletPsp.success):
    case getType(paymentCompletedFailure):
    case getType(paymentDeletePayment.request):
    case getType(paymentDeletePayment.success):

    //  profile First time Login
    case getType(profileFirstLogin):
    // other
    case getType(updateNotificationsInstallationToken):
    // bonus vacanze
    case getType(loadAllBonusActivations.request):
    case getType(loadAllBonusActivations.success):
    case getType(loadAvailableBonuses.success):
    case getType(loadAvailableBonuses.request):
    case getType(checkBonusVacanzeEligibility.request):
    case getType(cancelBonusVacanzeRequest):
    case getType(storeEligibilityRequestId):
      return mp.track(action.type);

    // bonus vacanze
    case getType(checkBonusVacanzeEligibility.success):
      if (isEligibilityResponseTrackable(action.payload)) {
        return mp.track(action.type, {
          status: action.payload.status
        });
      }
      break;
    case getType(activateBonusVacanze.success):
      if (isActivationResponseTrackable(action.payload)) {
        return mp.track(action.type, {
          status: action.payload.status
        });
      }
      break;
    case getType(removeAccountMotivation):
    case getType(deleteUserDataProcessing.request):
    case getType(deleteUserDataProcessing.success):
      return mp.track(action.type, action.payload);
    case getType(deleteUserDataProcessing.failure):
      return mp.track(action.type, {
        choice: action.payload.choice,
        reason: action.payload.error.message
      });
  }
  return Promise.resolve();
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
      mixpanel
        .track("SCREEN_CHANGE", {
          SCREEN_NAME: nextScreen
        })
        .then(
          () => 0,
          () => 0
        );
    }
    return result;
  };
}
