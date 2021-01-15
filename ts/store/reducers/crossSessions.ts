/**
 * this state / reducer represents and handles all those data should be kept across multiple users sessions
 */
import { FiscalCode, NonEmptyString } from "italia-ts-commons/lib/strings";
import { isActionOf } from "typesafe-actions";
import { createSelector } from "reselect";
import { fromNullable } from "fp-ts/lib/Option";
import sha from "sha.js";
import { Action } from "../actions/types";
import { setProfileHashedFiscalCode } from "../actions/crossSessions";
import { GlobalState } from "./types";

type HashedFiscalCode = NonEmptyString | undefined;
export type CrossSessionsState = {
  hashedFiscalCode: HashedFiscalCode;
};

const INITIAL_STATE: CrossSessionsState = {
  hashedFiscalCode: undefined
};

const hash = (value: string): string =>
  sha("sha256").update(value).digest("hex");

const reducer = (
  state: CrossSessionsState = INITIAL_STATE,
  action: Action
): CrossSessionsState => {
  if (isActionOf(setProfileHashedFiscalCode, action)) {
    return {
      ...state,
      hashedFiscalCode: hash(action.payload) as NonEmptyString
    };
  }
  return state;
};

// return the stored hashed fiscal code
export const hashedProfileFiscalCodeSelector = (
  state: GlobalState
): HashedFiscalCode => state.crossSessions.hashedFiscalCode;

/**
 * return true if the given fiscal code is different from the hashed stored one
 * if there is no stored hashed fiscal code it returns false (cant say if they are different)
 */
export const isDifferentFiscalCodeSelector = (
  state: GlobalState,
  fiscalCode: FiscalCode
) =>
  createSelector(
    hashedProfileFiscalCodeSelector,
    (hashedProfile: HashedFiscalCode): boolean =>
      fromNullable(hashedProfile)
        .map(hp => hp !== hash(fiscalCode))
        .getOrElse(false)
  )(state);

export default reducer;
