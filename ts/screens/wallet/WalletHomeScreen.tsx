import { fromNullable, fromPredicate, none } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { Content, Text, View } from "native-base";
import * as React from "react";
import { BackHandler, Image, StyleSheet } from "react-native";
import {
  NavigationEvents,
  NavigationEventSubscription,
  NavigationInjectedProps
} from "react-navigation";
import { connect } from "react-redux";
import { BonusActivationWithQrCode } from "../../../definitions/bonus_vacanze/BonusActivationWithQrCode";
import { TypeEnum } from "../../../definitions/pagopa/Wallet";
import ButtonDefaultOpacity from "../../components/ButtonDefaultOpacity";
import { withLightModalContext } from "../../components/helpers/withLightModalContext";
import { withValidatedEmail } from "../../components/helpers/withValidatedEmail";
import { withValidatedPagoPaVersion } from "../../components/helpers/withValidatedPagoPaVersion";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import IconFont from "../../components/ui/IconFont";
import { LightModalContextInterface } from "../../components/ui/LightModal";
import { RotatedCards } from "../../components/wallet/card/RotatedCards";
import SectionCardComponent, {
  SectionCardStatus
} from "../../components/wallet/card/SectionCardComponent";
import TransactionsList from "../../components/wallet/TransactionsList";
import WalletLayout from "../../components/wallet/WalletLayout";
import { bonusVacanzeEnabled, bpdEnabled } from "../../config";
import RequestBonus from "../../features/bonus/bonusVacanze/components/RequestBonus";
import {
  navigateToAvailableBonusScreen,
  navigateToBonusActiveDetailScreen
} from "../../features/bonus/bonusVacanze/navigation/action";
import {
  loadAllBonusActivations,
  loadAvailableBonuses
} from "../../features/bonus/bonusVacanze/store/actions/bonusVacanze";
import { allBonusActiveSelector } from "../../features/bonus/bonusVacanze/store/reducers/allActive";
import { availableBonusTypesSelector } from "../../features/bonus/bonusVacanze/store/reducers/availableBonusesTypes";
import BpdCardsInWalletContainer from "../../features/bonus/bpd/components/walletCardContainer/BpdCardsInWalletComponent";
import NewPaymentMethodAddedNotifier from "../../features/wallet/component/NewMethodAddedNotifier";
import { bpdPeriodsAmountWalletVisibleSelector } from "../../features/bonus/bpd/store/reducers/details/combiner";
import FeaturedCardCarousel from "../../features/wallet/component/FeaturedCardCarousel";
import WalletV2PreviewCards from "../../features/wallet/component/WalletV2PreviewCards";
import I18n from "../../i18n";
import {
  navigateBack,
  navigateToPaymentScanQrCode,
  navigateToTransactionDetailsScreen,
  navigateToWalletAddPaymentMethod,
  navigateToWalletList,
  navigateToWalletTransactionsScreen
} from "../../store/actions/navigation";
import { Dispatch } from "../../store/actions/types";
import {
  fetchTransactionsLoadComplete,
  fetchTransactionsRequestWithExpBackoff,
  readTransaction
} from "../../store/actions/wallet/transactions";
import { fetchWalletsRequestWithExpBackoff } from "../../store/actions/wallet/wallets";
import { transactionsReadSelector } from "../../store/reducers/entities";
import { navSelector } from "../../store/reducers/navigationHistory";
import { paymentsHistorySelector } from "../../store/reducers/payments/history";
import { isPagoPATestEnabledSelector } from "../../store/reducers/persistedPreferences";
import { GlobalState } from "../../store/reducers/types";
import { creditCardAttemptionsSelector } from "../../store/reducers/wallet/creditCard";
import {
  areMoreTransactionsAvailable,
  getTransactionsLoadedLength,
  latestTransactionsSelector
} from "../../store/reducers/wallet/transactions";
import { pagoPaCreditCardWalletV1Selector } from "../../store/reducers/wallet/wallets";
import customVariables from "../../theme/variables";
import variables from "../../theme/variables";
import { Transaction, Wallet } from "../../types/pagopa";
import { isUpdateNeeded } from "../../utils/appVersion";
import { setStatusBarColorAndBackground } from "../../utils/statusBar";
import { bpdEnabledSelector } from "../../features/bonus/bpd/store/reducers/details/activation";
import {
  isLoading,
  isReady,
  isError as isRemoteValueError
} from "../../features/bonus/bpd/model/RemoteValue";
import SectionStatusComponent from "../../components/SectionStatusComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import { isStrictSome } from "../../utils/pot";
import { bpdDetailsLoadAll } from "../../features/bonus/bpd/store/actions/details";
import { showToast } from "../../utils/showToast";
import WalletHomeHeader from "../../components/wallet/WalletHomeHeader";

