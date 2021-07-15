import { fromNullable } from "fp-ts/lib/Option";
import { PaymentNetworkEnum } from "../../definitions/pagopa/walletv2/PaymentInstrument";
import defaultCardIcon from "../../img/wallet/cards-icons/unknown.png";

export const cardIcons: { [key in PaymentNetworkEnum]: any } = {
  MAESTRO: require("../../img/wallet/cards-icons/maestro.png"),
  MASTERCARD: require("../../img/wallet/cards-icons/mastercard.png"),
  VISA_ELECTRON: require("../../img/wallet/cards-icons/visa-electron.png"),
  VISA_CLASSIC: require("../../img/wallet/cards-icons/visa.png"),
  VPAY: require("../../img/wallet/cards-icons/vPay.png")
};

export const getCardIconFromPaymentNetwork = (
  brand: PaymentNetworkEnum | undefined
) => fromNullable(brand).fold(defaultCardIcon, b => cardIcons[b]);

const sumNumbers = (sum: number, current: number): number => sum + current;

const MIN_CARD_LENGTH = 12; // The card with the shortest length is the 12-digit Maestro UK
const MAX_AMEX_CARD_LENGTH = 15;
const isAmexCard = /^3[47][0-9]{13}$/;

export const luhnValidateCCN = (creditCard: string): boolean => {
  if (
    creditCard.length < MIN_CARD_LENGTH ||
    (isAmexCard.test(creditCard) && creditCard.length > MAX_AMEX_CARD_LENGTH)
  ) {
    return false;
  }
  // convert the card number in an array of numbers
  const cardNumbers = creditCard.split("").map(x => +x);

  // apply the luhn algorithm to the number of the cc
  const luhnSum = cardNumbers
    .slice()
    .reverse()
    .map((number, index) => {
      if (index % 2 !== 0) {
        const double = number * 2;
        // if number has 2 digits subtract 9 to get the sum of the digits
        if (double > 9) {
          return double - 9;
        }
        return double;
      }
      return number;
    })
    .reduce(sumNumbers, 0);
  return luhnSum % 10 === 0;
};

export const validateCVV = (creditCard: string, cvv: string): boolean => {
  if (isAmexCard.test(creditCard)) {
    // American express and cvv is 4 digits
    if (cvv.length === 4) {
      return true;
    }
  } else if (cvv.length === 3) {
    // Other card & cvv is 3 digits
    return true;
  }
  return false;
};
