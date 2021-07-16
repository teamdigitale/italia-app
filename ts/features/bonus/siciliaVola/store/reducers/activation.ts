import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { Action } from "../../../../../store/actions/types";
import { NetworkError } from "../../../../../utils/errors";
import { svServiceAlive, svTosAccepted } from "../actions/activation";
import { GlobalState } from "../../../../../store/reducers/types";
import {
  remoteError,
  remoteLoading,
  remoteReady,
  remoteUndefined,
  RemoteValue
} from "../../../bpd/model/RemoteValue";

export type ActivationState = {
  isAlive: RemoteValue<boolean, NetworkError>;
  tosAccepted: RemoteValue<boolean, NetworkError>;
};

const INITIAL_STATE: ActivationState = {
  isAlive: remoteUndefined,
  tosAccepted: remoteUndefined
};

const reducer = (
  state: ActivationState = INITIAL_STATE,
  action: Action
): ActivationState => {
  switch (action.type) {
    case getType(svServiceAlive.request):
      return {
        ...state,
        isAlive: remoteLoading
      };
    case getType(svServiceAlive.success):
      return {
        ...state,
        isAlive: remoteReady(action.payload)
      };
    case getType(svServiceAlive.failure):
      return {
        ...state,
        isAlive: remoteError(action.payload)
      };
    case getType(svTosAccepted.request):
      return {
        ...state,
        tosAccepted: remoteLoading
      };
    case getType(svTosAccepted.success):
      return {
        ...state,
        tosAccepted: remoteReady(action.payload)
      };
    case getType(svTosAccepted.failure):
      return {
        ...state,
        tosAccepted: remoteError(action.payload)
      };
  }
  return state;
};

export default reducer;

export const isAliveSelector = createSelector(
  [(state: GlobalState) => state.bonus.sv.activation.isAlive],
  (
    isAlive: RemoteValue<boolean, NetworkError>
  ): RemoteValue<boolean, NetworkError> => isAlive
);

export const tosAcceptedSelector = createSelector(
  [(state: GlobalState) => state.bonus.sv.activation.tosAccepted],
  (
    tosAccepted: RemoteValue<boolean, NetworkError>
  ): RemoteValue<boolean, NetworkError> => tosAccepted
);
