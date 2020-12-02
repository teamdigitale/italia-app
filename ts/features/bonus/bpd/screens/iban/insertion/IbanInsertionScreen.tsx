import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Iban } from "../../../../../../../definitions/backend/Iban";
import I18n from "../../../../../../i18n";
import { GlobalState } from "../../../../../../store/reducers/types";
import {
  bpdIbanInsertionCancel,
  bpdIbanInsertionContinue,
  bpdUpsertIban
} from "../../../store/actions/iban";
import { bpdIbanPrefillSelector } from "../../../store/reducers/details/activation";
import { isBpdOnboardingOngoing } from "../../../store/reducers/onboarding/ongoing";
import { IbanInsertionComponent } from "./IbanInsertionComponent";

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

/**
 * This screen allows the user to add / modify an iban to be used to receive the refund provided by bpd
 * @constructor
 */
const IbanInsertionScreen: React.FunctionComponent<Props> = props => (
  <IbanInsertionComponent
    onBack={props.cancel}
    onContinue={props.continue}
    onIbanConfirm={props.submitIban}
    startIban={props.prefillIban}
    cancelText={
      props.onboardingOngoing
        ? I18n.t("global.buttons.skip")
        : I18n.t("global.buttons.cancel")
    }
  />
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cancel: () => dispatch(bpdIbanInsertionCancel()),
  continue: () => dispatch(bpdIbanInsertionContinue()),
  submitIban: (iban: Iban) => dispatch(bpdUpsertIban.request(iban))
});

const mapStateToProps = (state: GlobalState) => ({
  prefillIban: bpdIbanPrefillSelector(state),
  onboardingOngoing: isBpdOnboardingOngoing(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IbanInsertionScreen);
