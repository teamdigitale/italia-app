import { getType } from "typesafe-actions";
import sha from "sha.js";
import { fromNullable } from "fp-ts/lib/Option";
import { index, take, takeEnd } from "fp-ts/lib/Array";
import { createSelector } from "reselect";
import {
  addWalletCreditCardFailure,
  addWalletCreditCardRequest,
  addWalletCreditCardSuccess,
  addWalletNewCreditCardSuccess,
  creditCardCheckout3dsRedirectionUrls,
  CreditCardFailure,
  payCreditCardVerificationFailure,
  payCreditCardVerificationSuccess
} from "../../actions/wallet/wallets";
import { Action } from "../../actions/types";
import { TransactionResponse } from "../../../types/pagopa";
import { clearCache } from "../../actions/profile";
import { GlobalState } from "../types";

export type CreditCardInsertion = {
  startDate: Date;
  hashedPan: string; // hashed PAN
  blurredPan: string; // anonymized PAN
  expireMonth: string;
  expireYear: string;
  wallet?: {
    idWallet: number;
    idCreditCard?: number;
    brand?: string;
  };
  failureReason?: CreditCardFailure;
  verificationFailureReason?: string;
  verificationTransaction?: TransactionResponse;
  urlHistory3ds?: ReadonlyArray<string>;
  onboardingComplete: boolean;
};

// The state is modeled as a stack on which the last element is added at the head
export type CreditCardInsertionState = ReadonlyArray<CreditCardInsertion>;
export const MAX_HISTORY_LENGTH = 15;

const trimState = (state: CreditCardInsertionState) =>
  take(MAX_HISTORY_LENGTH, [...state]);

/**
 * Given a current state (which is represented by a stack), replace the head with a given item
 *
 * We expect addWalletCreditCardRequest not to be dispatched twice in a row,
 * so the current addWalletCreditCardRequest action refers to the last card added to the history.
 * As we don't pass an idientifer for the case, we have no other method do relate the success action to its request.
 * @param state the stack og items
 * @param updaterFn a functor on an item which transform it according to the change needed
 *
 * @returns the new stack with the head changed
 */
const updateStateHead = (
  state: CreditCardInsertionState,
  updaterFn: (item: CreditCardInsertion) => CreditCardInsertion
) =>
  index<CreditCardInsertion>(0, [...state])
    .map(updaterFn)
    .fold(state, updateItem => {
      const [, ...tail] = state;
      return trimState([
        updateItem,
        ...takeEnd<CreditCardInsertion>(tail.length, tail)
      ]);
    });
const INITIAL_STATE: CreditCardInsertionState = [];
/**
 * card insertion follow these step:
 * 1. request to add a credit card: addWalletCreditCardRequest
 * 2. adding result: addWalletCreditCardSuccess or addWalletCreditCardFailure
 * 3. if 2 is addWalletCreditCardSuccess -> creditCardCheckout3dsRequest
 * 4. creditCardCheckout3dsSuccess
 * 5. credit card payment verification outcome: payCreditCardVerificationSuccess | payCreditCardVerificationFailure
 * 6. addWalletNewCreditCardSuccess completed onboarded (add + pay + checkout)
 * see: https://docs.google.com/presentation/d/1nikV9vNGCFE_9Mxt31ZQuqzQXeJucMW3kdJvtjoBtC4/edit#slide=id.ga4eb40050a_0_4
 *
 * step 1 adds an item into the history.
 * all further steps add their info referring the item in the 0-index position
 * that is the one added in the step 1
 *
 * Please note that actions are meant to be executed in order and the head of the stack is the one to be updated.
 */
const reducer = (
  state: CreditCardInsertionState = INITIAL_STATE,
  action: Action
): CreditCardInsertionState => {
  switch (action.type) {
    case getType(addWalletCreditCardRequest):
      const payload = action.payload;
      return fromNullable(payload.creditcard?.creditCard).fold<
        CreditCardInsertionState
      >(state, c => {
        const hashedPan = sha("sha256").update(c.pan).digest("hex");
        // ensure to have only a single item representing the card insertion
        const newState = state.filter(c => c.hashedPan !== hashedPan);
        const requestedAttempt: CreditCardInsertion = {
          startDate: new Date(),
          hashedPan,
          blurredPan: c.pan.slice(-4),
          expireMonth: c.expireMonth,
          expireYear: c.expireYear,
          onboardingComplete: false
        };
        return trimState([requestedAttempt, ...newState]);
      });
    case getType(addWalletCreditCardSuccess):
      return updateStateHead(state, attempt => {
        const wallet = action.payload.data;
        return {
          ...attempt,
          wallet: {
            idWallet: wallet.idWallet,
            idCreditCard: wallet.creditCard?.id,
            brand: wallet.creditCard?.brand
          }
        };
      });

    case getType(addWalletCreditCardFailure):
      return updateStateHead(state, attempt => ({
        ...attempt,
        failureReason: action.payload
      }));
    case getType(creditCardCheckout3dsRedirectionUrls):
      return updateStateHead(state, attempt => ({
        ...attempt,
        urlHistory3ds: action.payload
      }));

    // @deprecated
    case getType(payCreditCardVerificationSuccess):
      return updateStateHead(state, attempt => ({
        ...attempt,
        verificationTransaction: action.payload
      }));
    // @deprecated
    case getType(payCreditCardVerificationFailure):
      return updateStateHead(state, attempt => ({
        ...attempt,
        verificationFailureReason: action.payload.message ?? "n/a"
      }));

    case getType(addWalletNewCreditCardSuccess):
      return updateStateHead(state, attempt => ({
        ...attempt,
        onboardingComplete: true
      }));
    case getType(clearCache): {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default reducer;

const creditCardAttemptions = (state: GlobalState) =>
  state.payments.creditCardInsertion;

// return the list of credit card onboarding attempts
export const creditCardAttemptionsSelector = createSelector(
  creditCardAttemptions,
  (ca: CreditCardInsertionState): CreditCardInsertionState => ca
);
