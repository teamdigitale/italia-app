import {
  NavigationAction,
  NavigationActions,
  NavigationResetAction,
  NavigationState,
  StackActions
} from "react-navigation";
import { ActionType, createStandardAction } from "typesafe-actions";
import ROUTES from "../../navigation/routes";
import CieCardReaderScreen from "../../screens/authentication/cie/CieCardReaderScreen";
import { MessageDetailScreen } from "../../screens/messages/MessageDetailScreen";
import FingerprintScreen from "../../screens/onboarding/FingerprintScreen";
import ServiceDetailsScreen from "../../screens/services/ServiceDetailsScreen";
import AddCardScreen from "../../screens/wallet/AddCardScreen";
import AddCreditCardOutcomeCodeMessage from "../../screens/wallet/AddCreditCardOutcomeCodeMessage";
import AddPaymentMethodScreen from "../../screens/wallet/AddPaymentMethodScreen";
import ConfirmCardDetailsScreen from "../../screens/wallet/ConfirmCardDetailsScreen";
import CreditCardOnboardingAttemptDetailScreen from "../../screens/wallet/creditCardOnboardingAttempts/CreditCardOnboardingAttemptDetailScreen";
import ConfirmPaymentMethodScreen from "../../screens/wallet/payment/ConfirmPaymentMethodScreen";
import ManualDataInsertionScreen from "../../screens/wallet/payment/ManualDataInsertionScreen";
import PickPaymentMethodScreen from "../../screens/wallet/payment/PickPaymentMethodScreen";
import PickPspScreen from "../../screens/wallet/payment/PickPspScreen";
import TransactionErrorScreen from "../../screens/wallet/payment/TransactionErrorScreen";
import TransactionSuccessScreen from "../../screens/wallet/payment/TransactionSuccessScreen";
import TransactionSummaryScreen from "../../screens/wallet/payment/TransactionSummaryScreen";
import PaymentHistoryDetailsScreen from "../../screens/wallet/PaymentHistoryDetailsScreen";
import TransactionDetailsScreen from "../../screens/wallet/TransactionDetailsScreen";
import PaymentMethodDetailScreen from "../../screens/wallet/PaymentMethodDetailScreen";
import WalletHomeScreen from "../../screens/wallet/WalletHomeScreen";
import {
  BancomatPaymentMethod,
  BPayPaymentMethod,
  CreditCardPaymentMethod,
  PrivativePaymentMethod,
  SatispayPaymentMethod
} from "../../types/pagopa";
import { InferNavigationParams } from "../../types/react";
import OnboardingServicesPreferenceScreen from "../../screens/onboarding/OnboardingServicesPreferenceScreen";

export const navigationRestore = createStandardAction("NAVIGATION_RESTORE")<
  NavigationState
>();

export type NavigationActions =
  | NavigationAction
  | ActionType<typeof navigationRestore>;

export const resetToAuthenticationRoute: NavigationResetAction = StackActions.reset(
  {
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({
        routeName: ROUTES.AUTHENTICATION
      })
    ]
  }
);

export const navigateToMainNavigatorAction = StackActions.reset({
  key: "StackRouterRoot",
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: ROUTES.MAIN
    })
  ]
});

export const navigateBack = NavigationActions.back;

/**
 * Authentication
 */

export const navigateToIdpSelectionScreenAction = NavigationActions.navigate({
  routeName: ROUTES.AUTHENTICATION,
  action: NavigationActions.navigate({
    routeName: ROUTES.AUTHENTICATION_IDP_SELECTION
  })
});

export const navigateToOnboardingPinScreenAction = NavigationActions.navigate({
  routeName: ROUTES.ONBOARDING,
  action: NavigationActions.navigate({ routeName: ROUTES.ONBOARDING_PIN })
});

export const navigateToOnboardingFingerprintScreenAction = (
  params: InferNavigationParams<typeof FingerprintScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.ONBOARDING_FINGERPRINT,
    params
  });

export const navigateToTosScreen = NavigationActions.navigate({
  routeName: ROUTES.ONBOARDING,
  action: NavigationActions.navigate({ routeName: ROUTES.ONBOARDING_TOS })
});

export const navigateToOnboardingServicePreferenceCompleteAction = () =>
  NavigationActions.navigate({
    routeName: ROUTES.ONBOARDING_SERVICES_PREFERENCE_COMPLETE
  });

export const navigateToServicesPreferenceModeSelectionScreen = (
  params: InferNavigationParams<typeof OnboardingServicesPreferenceScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.ONBOARDING_SERVICES_PREFERENCE,
    params
  });

/**
 * Email
 */

export const navigateToEmailReadScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.READ_EMAIL_SCREEN
  });

export const navigateToEmailInsertScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.INSERT_EMAIL_SCREEN
  });

/**
 * Message
 */

export const navigateToMessageDetailScreenAction = (
  params: InferNavigationParams<typeof MessageDetailScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.MESSAGE_DETAIL,
    params
  });

export const navigateToMessageRouterScreen = (
  params: InferNavigationParams<typeof MessageDetailScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.MESSAGE_ROUTER,
    params
  });

/**
 * Service
 */

export const navigateToServiceHomeScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.SERVICES_HOME
  });

export const navigateToServiceDetailsScreen = (
  params: InferNavigationParams<typeof ServiceDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.SERVICE_DETAIL,
    params
  });

/**
 * Profile
 */

export const navigateToEmailForwardingPreferenceScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_PREFERENCES_EMAIL_FORWARDING
  });

export const navigateToServicePreferenceScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_PREFERENCES_SERVICES
  });

export const navigateToCalendarPreferenceScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_PREFERENCES_CALENDAR
  });

export const navigateToLanguagePreferenceScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_PREFERENCES_LANGUAGE
  });

