import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  bpdOnboardingAcceptDeclaration,
  bpdOnboardingCancel
} from "../../../store/actions/onboarding";
import { DeclarationComponent } from "./DeclarationComponent";

export type Props = ReturnType<typeof mapDispatchToProps>;

/**
 * This screen allows the user to declare the required conditions
 */

const DeclarationScreen: React.FunctionComponent<Props> = props => (
  <DeclarationComponent
    onCancel={props.onCancel}
    onConfirm={props.userAcceptDeclaration}
  />
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCancel: () => dispatch(bpdOnboardingCancel()),
  userAcceptDeclaration: () => dispatch(bpdOnboardingAcceptDeclaration())
});

export default connect(undefined, mapDispatchToProps)(DeclarationScreen);
