import { StackNavigator } from "react-navigation";
import { AddPaymentMethodScreen } from "../screens/wallet/AddPaymentMethodScreen";
import {CreditCardsScreen} from "../screens/wallet/CreditCardsScreen";
import TransactionDetailsScreen from "../screens/wallet/TransactionDetailsScreen";
import TransactionsScreen from "../screens/wallet/TransactionsScreen";
import WalletHomeScreen from "../screens/wallet/WalletHomeScreen";
import ROUTES from "./routes";
import { ManuallyIdentifyTransactionScreen } from "../screens/wallet/ManuallyIdentifyTransactionScreen";

/**
 * TODO: migrate WALLET_TRANSACTION_SUMMARY on a new navigator for screens which does not visualize the footer menu.
 */
const WalletNavigator = StackNavigator(
  {
    [ROUTES.WALLET_HOME]: {
      screen: WalletHomeScreen
    },
    [ROUTES.WALLET_CREDITCARDS]: {
      screen: CreditCardsScreen
    },
    [ROUTES.WALLET_ADD_PAYMENT_METHOD]: {
      screen: AddPaymentMethodScreen
    },
    [ROUTES.WALLET_TRANSACTION_DETAILS]: {
      screen: TransactionDetailsScreen
    },
    [ROUTES.WALLET_CARD_TRANSACTIONS]: {
      screen: TransactionsScreen
    },
    [ROUTES.WALLET_MANUAL_TRANSACTION_IDENTIFICATION]: {
      screen: ManuallyIdentifyTransactionScreen
    }
  },
  {
    // Let each screen handle the header and navigation
    headerMode: "none"
  }
);

export default WalletNavigator;
