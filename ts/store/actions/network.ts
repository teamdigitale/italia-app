/**
 * Action types and action creator related to networkState.
 */
import { ActionType, createStandardAction } from "typesafe-actions";

export const networkStateUpdate = createStandardAction("UPDATE_NEWORK_STATE")<
  boolean
>();

export type NetworkStateActions = ActionType<typeof networkStateUpdate>;
