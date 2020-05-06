/**
 * Implements the reducers for NetworkState.
 */

import { Action } from "../actions/types";

import { getType } from "typesafe-actions";
import { networkStateUpdate } from "../actions/network";
import { GlobalState, NetworkState } from "./types";

export default function networkState(
  state: NetworkState = {
    isConnected: true
  },
  action: Action
): NetworkState {
  switch (action.type) {
    case getType(networkStateUpdate):
      return {
        isConnected: action.payload
      };
    default:
      return state;
  }
}

// Selector
export const networkStateSelector = (state: GlobalState) =>
  state.network.isConnected;
