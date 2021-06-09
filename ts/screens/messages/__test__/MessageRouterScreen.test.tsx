import * as pot from "italia-ts-commons/lib/pot";
import {
  FiscalCode,
  IPatternStringTag,
  NonEmptyString,
  WithinRangeString
} from "italia-ts-commons/lib/strings";
import { NavigationParams } from "react-navigation";
import { createStore } from "redux";
import configureMockStore from "redux-mock-store";
import { CreatedMessageWithContentAndAttachments } from "../../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { CreatedMessageWithoutContent } from "../../../../definitions/backend/CreatedMessageWithoutContent";
import { PaymentAmount } from "../../../../definitions/backend/PaymentAmount";
import { TimeToLiveSeconds } from "../../../../definitions/backend/TimeToLiveSeconds";
import ROUTES from "../../../navigation/routes";
import { applicationChangeState } from "../../../store/actions/application";
import { loadMessage, loadMessages } from "../../../store/actions/messages";
import { appReducer } from "../../../store/reducers";
import { GlobalState } from "../../../store/reducers/types";
import { renderScreenFakeNavRedux } from "../../../utils/testWrapper";
import MessageRouterScreen from "../MessageRouterScreen";

const mockMeta: CreatedMessageWithoutContent = {
  created_at: new Date(),
  fiscal_code: "AAABBB05S09I422L" as FiscalCode,
  id: "messageId",
  sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
  time_to_live: 3600 as TimeToLiveSeconds
};

const mockMessage: CreatedMessageWithContentAndAttachments = {
  content: {
    subject: "[pagoPaTest] payment 2" as WithinRangeString<10, 121>,
    markdown: "demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo" as WithinRangeString<
      80,
      10001
    >,
    due_date: new Date(),
    payment_data: {
      amount: 1 as PaymentAmount,
      notice_number: "002718270840468918" as string &
        IPatternStringTag<"^[0123][0-9]{17}$">,
      invalid_after_due_date: true
    }
  },
  created_at: new Date(),
  fiscal_code: "AAABBB05S09I422L" as FiscalCode,
  id: "01DQQGBXWSCNNY44CH2QZ95PIO",
  sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
  time_to_live: 3600 as TimeToLiveSeconds
};

const mockPotMessage: pot.Pot<
  CreatedMessageWithContentAndAttachments,
  string | undefined
> = {
  kind: "PotSome",
  value: mockMessage
};

const mockEUCovidMessage: pot.Pot<
  CreatedMessageWithContentAndAttachments,
  string | undefined
> = {
  kind: "PotSome",
  value: {
    content: {
      eu_covid_cert: { auth_code: "eu_covid_cert" },
      subject: "[pagoPaTest] payment 2" as WithinRangeString<10, 121>,
      markdown: "demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo" as WithinRangeString<
        80,
        10001
      >,
      due_date: new Date(),
      payment_data: {
        amount: 1 as PaymentAmount,
        notice_number: "002718270840468918" as string &
          IPatternStringTag<"^[0123][0-9]{17}$">,
        invalid_after_due_date: true
      }
    },
    created_at: new Date(),
    fiscal_code: "AAABBB05S09I422L" as FiscalCode,
    id: "01DQQGBXWSCNNY44CH2QZ95PIO",
    sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
    time_to_live: 3600 as TimeToLiveSeconds
  }
};

const euCovidCertActions = [
  { type: "Navigation/BACK" },
  {
    type: "Navigation/NAVIGATE",
    routeName: "EUCOVIDCERT_CERTIFICATE",
    params: {
      authCode: "eu_covid_cert",
      messageId: "01DQQGBXWSCNNY44CH2QZ95PIO"
    }
  }
];

const standardMessageActions = [
  {
    type: "Navigation/BACK"
  },
  {
    params: {
      messageId: "01DQQGBXWSCNNY44CH2QZ95PIO"
    },
    routeName: "MESSAGE_DETAIL",
    type: "Navigation/NAVIGATE"
  }
];