type NavigationParams = Readonly<{
  newMethodAdded: boolean;
  keyFrom?: string;
}>;

type State = {
  hasFocus: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NavigationInjectedProps<NavigationParams> &
  LightModalContextInterface;

const styles = StyleSheet.create({
  inLineSpace: {
    lineHeight: 20
  },
  addDescription: {
    lineHeight: 24,
    fontSize: variables.fontSize1
  },
  white: {
    color: variables.colorWhite
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  flex1: {
    flex: 1
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  emptyListWrapper: {
    padding: variables.contentPadding,
    alignItems: "center"
  },
  emptyListContentTitle: {
    paddingBottom: variables.contentPadding / 2
  },
  bordercColorBrandGray: {
    borderColor: variables.brandGray
  },
  colorBrandGray: {
    color: variables.brandGray
  },
  brandDarkGray: {
    color: variables.brandDarkGray
  },
  whiteBg: {
    backgroundColor: variables.colorWhite
  },
  noBottomPadding: {
    padding: variables.contentPadding,
    paddingBottom: 0
  },
  center: {
    alignSelf: "center"
  },
  end: {
    alignSelf: "flex-end"
  },

  centered: {
    textAlign: "center"
  },
  textStyleHelp: {
    lineHeight: 18
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "wallet.contextualHelpTitle",
  body: "wallet.contextualHelpContent"
};

/**
 * Wallet home screen, with a list of recent transactions and payment methods,
 * a "pay notice" button and payment methods info/button to add new ones
 */
class WalletHomeScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasFocus: false };
  }

  get newMethodAdded() {
    return this.props.navigation.getParam("newMethodAdded");
  }

  get navigationKeyFrom() {
    return this.props.navigation.getParam("keyFrom");
  }

  private navListener?: NavigationEventSubscription;

  private handleBackPress = () => {
    fromPredicate((cond: boolean) => cond)(this.newMethodAdded).foldL(
      () => {
        this.props.navigateBack();
      },
      _ => {
        fromNullable(this.navigationKeyFrom).foldL(
          () => {
            this.props.navigation.setParams({ newMethodAdded: false });
            this.props.navigateToWalletList();
          },
          k => {
            this.props.navigateBack(k);
          }
        );
      }
    );
    return true;
  };

  private onFocus = () => {
    this.loadBonusVacanze();
    this.setState({ hasFocus: true });
  };

  private onLostFocus = () => {
    this.setState({ hasFocus: false });
  };

  private loadBonusVacanze = () => {
    if (bonusVacanzeEnabled) {
      this.props.loadAvailableBonuses();
      this.props.loadAllBonusActivations();
    }
  };

  private loadBonusBpd = () => {
    if (bpdEnabled) {
      this.props.loadBpdDetails();
    }
  };

  public componentDidMount() {
    // WIP loadTransactions should not be called from here
    // (transactions should be persisted & fetched periodically)
    // https://www.pivotaltracker.com/story/show/168836972

    // FIXME restore loadWallets and loadTransactions see https://www.pivotaltracker.com/story/show/176051000
    // this.props.loadWallets();
    // this.props.loadTransactions(this.props.transactionsLoadedLength);

    // eslint-disable-next-line functional/immutable-data
    this.navListener = this.props.navigation.addListener("didFocus", () => {
      setStatusBarColorAndBackground(
        "light-content",
        customVariables.brandDarkGray
      );
    }); // eslint-disable-line
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  public componentWillUnmount() {
    if (this.navListener) {
      this.navListener.remove();
    }
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    // check when all transactions are been loaded
    // then dispatch an action to notify the loading is completed
    if (
      prevProps.areMoreTransactionsAvailable &&
      !this.props.areMoreTransactionsAvailable &&
      pot.isSome(this.props.potTransactions)
    ) {
      this.props.dispatchAllTransactionLoaded(this.props.potTransactions.value);
    }
    if (
      this.state.hasFocus &&
      // error loading: bpd bonus
      ((!isRemoteValueError(prevProps.bpdActiveBonus) &&
        isRemoteValueError(this.props.bpdActiveBonus)) ||
        // error loading: bonus vacanze
        (prevProps.allActiveBonus.some(ab => !pot.isError(ab)) &&
          this.props.allActiveBonus.some(ab => pot.isError(ab))) ||
        // error loading: wallet
        (!pot.isError(prevProps.potWallets) &&
          pot.isError(this.props.potWallets)))
    ) {
      showToast(I18n.t("wallet.errors.loadingData"));
    }
  }

  private cardHeader(isError: boolean = false) {
    const sectionCardStatus: SectionCardStatus = pot.fold(
      this.props.potWallets,
      () => "show",
      () => "loading",
      _ => "loading",
      _ => "show",
      _ => "refresh",
      _ => "loading",
      _ => "loading",
      _ => "refresh"
    );
    return (
      <SectionCardComponent
        status={sectionCardStatus}
        label={I18n.t("wallet.paymentMethods")}
        onPress={() => {
          if (sectionCardStatus !== "loading") {
            this.props.loadWallets();
          }
        }}
        isError={isError}
      />
    );
  }

  private getCreditCards = () =>
    pot
      .getOrElse(this.props.potWallets, [])
      .filter(w => w.type === TypeEnum.CREDIT_CARD);

  private getBonusLoadingStatus = (): SectionCardStatus => {
    // if any bonus is loading or updating
    // note: in the BPD case, we are watching for loading on one of several steps
    // so this loading state is very weak
    if (
      isLoading(this.props.bpdActiveBonus) ||
      this.props.allActiveBonus.find(
        ab => pot.isLoading(ab) || (pot.isNone(ab) && !pot.isError(ab))
      )
    ) {
      return "loading";
    }
    // if at least one bonus is some
    if (
      this.props.allActiveBonus.length === 0 ||
      this.props.allActiveBonus.every(ab => isStrictSome(ab)) ||
      isReady(this.props.bpdActiveBonus)
    ) {
      return "refresh";
    }
    return "show";
  };

  private cardPreview() {
    const wallets = this.getCreditCards();
    // we have to render only wallets of credit card type
    const validWallets = wallets.filter(w => w.type === TypeEnum.CREDIT_CARD);
    const bonusLoadingStatus = this.getBonusLoadingStatus();
    return (
      <View>
        <View spacer={true} />
        {this.cardHeader(false)}

        {validWallets.length > 0 ? (
          <RotatedCards
            wallets={validWallets}
            onClick={this.props.navigateToWalletTransactionsScreen}
          />
        ) : null}
        {/* new payment method rendering (bancomat, bancomatPay, satispay) */}
        {bpdEnabled && <WalletV2PreviewCards />}

        {/* Display this item only if the flag is enabled */}
        {(bonusVacanzeEnabled || bpdEnabled) && (
          <RequestBonus
            status={bonusLoadingStatus}
            onButtonPress={() => {
              if (bonusLoadingStatus !== "loading") {
                this.loadBonusVacanze();
                this.loadBonusBpd();
              }
            }}
            activeBonuses={this.props.allActiveBonus}
            availableBonusesList={this.props.availableBonusesList}
            onBonusPress={this.props.navigateToBonusDetail}
          />
        )}
        {bpdEnabled && <BpdCardsInWalletContainer />}
      </View>
    );
  }

  private renderHelpMessage = (
    alignCenter: boolean = false
  ): React.ReactNode => (
    <React.Fragment>
      <View spacer={true} large={true} />
      <Text style={alignCenter ? styles.centered : undefined}>
        {`${I18n.t("wallet.transactionHelpMessage.text1")} `}
        <Text style={alignCenter ? styles.centered : undefined} bold={true}>
          {I18n.t("wallet.transactionHelpMessage.text2")}
        </Text>
      </Text>
    </React.Fragment>
  );

  private transactionError(renderHelp: boolean) {
    return (
      <Content
        scrollEnabled={false}
        style={[styles.noBottomPadding, styles.whiteBg, styles.flex1]}
      >
        {renderHelp && this.renderHelpMessage()}
        <View spacer={true} large={true} />
        <Text style={[styles.inLineSpace, styles.brandDarkGray]}>
          {I18n.t("wallet.latestTransactions")}
        </Text>
        <View spacer={true} />
        <ButtonDefaultOpacity
          block={true}
          light={true}
          bordered={true}
          small={true}
          onPress={() =>
            this.props.loadTransactions(this.props.transactionsLoadedLength)
          }
        >
          <Text primary={true}>{I18n.t("wallet.transactionsShow")}</Text>
        </ButtonDefaultOpacity>
        <EdgeBorderComponent />
      </Content>
    );
  }

  private listEmptyComponent(renderHelpInfoBox: boolean) {
    return (
      <Content scrollEnabled={false} noPadded={true}>
        <View style={styles.emptyListWrapper}>
          {renderHelpInfoBox && this.renderHelpMessage(true)}
          <Text style={styles.emptyListContentTitle}>
            {I18n.t("wallet.noTransactionsInWalletHome")}
          </Text>
          <Image
            source={require("../../../img/messages/empty-transaction-list-icon.png")}
          />
        </View>
      </Content>
    );
  }

  private handleLoadMoreTransactions = () => {
    this.props.loadTransactions(this.props.transactionsLoadedLength);
  };

  private transactionList(
    potTransactions: pot.Pot<ReadonlyArray<Transaction>, Error>,
    renderHelpInfoBox: boolean
  ) {
    return (
      <TransactionsList
        title={I18n.t("wallet.latestTransactions")}
        amount={I18n.t("wallet.amount")}
        transactions={potTransactions}
        helpMessage={renderHelpInfoBox ? this.renderHelpMessage() : undefined}
        areMoreTransactionsAvailable={this.props.areMoreTransactionsAvailable}
        onLoadMoreTransactions={this.handleLoadMoreTransactions}
        navigateToTransactionDetails={
          this.props.navigateToTransactionDetailsScreen
        }
        readTransactions={this.props.readTransactions}
        ListEmptyComponent={this.listEmptyComponent(renderHelpInfoBox)}
      />
    );
  }

  private newMethodAddedContent = (
    <Content>
      <IconFont
        name={"io-close"}
        style={styles.end}
        onPress={this.handleBackPress}
      />
      <IconFont
        name={"io-complete"}
        size={120}
        color={customVariables.brandHighlight}
        style={styles.center}
      />
      <View spacer={true} />

      <Text alignCenter={true}>{`${I18n.t("global.genericThanks")},`}</Text>
      <Text alignCenter={true} bold={true}>
        {I18n.t("wallet.newPaymentMethod.successful")}
      </Text>
    </Content>
  );

  private footerButton(potWallets: pot.Pot<ReadonlyArray<Wallet>, Error>) {
    return (
      <ButtonDefaultOpacity
        block={true}
        onPress={
          pot.isSome(potWallets)
            ? this.props.navigateToPaymentScanQrCode
            : undefined
        }
        activeOpacity={1}
      >
        <IconFont name="io-qr" style={styles.white} />
        <Text>{I18n.t("wallet.payNotice")}</Text>
      </ButtonDefaultOpacity>
    );
  }

  public render(): React.ReactNode {
    const {
      potWallets,
      potTransactions,
      anyHistoryPayments,
      anyCreditCardAttempts
    } = this.props;

    const headerContent = (
      <>
        <WalletHomeHeader />
        {this.cardPreview()}
      </>
    );
    const transactionContent =
      pot.isError(potTransactions) ||
      (pot.isNone(potTransactions) &&
        !pot.isLoading(potTransactions) &&
        !pot.isUpdating(potTransactions))
        ? this.transactionError(anyHistoryPayments || anyCreditCardAttempts)
        : this.transactionList(
            potTransactions,
            anyHistoryPayments || anyCreditCardAttempts
          );

    const footerContent =
      pot.isSome(potWallets) && !this.newMethodAdded
        ? this.footerButton(potWallets)
        : undefined;

    return (
      <WalletLayout
        accessibilityLabel={I18n.t("wallet.wallet")}
        title={I18n.t("wallet.wallet")}
        allowGoBack={false}
        appLogo={true}
        hideHeader={true}
        topContentHeight={this.getHeaderHeight()}
        hasDynamicSubHeader={true}
        topContent={headerContent}
        footerContent={footerContent}
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={["wallet", "wallet_methods"]}
        gradientHeader={true}
        headerPaddingMin={true}
        footerFullWidth={<SectionStatusComponent sectionKey={"wallets"} />}
      >
        {this.newMethodAdded ? (
          this.newMethodAddedContent
        ) : (
          <>
            {bpdEnabled && (
              <FeaturedCardCarousel
                bvActive={this.props.allActiveBonus.length > 0}
              />
            )}
            {transactionContent}
          </>
        )}
        {bonusVacanzeEnabled && (
          <NavigationEvents
            onWillFocus={this.onFocus}
            onWillBlur={this.onLostFocus}
          />
        )}
        {bpdEnabled && <NewPaymentMethodAddedNotifier />}
      </WalletLayout>
    );
  }

  private getHeaderHeight() {
    return (
      250 +
      (bonusVacanzeEnabled ? this.props.allActiveBonus.length * 65 : 0) +
      (bpdEnabled
        ? pot.getOrElse(this.props.periodsWithAmount, []).length * 88
        : 0) +
      this.getCreditCards().length * 56
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  const isPagoPaVersionSupported = fromNullable(state.backendInfo.serverInfo)
    .map(si => !isUpdateNeeded(si, "min_app_version_pagopa"))
    .getOrElse(true);

  const potAvailableBonuses = availableBonusTypesSelector(state);
  return {
    periodsWithAmount: bpdPeriodsAmountWalletVisibleSelector(state),
    allActiveBonus: allBonusActiveSelector(state),
    availableBonusesList: pot.getOrElse(potAvailableBonuses, []),
    potWallets: pagoPaCreditCardWalletV1Selector(state),
    anyHistoryPayments: paymentsHistorySelector(state).length > 0,
    anyCreditCardAttempts: creditCardAttemptionsSelector(state).length > 0,
    potTransactions: latestTransactionsSelector(state),
    transactionsLoadedLength: getTransactionsLoadedLength(state),
    areMoreTransactionsAvailable: areMoreTransactionsAvailable(state),
    isPagoPATestEnabled: isPagoPATestEnabledSelector(state),
    readTransactions: transactionsReadSelector(state),
    nav: navSelector(state),
    isPagoPaVersionSupported,
    bpdActiveBonus: bpdEnabledSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBpdDetails: () => dispatch(bpdDetailsLoadAll()),
  navigateToWalletAddPaymentMethod: (keyFrom?: string) =>
    dispatch(navigateToWalletAddPaymentMethod({ inPayment: none, keyFrom })),
  navigateToWalletTransactionsScreen: (selectedWallet: Wallet) =>
    dispatch(navigateToWalletTransactionsScreen({ selectedWallet })),
  navigateToWalletList: () => dispatch(navigateToWalletList()),
  navigateToPaymentScanQrCode: () => dispatch(navigateToPaymentScanQrCode()),
  navigateToTransactionDetailsScreen: (transaction: Transaction) => {
    dispatch(readTransaction(transaction));
    dispatch(
      navigateToTransactionDetailsScreen({
        transaction,
        isPaymentCompletedTransaction: false
      })
    );
  },
  loadAvailableBonuses: () => dispatch(loadAvailableBonuses.request()),
  loadAllBonusActivations: () => dispatch(loadAllBonusActivations.request()),
  navigateToBonusDetail: (
    bonus: BonusActivationWithQrCode,
    validFrom?: Date,
    validTo?: Date
  ) =>
    dispatch(navigateToBonusActiveDetailScreen({ bonus, validFrom, validTo })),
  navigateToBonusList: () => dispatch(navigateToAvailableBonusScreen()),
  navigateBack: (keyFrom?: string) => dispatch(navigateBack({ key: keyFrom })),
  loadTransactions: (start: number) =>
    dispatch(fetchTransactionsRequestWithExpBackoff({ start })),
  loadWallets: () => dispatch(fetchWalletsRequestWithExpBackoff()),
  dispatchAllTransactionLoaded: (transactions: ReadonlyArray<Transaction>) =>
    dispatch(fetchTransactionsLoadComplete(transactions))
});

export default withValidatedPagoPaVersion(
  withValidatedEmail(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withLightModalContext(WalletHomeScreen))
  )
);
