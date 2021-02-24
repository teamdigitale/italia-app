/**
 * This screen presents a summary on the credit card after the user
 * inserted the data required to save a new card
 */
import { none, Option, some } from "fp-ts/lib/Option";
import { AmountInEuroCents, RptId } from "italia-pagopa-commons/lib/pagopa";
import * as pot from "italia-ts-commons/lib/pot";
import { Content, Text, View } from "native-base";
import * as React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { constNull } from "fp-ts/lib/function";
import { PaymentRequestsGetResponse } from "../../../definitions/backend/PaymentRequestsGetResponse";
import { TypeEnum } from "../../../definitions/pagopa/Wallet";
import { withLoadingSpinner } from "../../components/helpers/withLoadingSpinner";
import NoticeBox from "../../components/NoticeBox";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../components/ui/FooterWithButtons";
import Switch from "../../components/ui/Switch";
import CardComponent from "../../components/wallet/card/CardComponent";
import I18n from "../../i18n";
import {
  navigateToAddCreditCardOutcomeCode,
  navigateToPaymentPickPaymentMethodScreen,
  navigateToWalletHome
} from "../../store/actions/navigation";
import { Dispatch } from "../../store/actions/types";
import {
  addWalletCreditCardInit,
  creditCardCheckout3dsRedirectionUrls,
  fetchWalletsRequestWithExpBackoff,
  runStartOrResumeAddCreditCardSaga
} from "../../store/actions/wallet/wallets";
import { GlobalState } from "../../store/reducers/types";
import customVariables from "../../theme/variables";
import { CreditCard, Wallet } from "../../types/pagopa";
import { showToast } from "../../utils/showToast";
import Checkout3DsComponent from "../modal/Checkout3DsModal";
import { LoadingErrorComponent } from "../../features/bonus/bonusVacanze/components/loadingErrorScreen/LoadingErrorComponent";
import { InfoScreenComponent } from "../../components/infoScreen/InfoScreenComponent";
import { renderInfoRasterImage } from "../../components/infoScreen/imageRendering";
import image from "../../../img/wallet/errors/payment-unavailable-icon.png";
import { FooterStackButton } from "../../features/bonus/bonusVacanze/components/buttons/FooterStackButtons";
import { confirmButtonProps } from "../../features/bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import { IOStyles } from "../../components/core/variables/IOStyles";
import { isStrictSome } from "../../utils/pot";
import { dispatchPickPspOrConfirm } from "./payment/common";
import { PayWebViewModal } from "../../components/wallet/PayWebViewModal";
import { pagoPaApiUrlPrefix, pagoPaApiUrlPrefixTest } from "../../config";
import { isPagoPATestEnabledSelector } from "../../store/reducers/persistedPreferences";
import { addCreditCardOutcomeCode } from "../../store/actions/wallet/outcomeCode";
import { getAllWallets } from "../../store/reducers/wallet/wallets";
import { pmSessionTokenSelector } from "../../store/reducers/wallet/payment";
import { isReady } from "../../features/bonus/bpd/model/RemoteValue";
import { getLocalePrimaryWithFallback } from "../../utils/locale";
import reactotron from "reactotron-react-native";
import {
  paymentWebViewEnd,
  PaymentWebViewEndReason
} from "../../store/actions/wallet/payment";

export type NavigationParams = Readonly<{
  creditCard: CreditCard;
  inPayment: Option<{
    rptId: RptId;
    initialAmount: AmountInEuroCents;
    verifica: PaymentRequestsGetResponse;
    idPayment: string;
  }>;
  keyFrom?: string;
}>;

type ReduxMergedProps = Readonly<{
  onRetry?: () => void;
}>;

type OwnProps = NavigationInjectedProps<NavigationParams>;

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  ReduxMergedProps &
  OwnProps;

type State = Readonly<{
  setAsFavourite: boolean;
}>;

