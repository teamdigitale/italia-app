import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GlobalState } from "../../../../../store/reducers/types";
import {
  svGenerateVoucherBack,
  svGenerateVoucherCancel
} from "../../store/actions/voucherGeneration";
import {
  isAliveSelector,
  tosAcceptedSelector
} from "../../store/reducers/activation";
import GenericErrorComponent from "../../../../../components/screens/GenericErrorComponent";
import { svServiceAlive, svTosAccepted } from "../../store/actions/activation";
import { fold, isLoading, isReady } from "../../../bpd/model/RemoteValue";
import { LoadingErrorComponent } from "../../../bonusVacanze/components/loadingErrorScreen/LoadingErrorComponent";
import AcceptTosComponent from "../../components/AcceptTosComponent";
import CheckResidenceComponent from "../../components/CheckResidenceComponent";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const manageTosResponse = (tosAccepted: boolean): React.ReactElement =>
  tosAccepted ? <CheckResidenceComponent /> : <AcceptTosComponent />;

const CheckStatusRouterScreen = (props: Props): React.ReactElement => {
  React.useEffect(() => {
    props.checkServiceAvailable();
    props.checkTosAccepted();
  }, []);

  if (
    !isReady(props.isServiceAlive) ||
    (isReady(props.isServiceAlive) && !props.isServiceAlive.value)
  ) {
    return (
      <LoadingErrorComponent
        isLoading={isLoading(props.isServiceAlive)}
        loadingCaption={"loading"}
        onRetry={props.checkServiceAvailable}
      />
    );
  }

  return fold(
    props.tosAccepted,
    () => <GenericErrorComponent onRetry={props.checkTosAccepted} />,
    () => (
      <LoadingErrorComponent
        isLoading={true}
        loadingCaption={""}
        onRetry={props.checkTosAccepted}
      />
    ),
    v => manageTosResponse(v),
    _ => <GenericErrorComponent onRetry={props.checkTosAccepted} />
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  back: () => dispatch(svGenerateVoucherBack()),
  cancel: () => dispatch(svGenerateVoucherCancel()),
  checkServiceAvailable: () => dispatch(svServiceAlive.request()),
  checkTosAccepted: () => dispatch(svTosAccepted.request())
});
const mapStateToProps = (state: GlobalState) => ({
  isServiceAlive: isAliveSelector(state),
  tosAccepted: tosAcceptedSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckStatusRouterScreen);
