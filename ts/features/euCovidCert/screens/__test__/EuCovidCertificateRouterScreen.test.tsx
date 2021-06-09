import { NavigationParams } from "react-navigation";
import { createStore, Store } from "redux";
import { applicationChangeState } from "../../../../store/actions/application";
import { appReducer } from "../../../../store/reducers";
import { GlobalState } from "../../../../store/reducers/types";
import { renderScreenFakeNavRedux } from "../../../../utils/testWrapper";
import { navigateToEuCovidCertificateDetailScreen } from "../../navigation/actions";
import EUCOVIDCERT_ROUTES from "../../navigation/routes";
import { euCovidCertificateGet } from "../../store/actions";
import {
  baseValidCertificate,
  revokedCertificate
} from "../../types/__mock__/EUCovidCertificate.mock";
import { EUCovidCertificateAuthCode } from "../../types/EUCovidCertificate";
import EuCovidCertificateRouterScreen from "../EuCovidCertificateRouterScreen";

jest.mock("@gorhom/bottom-sheet", () => ({
  useBottomSheetModal: () => ({
    present: jest.fn()
  })
}));

const authCode = "authCode" as EUCovidCertificateAuthCode;

describe("Test EuCovidCertificateRouterScreen", () => {
  jest.useFakeTimers();
  it("With the default store state, the loading screen should be rendered", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();
  });
  it("With a failure, the loading screen should be rendered EuCovidCertGenericErrorKoScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    store.dispatch(
      navigateToEuCovidCertificateDetailScreen({
        authCode,
        messageId: "messageId"
      })
    );

    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.failure({
        kind: "generic",
        authCode,
        value: new Error("An error")
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertGenericErrorKoScreen")
    ).not.toBeNull();
  });

  it("With a revoked certificate, the loading screen should be rendered EuCovidCertRevokedScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "success",
        value: revokedCertificate
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertRevokedScreen")
    ).not.toBeNull();
  });
  it("With a valid certificate response, the loading screen should be rendered EuCovidCertValidScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "success",
        value: baseValidCertificate
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertValidScreen")
    ).not.toBeNull();
  });

  it("With a notFound response, the loading screen should be rendered EuCovidCertNotFoundKoScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, {
      ...globalState,
      features: {
        ...globalState.features,
        euCovidCert: {
          ...globalState.features.euCovidCert,
          current: {
            messageId: "123",
            authCode: "123" as EUCovidCertificateAuthCode
          }
        }
      }
    } as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "notFound"
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertNotFoundKoScreen")
    ).not.toBeNull();
  });

  it("With a notOperational response, the loading screen should be rendered EuCovidCertNotOperationalKoScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "notOperational"
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertNotOperationalKoScreen")
    ).not.toBeNull();
  });

  it("With a temporarilyNotAvailable response, the loading screen should be rendered EuCovidCertTemporarilyNotAvailableKoScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "temporarilyNotAvailable"
      })
    );

    expect(
      render.component.queryByTestId(
        "EuCovidCertTemporarilyNotAvailableKoScreen"
      )
    ).not.toBeNull();
  });
  it("With a wrongFormat response, the loading screen should be rendered EuCovidCertWrongFormatKoScreen", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, {
      ...globalState,
      features: {
        ...globalState.features,
        euCovidCert: {
          ...globalState.features.euCovidCert,
          current: {
            messageId: "123",
            authCode: "123" as EUCovidCertificateAuthCode
          }
        }
      }
    } as any);
    const render = renderComponent(store);

    expect(
      render.component.queryByTestId("EuCovidCertLoadingScreen")
    ).not.toBeNull();

    render.store.dispatch(
      euCovidCertificateGet.success({
        authCode,
        kind: "wrongFormat"
      })
    );

    expect(
      render.component.queryByTestId("EuCovidCertWrongFormatKoScreen")
    ).not.toBeNull();
  });
});

const renderComponent = (store: Store) => ({
  component: renderScreenFakeNavRedux<GlobalState, NavigationParams>(
    EuCovidCertificateRouterScreen,
    EUCOVIDCERT_ROUTES.CERTIFICATE,
    { authCode, messageId: "messageId" },
    store
  ),
  store
});