export const navigateToLogout = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_LOGOUT
  });

export const navigateToRemoveAccountSuccess = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_REMOVE_ACCOUNT_SUCCESS
  });

export const navigateToRemoveAccountDetailScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_REMOVE_ACCOUNT_DETAILS
  });

export const navigateToPrivacyScreen = NavigationActions.navigate({
  routeName: ROUTES.PROFILE_PRIVACY_MAIN,
  action: NavigationActions.navigate({ routeName: ROUTES.PROFILE_PRIVACY_MAIN })
});

export const navigateToPrivacyShareData = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PROFILE_PRIVACY_SHARE_DATA
  });
/**
 * Wallet & Payments
 */

export const navigateToPaymentTransactionSummaryScreen = (
  params: InferNavigationParams<typeof TransactionSummaryScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_TRANSACTION_SUMMARY,
    params
  });

export const navigateToPaymentTransactionErrorScreen = (
  params: InferNavigationParams<typeof TransactionErrorScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_TRANSACTION_ERROR,
    params
  });

export const navigateToPaymentPickPaymentMethodScreen = (
  params: InferNavigationParams<typeof PickPaymentMethodScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_PICK_PAYMENT_METHOD,
    params
  });

export const navigateToTransactionSuccessScreen = (
  params: InferNavigationParams<typeof TransactionSuccessScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_TRANSACTION_SUCCESS,
    params
  });

export const navigateToTransactionDetailsScreen = (
  params: InferNavigationParams<typeof TransactionDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_TRANSACTION_DETAILS,
    params
  });

export const navigateToWalletPaymentMethodDetailScreen = (
  params: InferNavigationParams<typeof PaymentMethodDetailScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_PAYMENT_METHOD_DETAIL,
    params
  });

export const navigateToBancomatDetailScreen = (
  bancomat: BancomatPaymentMethod
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_BANCOMAT_DETAIL,
    params: { bancomat }
  });

export const navigateToSatispayDetailScreen = (
  satispay: SatispayPaymentMethod
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_SATISPAY_DETAIL,
    params: { satispay }
  });

export const navigateToBPayDetailScreen = (bPay: BPayPaymentMethod) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_BPAY_DETAIL,
    params: { bPay }
  });

export const navigateToCobadgeDetailScreen = (
  cobadge: CreditCardPaymentMethod
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_COBADGE_DETAIL,
    params: { cobadge }
  });

export const navigateToPrivativeDetailScreen = (
  privative: PrivativePaymentMethod
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_PRIVATIVE_DETAIL,
    params: { privative }
  });

export const navigateToPaymentPickPspScreen = (
  params: InferNavigationParams<typeof PickPspScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_PICK_PSP,
    params
  });

export const navigateToPaymentConfirmPaymentMethodScreen = (
  params: InferNavigationParams<typeof ConfirmPaymentMethodScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_CONFIRM_PAYMENT_METHOD,
    params
  });

export const navigateToPaymentHistoryDetail = (
  params: InferNavigationParams<typeof PaymentHistoryDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_HISTORY_DETAIL_INFO,
    params
  });

export const navigateToCreditCardOnboardingAttempt = (
  params: InferNavigationParams<typeof CreditCardOnboardingAttemptDetailScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.CREDIT_CARD_ONBOARDING_ATTEMPT_DETAIL,
    params
  });

export const navigateToWalletHome = (
  params?: InferNavigationParams<typeof WalletHomeScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_HOME,
    params
  });

/**
 * @deprecated
 */
export const navigateToWalletList = () =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_LIST
  });

export const navigateToWalletAddPaymentMethod = (
  params: InferNavigationParams<typeof AddPaymentMethodScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_ADD_PAYMENT_METHOD,
    params
  });

export const navigateToWalletAddDigitalPaymentMethod = () =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_ADD_DIGITAL_PAYMENT_METHOD
  });

export const navigateToWalletAddCreditCard = (
  params: InferNavigationParams<typeof AddCardScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_ADD_CARD,
    params
  });

export const navigateToWalletConfirmCardDetails = (
  params: InferNavigationParams<typeof ConfirmCardDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_CONFIRM_CARD_DETAILS,
    params
  });

export const navigateToPaymentScanQrCode = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_SCAN_QR_CODE
  });

export const navigateToPaymentManualDataInsertion = (
  params?: InferNavigationParams<typeof ManualDataInsertionScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_MANUAL_DATA_INSERTION,
    params
  });

export const navigateToAddCreditCardOutcomeCode = (
  params: InferNavigationParams<typeof AddCreditCardOutcomeCodeMessage>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.ADD_CREDIT_CARD_OUTCOMECODE_MESSAGE,
    params
  });

export const navigateToPaymentOutcomeCode = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_OUTCOMECODE_MESSAGE
  });

/**
 * CIE
 */

export const navigateToCieInvalidScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.CIE_EXPIRED_SCREEN
  });

export const navigateToCiePinScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.CIE_PIN_SCREEN
  });

export const navigateToCieCardReaderScreen = (
  params?: InferNavigationParams<typeof CieCardReaderScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.CIE_CARD_READER_SCREEN,
    params
  });

export const navigateToWorkunitGenericFailureScreen = () =>
  NavigationActions.navigate({
    routeName: ROUTES.WORKUNIT_GENERIC_FAILURE
  });

/**
 * SPID
 */
export const navigateToSPIDTestIDP = () =>
  NavigationActions.navigate({
    routeName: ROUTES.AUTHENTICATION_IDP_TEST
  });

export const navigateToSPIDLogin = () =>
  NavigationActions.navigate({
    routeName: ROUTES.AUTHENTICATION_IDP_LOGIN
  });
