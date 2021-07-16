import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { IOStyles } from "../../components/core/variables/IOStyles";
import ItemSeparatorComponent from "../../components/ItemSeparatorComponent";

import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import CardComponent from "../../components/wallet/card/CardComponent";
import WalletLayout from "../../components/wallet/WalletLayout";
import PaymentMethodCapabilities from "../../features/wallet/component/PaymentMethodCapabilities";
import I18n from "../../i18n";
import { Dispatch } from "../../store/actions/types";
import {
  deleteWalletRequest,
  setFavouriteWalletRequest
} from "../../store/actions/wallet/wallets";
import { GlobalState } from "../../store/reducers/types";
import {
  getFavoriteWalletId,
  getWalletsById,
  paymentMethodsSelector
} from "../../store/reducers/wallet/wallets";
import variables from "../../theme/variables";
import { isRawCreditCard, Wallet } from "../../types/pagopa";
import { showToast } from "../../utils/showToast";
import { FOUR_UNICODE_CIRCLES, handleSetFavourite } from "../../utils/wallet";
import { useRemovePaymentMethodBottomSheet } from "../../features/wallet/component/RemovePaymentMethod";
import { getCardIconFromBrandLogo } from "../../components/wallet/card/Logo";
import defaultCardIcon from "../../../img/wallet/cards-icons/unknown.png";
import { getTitleFromCard } from "../../utils/paymentMethod";
import { Label } from "../../components/core/typography/Label";
import { IOColors } from "../../components/core/variables/IOColors";
import ButtonDefaultOpacity from "../../components/ButtonDefaultOpacity";
import { FavoritePaymentMethodSwitch } from "../../components/wallet/FavoriteMethodSwitch";
import LoadingSpinnerOverlay from "../../components/LoadingSpinnerOverlay";

type NavigationParams = Readonly<{
  selectedWallet: Wallet;
}>;

type OwnProps = NavigationInjectedProps<NavigationParams>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  walletBannerText: {
    alignItems: "flex-end",
    flexDirection: "row"
  },

  noBottomPadding: {
    padding: variables.contentPadding,
    paddingBottom: 0
  },

  whiteBg: {
    backgroundColor: variables.colorWhite
  },

  brandDarkGray: {
    color: variables.brandDarkGray
  },
  cardBox: {
    height: 152,
    paddingTop: 20,
    width: widthPercentageToDP("88%"),
    paddingBottom: 22,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.65,
    zIndex: Platform.OS === "android" ? 35 : 7,
    elevation: Platform.OS === "android" ? 35 : 7
  },
  cancelButton: {
    borderColor: IOColors.red,
    width: "100%"
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "wallet.walletCardTransaction.contextualHelpTitle",
  body: "wallet.walletCardTransaction.contextualHelpContent"
};

const HEADER_HEIGHT = 250;

const headerContent = (
  selectedWallet: Wallet,
  isFavorite: pot.Pot<boolean, Error>,
  setFavorite: (walletId?: number) => void,
  onDelete: (walletId: number) => void
) => (
  <>
    <View style={styles.cardBox}>
      <CardComponent
        type={"Header"}
        wallet={selectedWallet}
        hideFavoriteIcon={false}
        hideMenu={false}
        isFavorite={isFavorite}
        onSetFavorite={(willBeFavorite: boolean) =>
          handleSetFavourite(willBeFavorite, () =>
            setFavorite(selectedWallet.idWallet)
          )
        }
        onDelete={() => onDelete(selectedWallet.idWallet)}
      />
    </View>
  </>
);

const PaymentMethodDetailScreen: React.FC<Props> = (props: Props) => {
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const selectedWallet = props.navigation.getParam("selectedWallet");

  const isFavorite = pot.map(
    props.favoriteWalletId,
    _ => _ === selectedWallet.idWallet
  );

  // to retro-compatibility purpose
  const pm = pot.getOrElse(
    pot.map(props.paymentMethods, pms =>
      pms.find(pm => pm.idWallet === selectedWallet.idWallet)
    ),
    undefined
  );
  const { present } = useRemovePaymentMethodBottomSheet({
    icon: selectedWallet.creditCard
      ? getCardIconFromBrandLogo(selectedWallet.creditCard)
      : defaultCardIcon,
    caption:
      selectedWallet.paymentMethod &&
      isRawCreditCard(selectedWallet.paymentMethod)
        ? getTitleFromCard(selectedWallet.paymentMethod)
        : FOUR_UNICODE_CIRCLES
  });

  React.useEffect(() => {
    if (props.hasErrorDelete) {
      setIsLoadingDelete(false);
    }
  }, [props.hasErrorDelete]);

  const DeletePaymentMethodButton = (props: { onPress?: () => void }) => (
    <ButtonDefaultOpacity
      bordered={true}
      style={styles.cancelButton}
      onPress={props.onPress}
    >
      <Label color={"red"}>{I18n.t("cardComponent.removeCta")}</Label>
    </ButtonDefaultOpacity>
  );

  return isLoadingDelete ? (
    <LoadingSpinnerOverlay
      isLoading={isLoadingDelete}
      loadingCaption={I18n.t("cardComponent.deleteLoading")}
    />
  ) : (
    <WalletLayout
      title={I18n.t("wallet.paymentMethod")}
      allowGoBack={true}
      topContent={headerContent(
        selectedWallet,
        isFavorite,
        props.setFavoriteWallet,
        props.deleteWallet
      )}
      hideHeader={true}
      hasDynamicSubHeader={true}
      topContentHeight={HEADER_HEIGHT}
      contextualHelpMarkdown={contextualHelpMarkdown}
      faqCategories={["wallet_transaction"]}
    >
      {pm && (
        <>
          <View style={IOStyles.horizontalContentPadding}>
            <View spacer={true} extralarge={true} />
            <PaymentMethodCapabilities paymentMethod={pm} />
            <ItemSeparatorComponent noPadded={true} />
            <View spacer={true} large={true} />
            <FavoritePaymentMethodSwitch
              isLoading={
                pot.isLoading(props.favoriteWalletId) ||
                pot.isUpdating(props.favoriteWalletId)
              }
              switchValue={pot.getOrElse(isFavorite, false)}
              onValueChange={v =>
                handleSetFavourite(v, () =>
                  props.setFavoriteWallet(pm.idWallet)
                )
              }
            />
            <View spacer={true} />
            <ItemSeparatorComponent noPadded={true} />
            <View spacer={true} large={true} />
            <DeletePaymentMethodButton
              onPress={() =>
                present(() => {
                  props.deleteWallet(selectedWallet.idWallet);
                  setIsLoadingDelete(true);
                })
              }
            />
          </View>
          <EdgeBorderComponent />
        </>
      )}
    </WalletLayout>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  favoriteWalletId: getFavoriteWalletId(state),
  paymentMethods: paymentMethodsSelector(state),
  hasErrorDelete: pot.isError(getWalletsById(state))
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFavoriteWallet: (walletId?: number) =>
    dispatch(setFavouriteWalletRequest(walletId)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodDetailScreen);
