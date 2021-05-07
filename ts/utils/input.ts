import { Option, none, some } from "fp-ts/lib/Option";
import * as t from "io-ts";
import * as _ from "lodash";
import { PatternString } from "italia-ts-commons/lib/strings";
import { CreditCard } from "../types/pagopa";

const MIN_PAN_DIGITS = 14;
const MAX_PAN_DIGITS = 19;

/**
 * A string that matches credit cards PAN
 *
 * Note: pagoPA's pan may contain '*'s to hide part of the pan
 */
export const CreditCardPan = PatternString(
  `^[0-9\\*]{${MIN_PAN_DIGITS},${MAX_PAN_DIGITS}}$`
);
export type CreditCardPan = t.TypeOf<typeof CreditCardPan>;

/**
 * A string that matches a two digits month number (00-12)
 */
export const CreditCardExpirationMonth = PatternString("^(0[1-9]|1[0-2])$");
export type CreditCardExpirationMonth = t.TypeOf<
  typeof CreditCardExpirationMonth
>;

/**
 * A string that matches a two digits year number (00-99)
 */
// FIXME: check that expiration year is >= current year
// (possibly check month as well if year == current year)
export const CreditCardExpirationYear = PatternString("^[0-9]{2}$");
export type CreditCardExpirationYear = t.TypeOf<
  typeof CreditCardExpirationYear
>;

/**
 * A string that matches a credit card CVC code
 */
export const CreditCardCVC = PatternString("^[0-9]{3,4}$");
export type CreditCardCVC = t.TypeOf<typeof CreditCardCVC>;

export const INITIAL_CARD_FORM_STATE: CreditCardState = {
  pan: none,
  expirationDate: none,
  securityCode: none,
  holder: none
};

export const isValidPan = (pan: Option<string>) =>
  pan.map(pan => CreditCardPan.is(pan)).toUndefined();

export const isValidSecurityCode = (
  securityCode: Option<string>
): boolean | undefined =>
  securityCode
    .map(securityCode => CreditCardCVC.is(securityCode))
    .toUndefined();

export type CreditCardState = Readonly<{
  pan: Option<string>;
  expirationDate: Option<string>;
  securityCode: Option<string>;
  holder: Option<string>;
}>;

export type CreditCardStateKeys = keyof CreditCardState;

/**
 * @param state A pending credit card state objects, containing the card's components.
 * @returns A fp-ts Option containing a valid CreditCard object, if possible
 */
export function getCreditCardFromState(
  state: CreditCardState
): Option<CreditCard> {
  const { pan, expirationDate, securityCode, holder } = state;
  if (
    pan.isNone() ||
    expirationDate.isNone() ||
    securityCode.isNone() ||
    holder.isNone()
  ) {
    return none;
  }

  if (!CreditCardPan.is(pan.value)) {
    // invalid pan
    return none;
  }

  const [expirationMonth, expirationYear] = expirationDate.value.split("/");

  if (
    !CreditCardExpirationMonth.is(expirationMonth) ||
    !CreditCardExpirationYear.is(expirationYear)
  ) {
    // invalid date
    return none;
  }

  if (!CreditCardCVC.is(securityCode.value)) {
    // invalid cvc
    return none;
  }

  if (!isValidCardHolder(holder)) {
    return none;
  }

  const card: CreditCard = {
    pan: pan.value,
    holder: holder.value,
    expireMonth: expirationMonth,
    expireYear: expirationYear,
    securityCode: securityCode.value
  };

  return some(card);
}

/**
 * This function checks if the cardholder charset is admitted.
 * We consider not a valid character an accented character.
 *
 * @param cardHolder
 */
export const isValidCardHolder = (cardHolder: Option<string>): boolean =>
  cardHolder.fold(false, cH => {
    const cardHolderWithoutDiacriticalMarks = _.deburr(cH);
    return cH === cardHolderWithoutDiacriticalMarks;
  });
