import { Action, combineReducers } from "redux";
import svVoucherGenerationReducer, {
  VoucherGenerationState
} from "./voucherGeneration";
import svVoucherListReducer, { VoucherListState } from "./voucherList";
import svActivationReducer, { ActivationState } from "./activation";

export type SvState = {
  activation: ActivationState;
  voucherGeneration: VoucherGenerationState;
  voucherList: VoucherListState;
};

const svReducer = combineReducers<SvState, Action>({
  activation: svActivationReducer,
  voucherGeneration: svVoucherGenerationReducer,
  voucherList: svVoucherListReducer
});

export default svReducer;
