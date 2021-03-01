// bonus reducer
import { getType } from "typesafe-actions";
import { createSelector } from "reselect";
import { Action } from "../../../../../store/actions/types";
import {
  cgnActivationStatus,
  cgnRequestActivation
} from "../actions/activation";
import { CgnActivationDetail } from "../../../../../../definitions/cgn/CgnActivationDetail";
import { GlobalState } from "../../../../../store/reducers/types";

export enum CgnActivationProgressEnum {
  "UNDEFINED" = "UNDEFINED",
  "TIMEOUT" = "TIMEOUT", // number of polling exceeded
  "PROGRESS" = "PROGRESS", // The request is started
  "PENDING" = "PENDING", // Polling time exceeded
  "ERROR" = "ERROR", // There's an error
  "EXISTS" = "EXISTS", // Another bonus related to this user was found
  "INELIGIBLE" = "INELIGIBLE", // Another bonus related to this user was found
  "SUCCESS" = "SUCCESS" // Activation has been completed
}

export type ActivationState = {
  status: CgnActivationProgressEnum;
  value?: CgnActivationDetail;
};

const INITIAL_STATE: ActivationState = {
  status: CgnActivationProgressEnum.UNDEFINED
};

const reducer = (
  state: ActivationState = INITIAL_STATE,
  action: Action
): ActivationState => {
  switch (action.type) {
    // bonus activation
    case getType(cgnRequestActivation.request):
    case getType(cgnActivationStatus.request):
      return {
        ...state,
        status: CgnActivationProgressEnum.PROGRESS
      };
    case getType(cgnActivationStatus.success):
      return {
        ...state,
        status: action.payload.status,
        value: action.payload.activation
      };
    case getType(cgnActivationStatus.failure):
      return {
        ...state,
        status: CgnActivationProgressEnum.ERROR
      };
  }
  return state;
};

// Selectors
export const activationSelector = (state: GlobalState): ActivationState =>
  state.bonus.cgn.activation;

export const isCgnActivationLoading = createSelector<
  GlobalState,
  ActivationState,
  boolean
>(
  activationSelector,
  activation => activation.status !== CgnActivationProgressEnum.ERROR
);

export default reducer;
