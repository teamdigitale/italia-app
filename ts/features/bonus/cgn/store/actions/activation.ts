import {
  ActionType,
  createAsyncAction,
  createStandardAction
} from "typesafe-actions";
import { NullType } from "io-ts";
import { CgnActivationProgressEnum } from "../reducers/activation";
import { CgnActivationDetail } from "../../../../../../definitions/cgn/CgnActivationDetail";

type ActivationStatus = {
  status: CgnActivationProgressEnum;
  activation?: CgnActivationDetail;
};

export const cgnActivationStart = createStandardAction("CGN_ACTIVATION_START")<
  void
>();

/**
 * Completed the activation workflow
 */
export const cgnActivationComplete = createStandardAction(
  "CGN_ACTIVATION_COMPLETED"
)<void>();

/**
 * Cancel the activation workflow
 */
export const cgnActivationCancel = createStandardAction(
  "CGN_ACTIVATION_CANCEL"
)<void>();

/**
 * Back from the activation workflow
 */
export const cgnActivationBack = createStandardAction("CGN_ACTIVATION_BACK")<
  void
>();

/**
 * get and handle activation state of a CGN
 */
export const cgnActivationStatus = createAsyncAction(
  "CGN_ACTIVATION_STATUS_REQUEST",
  "CGN_ACTIVATION_STATUS_SUCCESS",
  "CGN_ACTIVATION_STATUS_FAILURE"
)<void, ActivationStatus, Error>();

/**
 * get and handle activation request of a CGN
 */
export const cgnRequestActivation = createAsyncAction(
  "CGN_REQUEST_ACTIVATION_REQUEST",
  "CGN_REQUEST_ACTIVATION_SUCCESS",
  "CGN_REQUEST_ACTIVATION_FAILURE"
)<void, NullType, Error>(); // Replace when API spec is correctly linked and defined

export type CgnActivationActions =
  | ActionType<typeof cgnActivationStatus>
  | ActionType<typeof cgnRequestActivation>
  | ActionType<typeof cgnActivationStart>
  | ActionType<typeof cgnActivationComplete>
  | ActionType<typeof cgnActivationCancel>
  | ActionType<typeof cgnActivationBack>;
