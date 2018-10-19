import {
  NavigationAction,
  NavigationActions,
  NavigationResetAction,
  NavigationState,
  StackActions
} from "react-navigation";
import { ActionType, createStandardAction } from "typesafe-actions";

import { InferNavigationParams } from "../../types/react";

import ROUTES from "../../navigation/routes";

import { MessageDetailScreen } from "../../screens/messages/MessageDetailScreen";
import AddCardScreen from "../../screens/wallet/AddCardScreen";
import AddPaymentMethodScreen from "../../screens/wallet/AddPaymentMethodScreen";
import Checkout3DsScreen from "../../screens/wallet/Checkout3DsScreen";
import ConfirmCardDetailsScreen from "../../screens/wallet/ConfirmCardDetailsScreen";
import ConfirmPaymentMethodScreen from "../../screens/wallet/payment/ConfirmPaymentMethodScreen";
import PickPaymentMethodScreen from "../../screens/wallet/payment/PickPaymentMethodScreen";
import PickPspScreen from "../../screens/wallet/payment/PickPspScreen";
import TransactionSummaryScreen from "../../screens/wallet/payment/TransactionSummaryScreen";
import TransactionDetailsScreen from "../../screens/wallet/TransactionDetailsScreen";
import TransactionsScreen from "../../screens/wallet/TransactionsScreen";

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

export const navigateToOnboardingPinScreenAction = NavigationActions.navigate({
  routeName: ROUTES.ONBOARDING,
  action: NavigationActions.navigate({ routeName: ROUTES.ONBOARDING_PIN })
});

export const navigateToTosScreen = NavigationActions.navigate({
  routeName: ROUTES.ONBOARDING,
  action: NavigationActions.navigate({ routeName: ROUTES.ONBOARDING_TOS })
});

export const navigateToPinLogin = NavigationActions.navigate({
  routeName: ROUTES.PIN_LOGIN,
  key: undefined
});

export const navigateToBackgroundScreen = NavigationActions.navigate({
  routeName: ROUTES.BACKGROUND
});

export const navigateBack = NavigationActions.back;

export const navigateToMessageDetailScreenAction = (
  params: InferNavigationParams<typeof MessageDetailScreen>
) =>
  StackActions.reset({
    key: "StackRouterRoot",
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: ROUTES.MAIN,
        action: NavigationActions.navigate({
          routeName: ROUTES.MESSAGES_NAVIGATOR,
          action: NavigationActions.navigate({
            routeName: ROUTES.MESSAGE_DETAIL,
            params
          })
        })
      })
    ]
  });

export const navigateToPaymentTransactionSummaryScreen = (
  params: InferNavigationParams<typeof TransactionSummaryScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_TRANSACTION_SUMMARY,
    params
  });

export const navigateToPaymentPickPaymentMethodScreen = (
  params: InferNavigationParams<typeof PickPaymentMethodScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_PICK_PAYMENT_METHOD,
    params
  });

// TODO: this should use StackActions.reset
// to reset the navigation. Right now, the
// "back" option is not allowed -- so the user cannot
// get back to previous screens, but the navigation
// stack should be cleaned right here
// @https://www.pivotaltracker.com/story/show/159300579
export const navigateToTransactionDetailsScreen = (
  params: InferNavigationParams<typeof TransactionDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_TRANSACTION_DETAILS,
    params
  });

export const navigateToWalletCheckout3dsScreen = (
  params: InferNavigationParams<typeof Checkout3DsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_CHECKOUT_3DS_SCREEN,
    params
  });

export const navigateToWalletTransactionsScreen = (
  params: InferNavigationParams<typeof TransactionsScreen>
) =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_CARD_TRANSACTIONS,
    params
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

export const navigateToWalletHome = () =>
  NavigationActions.navigate({
    routeName: ROUTES.WALLET_HOME
  });

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

export const navigateToPaymentManualDataInsertion = () =>
  NavigationActions.navigate({
    routeName: ROUTES.PAYMENT_MANUAL_DATA_INSERTION
  });
