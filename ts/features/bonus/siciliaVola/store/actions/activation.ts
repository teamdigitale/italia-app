import { ActionType, createAsyncAction } from "typesafe-actions";
import { NetworkError } from "../../../../../utils/errors";

/**
 * check if the external systems are alive
 */
export const svServiceAlive = createAsyncAction(
  "SV_SERVICE_ALIVE_REQUEST",
  "SV_SERVICE_ALIVE_SUCCESS",
  "SV_SERVICE_ALIVE_FAILURE"
)<void, boolean, NetworkError>();

/**
 * check if the user had already accepted the ToS
 */
export const svTosAccepted = createAsyncAction(
  "SV_TOS_ACCEPTED_REQUEST",
  "SV_TOS_ACCEPTED_SUCCESS",
  "SV_TOS_ACCEPTED_FAILURE"
)<void, boolean, NetworkError>();

export type SvActivationActions =
  | ActionType<typeof svServiceAlive>
  | ActionType<typeof svTosAccepted>;
