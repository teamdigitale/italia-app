import * as pot from "italia-ts-commons/lib/pot";
import { Button, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import pagoBancomatImage from "../../../../../img/wallet/cards-icons/pagobancomat.png";
import { Label } from "../../../../components/core/typography/Label";
import { IOColors } from "../../../../components/core/variables/IOColors";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import ItemSeparatorComponent from "../../../../components/ItemSeparatorComponent";
import DarkLayout from "../../../../components/screens/DarkLayout";
import I18n from "../../../../i18n";
import { mixpanelTrack } from "../../../../mixpanel";
import { deleteWalletRequest } from "../../../../store/actions/wallet/wallets";
import { GlobalState } from "../../../../store/reducers/types";
import { getWalletsById } from "../../../../store/reducers/wallet/wallets";
import { BancomatPaymentMethod } from "../../../../types/pagopa";
import { emptyContextualHelp } from "../../../../utils/emptyContextualHelp";
import { showToast } from "../../../../utils/showToast";
import PaymentMethodCapabilities from "../../component/PaymentMethodCapabilities";
import { useRemovePaymentMethodBottomSheet } from "../../component/RemovePaymentMethod";
import { navigateToOnboardingCoBadgeChooseTypeStartScreen } from "../../onboarding/cobadge/navigation/action";
import BancomatCard from "../component/bancomatCard/BancomatCard";
import LoadingSpinnerOverlay from "../../../../components/LoadingSpinnerOverlay";
import BancomatInformation from "./BancomatInformation";

type NavigationParams = Readonly<{
  bancomat: BancomatPaymentMethod;
}>;

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  NavigationInjectedProps<NavigationParams>;

const styles = StyleSheet.create({
  cardContainer: {
    height: 235,
    width: "100%",
    position: "absolute",
    top: 16,
    zIndex: 7,
    elevation: 7,
    alignItems: "center"
  },
  headerSpacer: {
    height: 172
  },
  cancelButton: {
    borderColor: IOColors.red,
    width: "100%"
  }
});

const UnsubscribeButton = (props: { onPress?: () => void }) => (
  <Button bordered={true} style={styles.cancelButton} onPress={props.onPress}>
    <Label color={"red"}>{I18n.t("wallet.bancomat.details.removeCta")}</Label>
  </Button>
);

/**
 * Start the cobadge onboarding, if the abi is defined
 * @param props
 */
const startCoBadge = (props: Props) => {
  const bancomat = props.navigation.getParam("bancomat");
  if (bancomat.info.issuerAbiCode === undefined) {
    showToast(I18n.t("global.genericError"), "danger");
    // This should never happen. This condition is due to the weakness of the remote specifications
    void mixpanelTrack("BANCOMAT_DETAIL_NO_ABI_ERROR");
  } else {
    props.addCoBadge(bancomat.info.issuerAbiCode);
  }
};

/**
 * Detail screen for a bancomat
 * @constructor
 */
const BancomatDetailScreen: React.FunctionComponent<Props> = props => {
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const bancomat: BancomatPaymentMethod = props.navigation.getParam("bancomat");
  const { present } = useRemovePaymentMethodBottomSheet({
    icon: pagoBancomatImage,
    caption: bancomat.abiInfo?.name ?? I18n.t("wallet.methods.bancomat.name")
  });

  React.useEffect(() => {
    if (props.hasErrorDelete) {
      setIsLoadingDelete(false);
    }
  }, [props.hasErrorDelete]);

  return isLoadingDelete ? (
    <LoadingSpinnerOverlay
      isLoading={isLoadingDelete}
      loadingCaption={I18n.t("wallet.bancomat.details.deleteLoading")}
    />
  ) : (
    <DarkLayout
      bounces={false}
      title={I18n.t("wallet.methods.card.shortName")}
      faqCategories={["wallet_methods"]}
      allowGoBack={true}
      topContent={<View style={styles.headerSpacer} />}
      gradientHeader={true}
      hideHeader={true}
      contextualHelp={emptyContextualHelp}
    >
      <View style={styles.cardContainer}>
        <BancomatCard enhancedBancomat={bancomat} />
      </View>
      <View spacer={true} extralarge={true} />
      <View spacer={true} />

      <View style={IOStyles.horizontalContentPadding}>
        <BancomatInformation onAddPaymentMethod={() => startCoBadge(props)} />
        <View spacer={true} />
        <ItemSeparatorComponent noPadded={true} />
        <View spacer={true} />
        <PaymentMethodCapabilities paymentMethod={bancomat} />
        <ItemSeparatorComponent noPadded={true} />
        <View spacer={true} />
        <UnsubscribeButton
          onPress={() =>
            present(() => {
              props.deleteWallet(bancomat.idWallet);
              setIsLoadingDelete(true);
            })
          }
        />
      </View>
      <View spacer={true} extralarge={true} />
    </DarkLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // using the legacy action with callback instead of using the redux state to read the results
  // for time reasons...
  deleteWallet: (walletId: number) =>
    dispatch(
      deleteWalletRequest({
        walletId,
        onSuccess: _ => {
          showToast(I18n.t("wallet.delete.bancomat.successful"), "success");
          dispatch(NavigationActions.back());
        },
        onFailure: _ => {
          showToast(I18n.t("wallet.delete.bancomat.failed"), "danger");
        }
      })
    ),
  addCoBadge: (abi: string) =>
    dispatch(
      navigateToOnboardingCoBadgeChooseTypeStartScreen({
        abi,
        legacyAddCreditCardBack: 1
      })
    )
});
const mapStateToProps = (state: GlobalState) => ({
  hasErrorDelete: pot.isError(getWalletsById(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BancomatDetailScreen);
