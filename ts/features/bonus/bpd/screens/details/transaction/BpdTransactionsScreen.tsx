import * as pot from "italia-ts-commons/lib/pot";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GlobalState } from "../../../../../../store/reducers/types";
import { EnhancedBpdTransaction } from "../../../components/transactionItem/BpdTransactionItem";
import { bpdAllData } from "../../../store/actions/details";
import { bpdDisplayTransactionsSelector } from "../../../store/reducers/details/combiner";
import { bpdLastUpdateSelector } from "../../../store/reducers/details/lastUpdate";
import BpdAvailableTransactionsScreen from "./BpdAvailableTransactionsScreen";
import LoadTransactions from "./LoadTransactions";
import TransactionsUnavailable from "./TransactionsUnavailable";

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

/**
 * Associate at every state of the pot transactions status the right screen to show
 * @param transactions
 */
const handleTransactionsStatus = (
  transactions: pot.Pot<ReadonlyArray<EnhancedBpdTransaction>, Error>
) =>
  pot.fold(
    transactions,
    () => <BpdAvailableTransactionsScreen />,
    () => <LoadTransactions />,
    _ => <LoadTransactions />,
    _ => <TransactionsUnavailable />,
    _ => <BpdAvailableTransactionsScreen />,
    _ => <LoadTransactions />,
    _ => <LoadTransactions />,
    _ => <TransactionsUnavailable />
  );

/**
 * Display all the transactions for a specific period if available, in other case show a loading or an error screen.
 * First check the whole bpd status than if is some check the transactions status.
 * @constructor
 */
const BpdTransactionsScreen: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    if (
      pot.isError(props.bpdLastUpdate) ||
      pot.isError(props.transactionForSelectedPeriod)
    ) {
      props.loadTransactions();
    }
  }, []);

  return pot.fold(
    props.bpdLastUpdate,
    () => <TransactionsUnavailable />,
    () => <LoadTransactions />,
    _ => <LoadTransactions />,
    _ => <TransactionsUnavailable />,
    _ => handleTransactionsStatus(props.transactionForSelectedPeriod),
    _ => <LoadTransactions />,
    _ => <LoadTransactions />,
    _ => <TransactionsUnavailable />
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTransactions: () => dispatch(bpdAllData.request())
});

const mapStateToProps = (state: GlobalState) => ({
  transactionForSelectedPeriod: bpdDisplayTransactionsSelector(state),
  bpdLastUpdate: bpdLastUpdateSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BpdTransactionsScreen);