jest.mock("../../../config", () => ({ euCovidCertificateEnabled: true }));

describe("Test MessageRouterScreen", () => {
  jest.useFakeTimers();
  it("With the default state, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent(globalState);

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });
  it("With the messages allIds pot.some and byId some, default message, the navigation to MESSAGE_DETAIL should be dispatched", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));

    const routerScreen = renderComponentMockStore({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.some(["messageId"]),
          byId: {
            messageId: {
              meta: mockMeta,
              message: mockPotMessage
            }
          }
        }
      }
    });

    // eslint-disable-next-line no-console

    expect(routerScreen.store.getActions()).toEqual(standardMessageActions);
  });
  it("With the euCovidCertificate feature flag enabled, messages allIds pot.some and byId some, EU Covid message, the navigation to EUCOVIDCERT_DETAILS should be dispatched", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));

    const routerScreen = renderComponentMockStore({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.some(["messageId"]),
          byId: {
            messageId: {
              meta: mockMeta,
              message: mockEUCovidMessage
            }
          }
        }
      }
    });

    expect(routerScreen.store.getActions()).toEqual(euCovidCertActions);
  });
  it("With the messages allIds pot.noneLoading, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));

    const routerScreen = renderComponent({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.noneLoading
        }
      }
    });

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });
  it("With the messages allIds pot.noneError, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.noneError("error")
        }
      }
    });

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });

  it("With the messages allIds pot.some and messageId not in list, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.some(["notMessageId"])
        }
      }
    });

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });

  it("With the messages allIds pot.some, messageId in list but no data in byId, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.some(["messageId"])
        }
      }
    });

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });

  it("With the messages allIds pot.some, messageId in list but byId have pot.error, the screen should be loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent({
      ...globalState,
      entities: {
        ...globalState.entities,
        messages: {
          ...globalState.entities.messages,
          allIds: pot.some(["messageId"]),
          byId: {
            messageId: {
              meta: mockMeta,
              message: pot.noneError("Error")
            }
          }
        }
      }
    });

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).not.toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).toBeNull();
  });

  it("With the starting loading state, after receiving a loadMessages.failure, should display the error screen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent(globalState);

    routerScreen.store.dispatch(loadMessages.failure(new Error("An error")));

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).not.toBeNull();
  });

  it("With the starting loading state, after receiving a loadMessage.failure for the selected message, should display the error screen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent(globalState);

    routerScreen.store.dispatch(loadMessages.success(["messageId"]));
    routerScreen.store.dispatch(
      loadMessage.failure({ id: "messageId", error: new Error("An error") })
    );

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).not.toBeNull();
  });

  it("With the starting loading state, after receiving a loadMessaged.success but without the selected messageId, should display the error screen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const routerScreen = renderComponent(globalState);

    routerScreen.store.dispatch(loadMessages.success(["notMessageId"]));

    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentLoading")
    ).toBeNull();
    expect(
      routerScreen.component.queryByTestId("LoadingErrorComponentError")
    ).not.toBeNull();
  });
});

const renderComponentMockStore = (state: GlobalState) => {
  const mockStore = configureMockStore<GlobalState>();
  const store: ReturnType<typeof mockStore> = mockStore({
    ...state
  } as GlobalState);

  return {
    component: renderScreenFakeNavRedux<GlobalState, NavigationParams>(
      MessageRouterScreen,
      ROUTES.MESSAGE_ROUTER,
      { messageId: "messageId" },
      store
    ),
    store
  };
};

const renderComponent = (state: GlobalState) => {
  const store = createStore(appReducer, state as any);

  return {
    component: renderScreenFakeNavRedux<GlobalState, NavigationParams>(
      MessageRouterScreen,
      ROUTES.MESSAGE_ROUTER,
      { messageId: "messageId" },
      store
    ),
    store
  };
};
