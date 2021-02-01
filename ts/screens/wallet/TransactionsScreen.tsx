/**
 * This screen dispalys a list of transactions
 * from a specific credit card
 */
import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { IOStyles } from "../../components/core/variables/IOStyles";
import ItemSeparatorComponent from "../../components/ItemSeparatorComponent";

import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import CardComponent from "../../components/wallet/card/CardComponent";
import WalletLayout from "../../components/wallet/WalletLayout";
import PaymentMethodCapabilities from "../../features/wallet/component/PaymentMethodCapabilities";
import I18n from "../../i18n";
import {
  navigateToWalletHome,
  navigateToWalletList
} from "../../store/actions/navigation";
import { Dispatch } from "../../store/actions/types";
import {
  deleteWalletRequest,
  setFavouriteWalletRequest
} from "../../store/actions/wallet/wallets";
import { GlobalState } from "../../store/reducers/types";
import {
  getFavoriteWalletId,
  paymentMethodsSelector
} from "../../store/reducers/wallet/wallets";
import { Wallet } from "../../types/pagopa";
import { showToast } from "../../utils/showToast";
import { handleSetFavourite } from "../../utils/wallet";


type NavigationParams = Readonly<{
  selectedWallet: Wallet;
}>;

type OwnProps = NavigationInjectedProps<NavigationParams>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "wallet.walletCardTransaction.contextualHelpTitle",
  body: "wallet.walletCardTransaction.contextualHelpContent"
};

const HEADER_HEIGHT = 250;

const TransactionsScreen: React.FunctionComponent<Props> = (props: Props) => {
  const headerContent = (
    selectedWallet: Wallet,
    isFavorite: pot.Pot<boolean, Error>
  ) => (
    <React.Fragment>
      <CardComponent
        type={"Header"}
        wallet={selectedWallet}
        hideFavoriteIcon={false}
        hideMenu={false}
        isFavorite={isFavorite}
        onSetFavorite={(willBeFavorite: boolean) =>
          handleSetFavourite(willBeFavorite, () =>
            props.setFavoriteWallet(selectedWallet.idWallet)
          )
        }
        onDelete={() => props.deleteWallet(selectedWallet.idWallet)}
      />
    </React.Fragment>
  );

  const selectedWallet = props.navigation.getParam("selectedWallet");

  const isFavorite = pot.map(
    props.favoriteWallet,
    _ => _ === selectedWallet.idWallet
  );

  const pm = pot.getOrElse(
    pot.map(props.paymentMethods, pms =>
      pms.find(pm => pm.idWallet === selectedWallet.idWallet)
    ),
    undefined
  );

  return (
    <WalletLayout
      title={I18n.t("wallet.paymentMethod")}
      allowGoBack={true}
      topContent={headerContent(selectedWallet, isFavorite)}
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
            <View spacer={true} />
            <ItemSeparatorComponent noPadded={true} />
          </View>
          <EdgeBorderComponent />
        </>

      )}
    </WalletLayout>
  );
}

const mapStateToProps = (state: GlobalState) => ({
  favoriteWallet: getFavoriteWalletId(state),
  paymentMethods: paymentMethodsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFavoriteWallet: (walletId?: number) =>
    dispatch(setFavouriteWalletRequest(walletId)),
  deleteWallet: (walletId: number) =>
    dispatch(
      deleteWalletRequest({
        walletId,
        onSuccess: action => {
          showToast(I18n.t("wallet.delete.successful"), "success");
          if (action.payload.length > 0) {
            dispatch(navigateToWalletList());
          } else {
            dispatch(navigateToWalletHome());
          }
        },
        onFailure: _ => {
          showToast(I18n.t("wallet.delete.failed"), "danger");
        }
      })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
