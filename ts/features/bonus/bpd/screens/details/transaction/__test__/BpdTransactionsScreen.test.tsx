import { render } from "@testing-library/react-native";
import * as React from "react";
import * as pot from "italia-ts-commons/lib/pot";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Store } from "redux";
import BpdTransactionsScreen from "../BpdTransactionsScreen";
import * as transactionsReducer from "../../../../store/reducers/details/combiner";
import * as lastUpdateReducer from "../../../../store/reducers/details/lastUpdate";
import { EnhancedBpdTransaction } from "../../../../components/transactionItem/BpdTransactionItem";
import * as LoadTransactions from "../LoadTransactions";
import * as TransactionsUnavailable from "../TransactionsUnavailable";
import { remoteReady } from "../../../../model/RemoteValue";

jest.mock("react-navigation", () => ({
  NavigationEvents: "mockNavigationEvents",
  StackActions: {
    push: jest
      .fn()
      .mockImplementation(x => ({ ...x, type: "Navigation/PUSH" })),
    replace: jest
      .fn()
      .mockImplementation(x => ({ ...x, type: "Navigation/REPLACE" })),
    reset: jest.fn()
  },
  NavigationActions: {
    navigate: jest.fn().mockImplementation(x => x)
  },
  createStackNavigator: jest.fn(),
  withNavigation: (component: any) => component
}));

describe("BpdTransactionsScreen", () => {
  const mockStore = configureMockStore();
  // eslint-disable-next-line functional/no-let
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      bonus: { bpd: { details: { lastUpdate: pot.none } } },
      wallet: {
        wallets: { walletById: pot.some({} as EnhancedBpdTransaction) },
        abi: remoteReady([])
      },
      content: { contextualHelp: pot.none },
      search: { isSearchEnabled: false },
      persistedPreferences: { isPagoPATestEnabled: false },
      network: { isConnected: true },
      instabug: { unreadMessages: 0 },
      authentication: {
        kind: "LoggedOutWithoutIdp",
        reason: "NOT_LOGGED_IN"
      }
    });
  });

  it.each`
    bpdLastUpdate
    ${pot.noneLoading}
    ${pot.noneUpdating({} as Date)}
    ${pot.someLoading({} as Date)}
    ${pot.someUpdating({} as Date, {} as Date)}
  `(
    "should show loading screen if $bpdLastUpdate is pot.loading or pot.updating ",
    ({ bpdLastUpdate }) => {
      jest
        .spyOn(lastUpdateReducer, "bpdLastUpdateSelector")
        .mockReturnValue(bpdLastUpdate);
      jest
        .spyOn(transactionsReducer, "bpdDisplayTransactionsSelector")
        .mockReturnValue(pot.none);
      const myspy = jest.spyOn(LoadTransactions, "default");

      getComponent(store);
      expect(myspy).toHaveBeenCalled();
    }
  );
  it.each`
    bpdDisplayTransactions
    ${pot.noneLoading}
    ${pot.noneUpdating([])}
    ${pot.someLoading([])}
    ${pot.someUpdating([], [])}
  `(
    "should show loading screen if $bpdDisplayTransactions is pot.loading or pot.updating and bpdLastUpdate is pot.Some",
    ({ bpdDisplayTransactions }) => {
      jest
        .spyOn(transactionsReducer, "bpdDisplayTransactionsSelector")
        .mockReturnValue(bpdDisplayTransactions);
      const myspy = jest.spyOn(LoadTransactions, "default");

      getComponent(store);
      expect(myspy).toHaveBeenCalled();
    }
  );
  it.each`
    bpdLastUpdate
    ${pot.none}
    ${pot.noneError({})}
    ${pot.someError({} as Date, {} as Error)}
  `(
    "should show unavailable screen if $bpdLastUpdate is pot.Error",
    ({ bpdLastUpdate }) => {
      jest
        .spyOn(lastUpdateReducer, "bpdLastUpdateSelector")
        .mockReturnValue(bpdLastUpdate);
      jest
        .spyOn(transactionsReducer, "bpdDisplayTransactionsSelector")
        .mockReturnValue(pot.none);

      const myspy = jest.spyOn(TransactionsUnavailable, "default");

      getComponent(store);

      expect(myspy).toHaveBeenCalled();
    }
  );
  it.each`
    bpdDisplayTransactions
    ${pot.noneError({})}
    ${pot.someError({}, {} as Error)}
  `(
    "should show unavailable screen if $bpdDisplayTransactions is pot.Error and bpdLastUpdateSelector is pot.Some",
    ({ bpdDisplayTransactions }) => {
      jest
        .spyOn(lastUpdateReducer, "bpdLastUpdateSelector")
        .mockReturnValue(pot.some({} as Date));
      jest
        .spyOn(transactionsReducer, "bpdDisplayTransactionsSelector")
        .mockReturnValue(bpdDisplayTransactions);

      const myspy = jest.spyOn(TransactionsUnavailable, "default");

      getComponent(store);

      expect(myspy).toHaveBeenCalled();
    }
  );

  it.each`
    bpdDisplayTransactions
    ${pot.none}
    ${pot.some([])}
  `(
    "should show unavailable screen if $bpdDisplayTransactions is pot.Error and bpdLastUpdateSelector is pot.Some",
    ({ bpdDisplayTransactions }) => {
      jest.useFakeTimers();
      jest
        .spyOn(lastUpdateReducer, "bpdLastUpdateSelector")
        .mockReturnValue(pot.some(new Date()));
      jest
        .spyOn(transactionsReducer, "bpdDisplayTransactionsSelector")
        .mockReturnValue(bpdDisplayTransactions);

      const component = getComponent(store);
      expect(
        component.getByTestId("BpdAvailableTransactionsScreen")
      ).toBeDefined();
    }
  );
});

const getComponent = (store: Store<unknown>) =>
  render(
    <Provider store={store}>
      <BpdTransactionsScreen />
    </Provider>
  );
