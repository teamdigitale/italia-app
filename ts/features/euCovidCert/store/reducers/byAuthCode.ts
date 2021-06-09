import * as pot from "italia-ts-commons/lib/pot";
import { Millisecond } from "italia-ts-commons/lib/units";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { Action } from "../../../../store/actions/types";
import { IndexedById } from "../../../../store/helpers/indexer";
import {
  toError,
  toLoading,
  toSome
} from "../../../../store/reducers/IndexedByIdPot";
import { GlobalState } from "../../../../store/reducers/types";
import { getNetworkErrorMessage } from "../../../../utils/errors";
import { isStrictSome } from "../../../../utils/pot";
import { EUCovidCertificateAuthCode } from "../../types/EUCovidCertificate";
import {
  EUCovidCertificateResponse,
  isEuCovidCertificateSuccessResponse
} from "../../types/EUCovidCertificateResponse";
import { euCovidCertificateGet } from "../actions";

export type EUCovidCertificateResponseWithTimestamp = EUCovidCertificateResponse & {
  lastUpdate: Date;
};

export type EuCovidCertByIdState = IndexedById<
  pot.Pot<EUCovidCertificateResponseWithTimestamp, Error>
>;

/**
 * Store the EU Certificate response status based on the AuthCode used to issue the request
 * @param state
 * @param action
 */
export const euCovidCertByAuthCodeReducer = (
  state: EuCovidCertByIdState = {},
  action: Action
): EuCovidCertByIdState => {
  switch (action.type) {
    case getType(euCovidCertificateGet.request):
      return toLoading(action.payload, state);
    case getType(euCovidCertificateGet.success):
      return toSome(action.payload.authCode, state, {
        ...action.payload,
        lastUpdate: new Date()
      });
    case getType(euCovidCertificateGet.failure):
      return toError(
        action.payload.authCode,
        state,
        new Error(getNetworkErrorMessage(action.payload))
      );
  }

  return state;
};

/**
 * From authCode to EUCovidCertificateResponse
 */
export const euCovidCertificateFromAuthCodeSelector = createSelector(
  [
    (state: GlobalState) => state.features.euCovidCert.byAuthCode,
    (_: GlobalState, authCode: EUCovidCertificateAuthCode) => authCode
  ],
  (
    byAuthCode,
    authCode
  ): pot.Pot<EUCovidCertificateResponseWithTimestamp, Error> =>
    byAuthCode[authCode] ?? pot.none
);

// 1h
const ttlTime: Millisecond = (60 * 60 * 1000) as Millisecond;

/**
 * Return true when the remote data should be reloaded:
 * - no entry for the selected authCode
 * - the slice is not potSome
 * - the slice response is not a success response
 * - ttlTime is elapsed from the last update of the success response
 * Using an unmemorized selector is intentional, as the result changes over time
 */
export const euCovidCertificateShouldBeLoadedSelector = (
  state: GlobalState,
  authCode: EUCovidCertificateAuthCode
) => {
  const slice = euCovidCertificateFromAuthCodeSelector(state, authCode);
  const now = new Date();
  return (
    slice === undefined ||
    !isStrictSome(slice) ||
    !isEuCovidCertificateSuccessResponse(slice.value) ||
    now.getTime() - slice.value.lastUpdate.getTime() >= ttlTime
  );
};
