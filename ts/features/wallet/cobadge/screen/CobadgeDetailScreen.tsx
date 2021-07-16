import * as pot from "italia-ts-commons/lib/pot";
import { Button, View } from "native-base";
import * as React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../../../i18n";
import { IOColors } from "../../../../components/core/variables/IOColors";
import DarkLayout from "../../../../components/screens/DarkLayout";
import { GlobalState } from "../../../../store/reducers/types";
import { getWalletsById } from "../../../../store/reducers/wallet/wallets";
import { CreditCardPaymentMethod } from "../../../../types/pagopa";
import { emptyContextualHelp } from "../../../../utils/emptyContextualHelp";
import { useRemovePaymentMethodBottomSheet } from "../../component/RemovePaymentMethod";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import PaymentMethodCapabilities from "../../component/PaymentMethodCapabilities";
import { Label } from "../../../../components/core/typography/Label";
import { deleteWalletRequest } from "../../../../store/actions/wallet/wallets";
import { showToast } from "../../../../utils/showToast";
import CobadgeCard from "../component/CoBadgeCard";
import { getCardIconFromBrandLogo } from "../../../../components/wallet/card/Logo";
import LoadingSpinnerOverlay from "../../../../components/LoadingSpinnerOverlay";

type NavigationParams = Readonly<{
  cobadge: CreditCardPaymentMethod;
  brandLogo: ImageSourcePropType;
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
 * Detail screen for a cobadge card
 * @constructor
 */
const CobadgeDetailScreen: React.FunctionComponent<Props> = props => {
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const cobadge: CreditCardPaymentMethod = props.navigation.getParam("cobadge");
  const brandLogo = getCardIconFromBrandLogo(cobadge.info);
  const { present } = useRemovePaymentMethodBottomSheet({
    icon: brandLogo,
    caption: cobadge.caption
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
      contextualHelp={emptyContextualHelp}
      title={I18n.t("wallet.creditCard.details.header")}
      faqCategories={["wallet_methods"]}
      allowGoBack={true}
      topContent={<View style={styles.headerSpacer} />}
      gradientHeader={true}
      hideHeader={true}
    >
      <View style={styles.cardContainer}>
        <CobadgeCard enhancedCoBadge={cobadge} />
      </View>
      <View spacer={true} extralarge={true} />
      <View style={IOStyles.horizontalContentPadding}>
        <PaymentMethodCapabilities paymentMethod={cobadge} />
        <View spacer={true} large={true} />
        <UnsubscribeButton
          onPress={() =>
            present(() => {
              props.deleteWallet(cobadge.idWallet);
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
  deleteWallet: (walletId: number) =>
    dispatch(
      deleteWalletRequest({
        walletId,
        onSuccess: _ => {
          showToast(I18n.t("wallet.delete.successful"), "success");
          dispatch(NavigationActions.back());
        },
        onFailure: _ => {
          showToast(I18n.t("wallet.delete.failed"), "danger");
        }
      })
    )
});

const mapStateToProps = (state: GlobalState) => ({
  hasErrorDelete: pot.isError(getWalletsById(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CobadgeDetailScreen);
