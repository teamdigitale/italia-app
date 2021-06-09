import { createSelector } from "reselect";
import { NavigationActions } from "react-navigation";
import { Action } from "../../../../store/actions/types";
import { GlobalState } from "../../../../store/reducers/types";
import EUCOVIDCERT_ROUTES from "../../navigation/routes";
import { EUCovidCertificateAuthCode } from "../../types/EUCovidCertificate";

export type EuCovidCertCurrentSelectedState = {
  authCode: EUCovidCertificateAuthCode;
  messageId: string;
};

export const currentReducer = (
  state: EuCovidCertCurrentSelectedState | null = null,
  action: Action
): EuCovidCertCurrentSelectedState | null => {
  switch (action.type) {
    case NavigationActions.NAVIGATE:
      if (action.routeName === EUCOVIDCERT_ROUTES.CERTIFICATE) {
        return action.params
          ? {
              authCode: action.params.authCode,
              messageId: action.params.messageId
            }
          : null;
      }
  }

  return state;
};

/**
 * currentAuthCode selector
 */
export const euCovidCertCurrentSelector = createSelector(
  [(state: GlobalState) => state.features.euCovidCert.current],
  (euCovidCertCurrent): EuCovidCertCurrentSelectedState | null =>
    euCovidCertCurrent
);