const styles = StyleSheet.create({
  paddedLR: {
    paddingLeft: customVariables.contentPadding,
    paddingRight: customVariables.contentPadding
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "wallet.saveCard.contextualHelpTitle",
  body: "wallet.saveCard.contextualHelpContent"
};

class ConfirmCardDetailsScreen extends React.Component<Props, State> {
  public componentDidMount() {
    // reset the credit card boarding state on mount
    this.props.addWalletCreditCardInit();
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      setAsFavourite: true
    };
  }

  // It supports switch state changes
  private onSetFavouriteValueChange = () => {
    this.setState(prevState => ({
      setAsFavourite: !prevState.setAsFavourite
    }));
  };

  private goBack = () => {
    this.props.navigation.goBack();
  };

  public render(): React.ReactNode {
    const creditCard = this.props.navigation.getParam("creditCard");
    const isInPayment = this.props.navigation.getParam("inPayment").isSome();

    // WebView parameters
    const payUrlSuffix = "/v3/webview/transactions/cc/verify";
    const webViewExitPathName = "/v3/webview/logout/bye";
    const webViewOutcomeParamName = "outcome";

    const urlPrefix = this.props.isPagoPATestEnabled
      ? pagoPaApiUrlPrefixTest
      : pagoPaApiUrlPrefix;

    // the user press back during the pay web view challenge
    const handlePayWebviewGoBack = () => {
      Alert.alert(I18n.t("payment.abortWebView.title"), "", [
        {
          text: I18n.t("payment.abortWebView.confirm"),
          onPress: () => {
            this.props.onCancel();
          },
          style: "cancel"
        },
        {
          text: I18n.t("payment.abortWebView.cancel")
        }
      ]);
    };

    const payWebViewPayload =
      isReady(this.props.pmSessionToken) &&
      this.props.creditCardTempWallet.isSome() &&
      creditCard.securityCode
        ? {
            formData: {
              idWallet: this.props.creditCardTempWallet.value.idWallet,
              cvv: creditCard.securityCode,
              sessionToken: this.props.pmSessionToken.value,
              language: getLocalePrimaryWithFallback()
            },
            crediCardTempWallet: this.props.creditCardTempWallet.value
          }
        : undefined;

    reactotron.log(
      this.props.pmSessionToken,
      this.props.creditCardTempWallet,
      creditCard.securityCode,
      urlPrefix + payUrlSuffix
    );
    const wallet = {
      creditCard,
      type: TypeEnum.CREDIT_CARD,
      idWallet: -1, // FIXME: no magic numbers
      psp: undefined
    };

    const primaryButtonProps = {
      block: true,
      primary: true,
      onPress: () =>
        this.props.runStartOrResumeAddCreditCardSaga(
          creditCard,
          this.state.setAsFavourite
        ),
      title: isInPayment
        ? I18n.t("wallet.saveCardInPayment.save")
        : I18n.t("wallet.saveCard.save")
    };

    const secondaryButtonProps = {
      block: true,
      bordered: true,
      onPress: this.goBack,
      title: I18n.t("global.buttons.back")
    };

    // shown when wallets pot is in error state
    const walletsInErrorContent = (
      <SafeAreaView style={IOStyles.flex}>
        <InfoScreenComponent
          image={renderInfoRasterImage(image)}
          title={I18n.t("wallet.saveCard.loadWalletsErrorTitle")}
          body={I18n.t("wallet.saveCard.loadWalletsErrorBody")}
        />
        <FooterStackButton
          buttons={[
            confirmButtonProps(() => {
              // load wallets and navigate to wallet home
              this.props.loadWallets();
              this.props.navigateToWalletHome();
            }, I18n.t("wallet.refreshWallet"))
          ]}
        />
      </SafeAreaView>
    );

    // shown when any steps of credit card onboarding are in error state
    const creditCardErrorContent = (
      <LoadingErrorComponent
        isLoading={false}
        loadingCaption={""}
        errorSubText={I18n.t("wallet.saveCard.temporarySubError")}
        errorText={this.props.error.getOrElse("")}
        onRetry={this.props.onRetry ?? constNull}
        onAbort={this.goBack}
      />
    );
    // this component is shown only in error case (wallet || credit card onboarding)
    const errorContent = this.props.areWalletsInError
      ? walletsInErrorContent
      : creditCardErrorContent;

    const noErrorContent = (
      <>
        <Content noPadded={true} style={styles.paddedLR}>
          <CardComponent
            wallet={wallet}
            type={"Full"}
            extraSpace={true}
            hideMenu={true}
            hideFavoriteIcon={true}
          />
          <View spacer={true} />
          <NoticeBox
            backgroundColor={customVariables.toastColor}
            iconProps={{
              name: "io-notice",
              color: customVariables.brandDarkGray,
              size: 24
            }}
          >
            <Text>{I18n.t("wallet.saveCard.notice")}</Text>
          </NoticeBox>
          <View spacer={true} />
          <Grid>
            <Col size={5}>
              <Text bold={true}>{I18n.t("wallet.saveCard.infoTitle")}</Text>
              <Text>{I18n.t("wallet.saveCard.info")}</Text>
            </Col>
            <Col size={1}>
              <Switch
                value={this.state.setAsFavourite}
                onValueChange={this.onSetFavouriteValueChange}
              />
            </Col>
          </Grid>
        </Content>
        {isInPayment ? (
          <FooterWithButtons
            type={"TwoButtonsInlineThird"}
            leftButton={secondaryButtonProps}
            rightButton={primaryButtonProps}
          />
        ) : (
          <FooterWithButtons
            type={"TwoButtonsInlineHalf"}
            leftButton={secondaryButtonProps}
            rightButton={primaryButtonProps}
          />
        )}

        {/*
         * When the first step is finished (creditCardAddWallet === some) show the webview
         * for the payment component.
         */}
        {payWebViewPayload && (
          <PayWebViewModal
            postUri={urlPrefix + payUrlSuffix}
            formData={payWebViewPayload.formData}
            finishPathName={webViewExitPathName}
            onFinish={maybeCode => {
              reactotron.log(maybeCode);
              this.props.storeCreditCardOutcome(maybeCode);
              this.props.goToAddCreditCardOutcomeCode(
                payWebViewPayload.crediCardTempWallet
              );
              this.props.dispatchEndPaymentWebview("EXIT_FROM_WEB_VIEW");
            }}
            outcomeQueryparamName={webViewOutcomeParamName}
            onGoBack={handlePayWebviewGoBack}
          />
        )}
      </>
    );
    const error = this.props.error.isSome() || this.props.areWalletsInError;
    return (
      <BaseScreenComponent
        goBack={true}
        headerTitle={
          isInPayment
            ? I18n.t("wallet.saveCardInPayment.header")
            : I18n.t("wallet.saveCard.header")
        }
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={["wallet_methods"]}
      >
        {/* error could include credit card errors (add wallet (step-1))
            and load wallets error too
        */}
        {error ? errorContent : noErrorContent}
      </BaseScreenComponent>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  const { creditCardAddWallet, walletById } = state.wallet.wallets;

  const { psps } = state.wallet.payment;

  const isLoading =
    pot.isLoading(creditCardAddWallet) ||
    pot.isLoading(walletById) ||
    pot.isLoading(psps);

  // considering wallet error only when the fisrt two steps are completed and not in error
  const areWalletsInError =
    pot.isError(walletById) && pot.isSome(creditCardAddWallet);

  const error =
    (pot.isError(creditCardAddWallet) &&
      creditCardAddWallet.error.kind !== "ALREADY_EXISTS") ||
    pot.isError(psps)
      ? some(I18n.t("wallet.saveCard.temporaryError"))
      : none;

  // Props needed to create the form for the payment web view
  const allWallets = getAllWallets(state);
  const creditCardTempWallet: Option<Wallet> = pot
    .toOption(allWallets.creditCardAddWallet)
    .map(c => c.data);
  const pmSessionToken = pmSessionTokenSelector(state);

  return {
    isLoading,
    error,
    areWalletsInError,
    loadingOpacity: 0.98,
    loadingCaption: I18n.t("wallet.saveCard.loadingAlert"),
    creditCardTempWallet,
    pmSessionToken,
    isPagoPATestEnabled: isPagoPATestEnabledSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: NavigationInjectedProps<NavigationParams>
) => {
  const navigateToNextScreen = (maybeWallet: Option<Wallet>) => {
    const inPayment = props.navigation.getParam("inPayment");
    if (inPayment.isSome()) {
      const { rptId, initialAmount, verifica, idPayment } = inPayment.value;
      dispatchPickPspOrConfirm(dispatch)(
        rptId,
        initialAmount,
        verifica,
        idPayment,
        maybeWallet,
        failureReason => {
          // trying to use this card for the current payment has failed, show
          // a toast and navigate to the wallet selection screen
          if (failureReason === "FETCH_PSPS_FAILURE") {
            // fetching the PSPs for the payment has failed
            showToast(I18n.t("wallet.payWith.fetchPspFailure"), "warning");
          } else if (failureReason === "NO_PSPS_AVAILABLE") {
            // this card cannot be used for this payment
            // TODO: perhaps we can temporarily hide the selected wallet from
            //       the list of available wallets
            showToast(I18n.t("wallet.payWith.noPspsAvailable"), "danger");
          }
          // navigate to the wallet selection screen
          dispatch(
            navigateToPaymentPickPaymentMethodScreen({
              rptId,
              initialAmount,
              verifica,
              idPayment
            })
          );
        }
      );
    } else {
      dispatch(
        navigateToWalletHome({
          newMethodAdded: maybeWallet.isSome(),
          keyFrom: props.navigation.getParam("keyFrom")
        })
      );
    }
  };
  return {
    navigateToWalletHome: () => dispatch(navigateToWalletHome()),
    loadWallets: () => dispatch(fetchWalletsRequestWithExpBackoff()),
    addWalletCreditCardInit: () => dispatch(addWalletCreditCardInit()),
    runStartOrResumeAddCreditCardSaga: (
      creditCard: CreditCard,
      setAsFavorite: boolean
    ) =>
      dispatch(
        runStartOrResumeAddCreditCardSaga({
          creditCard,
          setAsFavorite,
          onSuccess: addedWallet => {
            showToast(I18n.t("wallet.newPaymentMethod.successful"), "success");
            navigateToNextScreen(some(addedWallet));
          },
          onFailure: error => {
            showToast(
              I18n.t(
                error === "ALREADY_EXISTS"
                  ? "wallet.newPaymentMethod.failedCardAlreadyExists"
                  : "wallet.newPaymentMethod.failed"
              ),
              "danger"
            );
            navigateToNextScreen(none);
          }
        })
      ),
    onCancel: () => props.navigation.goBack(),
    storeCreditCardOutcome: (outcomeCode: Option<string>) =>
      dispatch(addCreditCardOutcomeCode(outcomeCode)),
    goToAddCreditCardOutcomeCode: (creditCard: Wallet) =>
      dispatch(
        navigateToAddCreditCardOutcomeCode({ selectedWallet: creditCard })
      ),
    dispatchEndPaymentWebview: (reason: PaymentWebViewEndReason) => {
      dispatch(paymentWebViewEnd(reason));
    }
  };
};

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: OwnProps
) => {
  const maybeError = stateProps.error;
  const isRetriableError =
    maybeError.isNone() || maybeError.value !== "ALREADY_EXISTS";
  const onRetry = isRetriableError
    ? () => {
        dispatchProps.runStartOrResumeAddCreditCardSaga(
          ownProps.navigation.getParam("creditCard"),
          // FIXME: Unfortunately we can't access the internal component state
          //        from here so we cannot know if the user wants to set this
          //        card as favourite, we pass true anyway since it's the
          //        default.
          true
        );
      }
    : undefined;
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    ...{
      onRetry
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withLoadingSpinner(ConfirmCardDetailsScreen));
