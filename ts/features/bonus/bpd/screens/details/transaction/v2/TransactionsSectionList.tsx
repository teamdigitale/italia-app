import { fromNullable } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import * as React from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo
} from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IOStyles } from "../../../../../../../components/core/variables/IOStyles";
import I18n from "../../../../../../../i18n";
import { GlobalState } from "../../../../../../../store/reducers/types";
import { localeDateFormat } from "../../../../../../../utils/locale";
import { showToast } from "../../../../../../../utils/showToast";
import BaseDailyTransactionHeader from "../../../../components/BaseDailyTransactionHeader";
import BpdTransactionSummaryComponent from "../../../../components/BpdTransactionSummaryComponent";
import { BpdTransactionItem } from "../../../../components/transactionItem/BpdTransactionItem";
import { AwardPeriodId } from "../../../../store/actions/periods";
import {
  BpdTransactionId,
  bpdTransactionsLoadPage
} from "../../../../store/actions/transactions";
import {
  atLeastOnePaymentMethodHasBpdEnabledSelector,
  paymentMethodsWithActivationStatusSelector
} from "../../../../store/reducers/details/combiner";
import { bpdLastUpdateSelector } from "../../../../store/reducers/details/lastUpdate";
import { bpdSelectedPeriodSelector } from "../../../../store/reducers/details/selectedPeriod";
import { bpdDaysInfoByIdSelector } from "../../../../store/reducers/details/transactionsv2/daysInfo";
import {
  bpdTransactionByIdSelector,
  bpdTransactionsGetNextCursor,
  bpdTransactionsSelector
} from "../../../../store/reducers/details/transactionsv2/ui";
import { NoPaymentMethodAreActiveWarning } from "../BpdAvailableTransactionsScreen";
import BpdCashbackMilestoneComponent from "../BpdCashbackMilestoneComponent";
import BpdEmptyTransactionsList from "../BpdEmptyTransactionsList";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const renderSectionHeader = (
  info: { section: SectionListData<BpdTransactionId> },
  // we need to pass props as argument because with the current react-redux version useSelect cannot be used
  props: Props
) =>
  props
    .bpdDaysInfoByIdSelector(info.section.dayInfoId)
    .fold(null, daysInfo => (
      <BaseDailyTransactionHeader
        date={localeDateFormat(
          daysInfo.trxDate,
          I18n.t("global.dateFormats.dayFullMonth")
        )}
        transactionsNumber={daysInfo.count}
      />
    ));

const renderItem = (
  trxId: SectionListRenderItemInfo<BpdTransactionId>,
  // we need to pass props as argument because with the current react-redux version useSelect cannot be used
  props: Props
): React.ReactElement | null =>
  props.bpdTransactionByIdSelector(trxId.item).fold(null, trx => (
    <>
      {trx.isPivot && (
        <BpdCashbackMilestoneComponent
          cashbackValue={fromNullable(props.selectedPeriod).fold(
            0,
            p => p.maxPeriodCashback
          )}
        />
      )}
      <BpdTransactionItem transaction={trx} />
    </>
  ));

/**
 * The header of the transactions list
 * @param props
 * @constructor
 */
const TransactionsHeader = (
  props: Pick<Props, "selectedPeriod" | "maybeLastUpdateDate">
) => (
  <View style={IOStyles.horizontalContentPadding}>
    <View spacer={true} />
    {props.selectedPeriod && pot.isSome(props.maybeLastUpdateDate) && (
      <>
        <BpdTransactionSummaryComponent
          lastUpdateDate={localeDateFormat(
            props.maybeLastUpdateDate.value,
            I18n.t("global.dateFormats.fullFormatFullMonthLiteral")
          )}
          period={props.selectedPeriod}
          totalAmount={props.selectedPeriod.amount}
        />
        <View spacer={true} />
      </>
    )}
  </View>
);

/**
 * This component is rendered when no transactions are available
 * @param props
 * @constructor
 */
const TransactionsEmpty = (
  props: Pick<Props, "potWallets" | "atLeastOnePaymentMethodActive">
) => (
  <View style={IOStyles.horizontalContentPadding} testID={"TransactionsEmpty"}>
    {!props.atLeastOnePaymentMethodActive &&
    pot.isSome(props.potWallets) &&
    props.potWallets.value.length > 0 ? (
      <NoPaymentMethodAreActiveWarning />
    ) : (
      <BpdEmptyTransactionsList />
    )}
  </View>
);

/**
 * Loading item, placed in the footer during the loading of the next page
 * @constructor
 */
const FooterLoading = () => (
  <>
    <View spacer={true} />
    <ActivityIndicator
      color={"black"}
      accessible={false}
      importantForAccessibility={"no-hide-descendants"}
      accessibilityElementsHidden={true}
      testID={"activityIndicator"}
    />
  </>
);

const TransactionsSectionList = (props: Props): React.ReactElement => {
  const isError = pot.isError(props.potTransactions);
  const isLoading = pot.isLoading(props.potTransactions);
  const transactions = pot.getOrElse(props.potTransactions, []);

  useEffect(() => {
    if (isError) {
      showToast(I18n.t("global.genericError"), "danger");
    }
  }, [isError]);

  return (
    <SectionList
      testID={"TransactionsSectionList"}
      renderSectionHeader={info => renderSectionHeader(info, props)}
      ListHeaderComponent={<TransactionsHeader {...props} />}
      ListEmptyComponent={<TransactionsEmpty {...props} />}
      ListFooterComponent={isLoading && <FooterLoading />}
      onEndReached={() => {
        if (props.selectedPeriod && props.nextCursor && !isLoading) {
          props.loadNextPage(
            props.selectedPeriod.awardPeriodId,
            props.nextCursor
          );
        }
      }}
      onEndReachedThreshold={0.2}
      scrollEnabled={true}
      stickySectionHeadersEnabled={true}
      sections={transactions}
      renderItem={ri => renderItem(ri, props)}
      keyExtractor={t => t}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNextPage: (awardPeriodId: AwardPeriodId, nextCursor: number) =>
    dispatch(bpdTransactionsLoadPage.request({ awardPeriodId, nextCursor }))
});

const mapStateToProps = (state: GlobalState) => ({
  selectedPeriod: bpdSelectedPeriodSelector(state),
  maybeLastUpdateDate: bpdLastUpdateSelector(state),
  potWallets: paymentMethodsWithActivationStatusSelector(state),
  atLeastOnePaymentMethodActive: atLeastOnePaymentMethodHasBpdEnabledSelector(
    state
  ),
  potTransactions: bpdTransactionsSelector(state),
  nextCursor: bpdTransactionsGetNextCursor(state),
  bpdTransactionByIdSelector: (trxId: BpdTransactionId) =>
    bpdTransactionByIdSelector(state, trxId),
  bpdDaysInfoByIdSelector: (id: string) => bpdDaysInfoByIdSelector(state, id)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsSectionList);