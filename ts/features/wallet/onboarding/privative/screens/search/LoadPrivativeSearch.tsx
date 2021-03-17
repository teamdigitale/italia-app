import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../../../../../i18n";
import { mixpanelTrack } from "../../../../../../mixpanel";
import { GlobalState } from "../../../../../../store/reducers/types";
import { WithTestID } from "../../../../../../types/WithTestID";
import { showToast } from "../../../../../../utils/showToast";
import { useHardwareBackButton } from "../../../../../bonus/bonusVacanze/components/hooks/useHardwareBackButton";
import { LoadingErrorComponent } from "../../../../../bonus/bonusVacanze/components/loadingErrorScreen/LoadingErrorComponent";
import {
  PrivativeQuery,
  searchUserPrivative,
  walletAddPrivativeCancel
} from "../../store/actions";
import { onboardingPrivativeFoundIsError } from "../../store/reducers/foundPrivative";
import { onboardingSearchedPrivativeQuerySelector } from "../../store/reducers/searchedPrivative";

type Props = WithTestID<
  ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>
>;

/**
 * Loading screen while search the privative card
 * @param props
 * @constructor
 */
const LoadPrivativeSearch = (props: Props): React.ReactElement | null => {
  useHardwareBackButton(() => {
    if (!props.isLoading) {
      props.cancel();
    }
    return true;
  });

  const { privativeSelected } = props;

  if (privativeSelected === undefined) {
    showToast(I18n.t("global.genericError"), "danger");
    void mixpanelTrack("WALLET_ONBOARDING_PRIVATIVE_NO_QUERY_PARAMS_ERROR");
    props.cancel();
    return null;
  } else {
    return (
      <LoadingErrorComponent
        {...props}
        loadingCaption={I18n.t("wallet.onboarding.privative.search.loading")}
        onAbort={props.cancel}
        onRetry={() => props.retry(privativeSelected)}
      />
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cancel: () => dispatch(walletAddPrivativeCancel()),
  retry: (searchedPrivativeData: PrivativeQuery) =>
    dispatch(searchUserPrivative.request(searchedPrivativeData))
});

const mapStateToProps = (state: GlobalState) => ({
  privativeSelected: onboardingSearchedPrivativeQuerySelector(state),
  isLoading: !onboardingPrivativeFoundIsError(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadPrivativeSearch);
