import { combineReducers } from "redux";
import { Action } from "../../../../store/actions/types";
import {
  euCovidCertByAuthCodeReducer,
  EuCovidCertByIdState
} from "./byAuthCode";
import { currentReducer, EuCovidCertCurrentSelectedState } from "./current";

export type EuCovidCertState = {
  byAuthCode: EuCovidCertByIdState;
  current: EuCovidCertCurrentSelectedState | null;
};

export const euCovidCertReducer = combineReducers<EuCovidCertState, Action>({
  // save, using the AuthCode as key the the pot.Pot<EUCovidCertificateResponse, Error> response
  byAuthCode: euCovidCertByAuthCodeReducer,
  // The auth code and messageId that the user is viewing
  current: currentReducer
});
