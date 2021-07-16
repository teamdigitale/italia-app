import { SvVoucherGenerationActions } from "./voucherGeneration";
import { SvVoucherListActions } from "./voucherList";
import { SvActivationActions } from "./activation";

export type SvActions =
  | SvVoucherGenerationActions
  | SvVoucherListActions
  | SvActivationActions;
