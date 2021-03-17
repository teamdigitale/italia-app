// bonus reducer
import { getType } from "typesafe-actions";
import { createSelector } from "reselect";
import { Action } from "../../../../../../store/actions/types";
import { GlobalState } from "../../../../../../store/reducers/types";
import {
  isReady,
  remoteError,
  remoteLoading,
  remoteReady,
  remoteUndefined,
  RemoteValue
} from "../../../../bpd/model/RemoteValue";
import { NetworkError } from "../../../../../../utils/errors";
import { cgnEycaActivation } from "../../actions/eyca/activation";

export type CgnEycaActivationStatus =
  | "POLLING"
  | "POLLING_TIMEOUT"
  | "COMPLETED"
  | "INELIGIBLE"
  | "ALREADY_ACTIVE"
  | "ERROR";

export type EycaActivationState = RemoteValue<
  CgnEycaActivationStatus,
  NetworkError
>;

const INITIAL_STATE: EycaActivationState = remoteUndefined;

const reducer = (
  state: EycaActivationState = INITIAL_STATE,
  action: Action
): EycaActivationState => {
  switch (action.type) {
    // bonus activation
    case getType(cgnEycaActivation.request):
      return remoteLoading;
    case getType(cgnEycaActivation.success):
      return remoteReady(action.payload);
    case getType(cgnEycaActivation.failure):
      return remoteError(action.payload);
  }
  return state;
};

// Selectors
export const eycaActivationStatusSelector = (
  state: GlobalState
): EycaActivationState => state.bonus.cgn.eyca.activation;

// return the cgn eyca status
// TODO Use this selector in PR https://github.com/pagopa/io-app/pull/2872
//  to check the EYCA activation status is not ERROR
export const cgnEycaActivationstatus = createSelector(
  eycaActivationStatusSelector,
  (activation: EycaActivationState): CgnEycaActivationStatus =>
    isReady(activation) ? activation : "ERROR"
);

export default reducer;
