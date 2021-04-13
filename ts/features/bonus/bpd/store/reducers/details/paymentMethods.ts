import { fromNullable } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { Action } from "../../../../../../store/actions/types";
import {
  deleteWalletSuccess,
  fetchWalletsRequest,
  fetchWalletsSuccess
} from "../../../../../../store/actions/wallet/wallets";
import { IndexedById } from "../../../../../../store/helpers/indexer";
import { GlobalState } from "../../../../../../store/reducers/types";
import { bpdDeleteUserFromProgram } from "../../actions/onboarding";
import {
  BpdPaymentMethodActivation,
  bpdPaymentMethodActivation,
  BpdPmActivationStatus,
  bpdUpdatePaymentMethodActivation,
  HPan
} from "../../actions/paymentMethods";
import { PaymentMethod } from "../../../../../../types/pagopa";
import { getPaymentMethodHash } from "../../../../../../utils/paymentMethod";

export type BpdPotPaymentMethodActivation = pot.Pot<
  BpdPaymentMethodActivation,
  Error
>;

const readPot = (
  hPan: HPan,
  data: IndexedById<BpdPotPaymentMethodActivation>
): BpdPotPaymentMethodActivation =>
  fromNullable(data[hPan]).getOrElse(pot.none);

export const getPaymentStatus = (value: boolean): BpdPmActivationStatus =>
  value ? "active" : "inactive";

/**
 * This reducer keep the activation state and the upsert request foreach payment method,
 * grouped by hPan.
 * Foreach hPan there is a {@link BpdPotPaymentMethodActivation} containing the related bpd activation information.
 * TODO: refactor with the common function in IndexedByIdPot
 * @param state
 * @param action
 */
export const bpdPaymentMethodsReducer = (
  state: IndexedById<BpdPotPaymentMethodActivation> = {},
  action: Action
): IndexedById<BpdPotPaymentMethodActivation> => {
  switch (action.type) {
    case getType(bpdPaymentMethodActivation.request):
      return { ...state, [action.payload]: pot.noneLoading };
    case getType(bpdPaymentMethodActivation.success):
      return {
        ...state,
        [action.payload.hPan]: pot.some(action.payload)
      };
    case getType(bpdPaymentMethodActivation.failure):
      return {
        ...state,
        [action.payload.hPan]: pot.toError(
          readPot(action.payload.hPan, state),
          action.payload.error
        )
      };
    case getType(bpdUpdatePaymentMethodActivation.request):
      const updateRequest = readPot(action.payload.hPan, state);
      // write the candidate activationStatus, preserving all the others fields
      return {
        ...state,
        [action.payload.hPan]: pot.toUpdating(updateRequest, {
          ...(pot.isSome(updateRequest)
            ? updateRequest.value
            : { hPan: action.payload.hPan }),
          activationStatus: getPaymentStatus(action.payload.value)
        })
      };
    case getType(bpdUpdatePaymentMethodActivation.success):
      return { ...state, [action.payload.hPan]: pot.some(action.payload) };
    case getType(bpdUpdatePaymentMethodActivation.failure):
      const updateFailure = readPot(action.payload.hPan, state);
      return {
        ...state,
        [action.payload.hPan]: pot.toError(updateFailure, action.payload.error)
      };
    case getType(bpdDeleteUserFromProgram.success):
    case getType(fetchWalletsSuccess):
    case getType(deleteWalletSuccess):
      // if the user remove a payment method, we need to invalidate all the store
      // because deleteWalletSuccess have Walletv1 as payload (without hash)
      return {};
  }
  return state;
};

/**
 * The raw selection of the bpd activation status for a payment method
 * @param state
 * @param hPan
 */
const bpdPaymentMethodActivationByHPanValue = (
  state: GlobalState,
  hPan: HPan
): pot.Pot<BpdPaymentMethodActivation, Error> | undefined =>
  state.bonus.bpd.details.paymentMethods[hPan];

/**
 * Return all the activation states for payment methods, memoized
 */
export const bpdPaymentMethodActivationSelector = createSelector<
  GlobalState,
  IndexedById<BpdPotPaymentMethodActivation>,
  IndexedById<BpdPotPaymentMethodActivation>
>(
  [(state: GlobalState) => state.bonus.bpd.details.paymentMethods],
  paymentMethod => paymentMethod
);

/**
 * Return the pot representing the bpd activation status for a payment method.
 * It's wrapped with createSelector in order to memoize the value and avoid recalculation
 * when the state change.
 */
export const bpdPaymentMethodValueSelector = createSelector(
  [bpdPaymentMethodActivationByHPanValue],
  potValue => potValue ?? pot.none
);

/**
 * Return true if at least one method from the given ones is BPD active
 * @param paymentMethods
 */
export const areAnyPaymentMethodsActiveSelector = (
  paymentMethods: ReadonlyArray<PaymentMethod>
) =>
  createSelector(
    [bpdPaymentMethodActivationSelector],
    (bpdPaymentMethodsActivation): boolean => {
      const paymentMethodsHash = paymentMethods.map(getPaymentMethodHash);
      return paymentMethodsHash.some(pmh =>
        fromNullable(pmh)
          .mapNullable(h => bpdPaymentMethodsActivation[h])
          .map(potActivation =>
            pot.getOrElse(
              pot.map(potActivation, p => p.activationStatus === "active"),
              false
            )
          )
          .getOrElse(false)
      );
    }
  );
