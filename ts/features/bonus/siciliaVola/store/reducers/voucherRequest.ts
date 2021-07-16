import { none, Option, some } from "fp-ts/lib/Option";
import { getType } from "typesafe-actions";
import { createSelector } from "reselect";
import {
  Company,
  Hospital,
  PartialVoucherRequest,
  University,
  SvBeneficiaryCategory
} from "../../types/SvVoucherRequest";
import {
  FlightsDate,
  svGenerateVoucherSelectCategory,
  svGenerateVoucherSelectCompany,
  svGenerateVoucherSelectFlightsDate,
  svGenerateVoucherSelectHospital,
  svGenerateVoucherSelectUniversity,
  svGenerateVoucherStart,
  svGenerateVoucherUnderThresholdIncome
} from "../actions/voucherGeneration";
import { Action } from "../../../../../store/actions/types";
import { GlobalState } from "../../../../../store/reducers/types";

export type VoucherRequestState = Option<PartialVoucherRequest>;
const INITIAL_STATE: VoucherRequestState = none;

/**
 * Utils needed to update only the under threshold value
 * @param state
 * @param underThresholdIncome
 */
const updateUnderThresholdIncome = (
  state: VoucherRequestState,
  underThresholdIncome: boolean
): VoucherRequestState =>
  state.chain(vR => {
    if (vR.category === "worker" || vR.category === "sick") {
      return some({ ...vR, underThresholdIncome });
    }
    return state;
  });

/**
 * Utils needed to update only the university value
 * @param state
 * @param university
 */
const updateUniversity = (
  state: VoucherRequestState,
  university: University
): VoucherRequestState =>
  state.chain(vR => {
    if (vR.category === "student") {
      return some({ ...vR, university });
    }
    return state;
  });

/**
 * Utils needed to update only the company value
 * @param state
 * @param company
 */
const updateCompany = (
  state: VoucherRequestState,
  company: Company
): VoucherRequestState =>
  state.chain(vR => {
    if (vR.category === "worker") {
      return some({ ...vR, company });
    }
    return state;
  });

/**
 * Utils needed to update only the hospital value
 * @param state
 * @param hospital
 */
const updateHospital = (
  state: VoucherRequestState,
  hospital: Hospital
): VoucherRequestState =>
  state.chain(vR => {
    if (vR.category === "sick") {
      return some({ ...vR, hospital });
    }
    return state;
  });

/**
 * Utils needed to update only the flights date values
 * @param state
 * @param flightsDate
 */
const updateFlightsDate = (
  state: VoucherRequestState,
  flightsDate: FlightsDate
): VoucherRequestState =>
  state.chain(vR =>
    some({
      ...vR,
      departureDate: flightsDate.departureDate,
      returnDate: flightsDate.returnDate
    })
  );

const reducer = (
  state: VoucherRequestState = INITIAL_STATE,
  action: Action
): VoucherRequestState => {
  switch (action.type) {
    case getType(svGenerateVoucherStart):
      return INITIAL_STATE;
    case getType(svGenerateVoucherSelectCategory):
      return some({
        category: action.payload
      });

    case getType(svGenerateVoucherUnderThresholdIncome):
      return updateUnderThresholdIncome(state, action.payload);

    case getType(svGenerateVoucherSelectCompany):
      return updateCompany(state, action.payload);

    case getType(svGenerateVoucherSelectHospital):
      return updateHospital(state, action.payload);

    case getType(svGenerateVoucherSelectUniversity):
      return updateUniversity(state, action.payload);

    case getType(svGenerateVoucherSelectFlightsDate):
      return updateFlightsDate(state, action.payload);
  }
  return state;
};

export default reducer;

export const selectedBeneficiaryCategorySelector = createSelector(
  [(state: GlobalState) => state.bonus.sv.voucherGeneration.voucherRequest],
  (voucherRequest: VoucherRequestState): Option<SvBeneficiaryCategory> =>
    voucherRequest.fold(none, vR => some(vR.category))
);
