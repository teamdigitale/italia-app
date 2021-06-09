import * as pot from "italia-ts-commons/lib/pot";
import MockDate from "mockdate";
import { createStore } from "redux";
import { applicationChangeState } from "../../../../../store/actions/application";
import { appReducer } from "../../../../../store/reducers";
import {
  getGenericError,
  getNetworkErrorMessage,
  NetworkError
} from "../../../../../utils/errors";
import { completeValidCertificate } from "../../../types/__mock__/EUCovidCertificate.mock";
import { EUCovidCertificateAuthCode } from "../../../types/EUCovidCertificate";
import { WithEUCovidCertAuthCode } from "../../../types/EUCovidCertificateResponse";
import { euCovidCertificateGet } from "../../actions";
import {
  euCovidCertificateFromAuthCodeSelector,
  EUCovidCertificateResponseWithTimestamp,
  euCovidCertificateShouldBeLoadedSelector
} from "../byAuthCode";

const authCode = "authCode1" as EUCovidCertificateAuthCode;
const mockResponseSuccess: EUCovidCertificateResponseWithTimestamp = {
  authCode,
  kind: "success",
  lastUpdate: new Date("2021-06-07"),
  value: completeValidCertificate
};

const mockFailure: WithEUCovidCertAuthCode<NetworkError> = {
  authCode,
  ...getGenericError(new Error("A generic error"))
};

const errorFromFailure = new Error(getNetworkErrorMessage(mockFailure));

describe("Test byAuthCode reducer & selector behaviour", () => {
  it("Initial state should be pot.none", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    expect(globalState.features.euCovidCert.byAuthCode).toStrictEqual({});
    expect(
      euCovidCertificateFromAuthCodeSelector(globalState, authCode)
    ).toStrictEqual(pot.none);
  });
  it("Should be pot.noneLoading after the first loading action dispatched", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    store.dispatch(euCovidCertificateGet.request(authCode));

    const byAuthCode = store.getState().features.euCovidCert.byAuthCode;

    expect(byAuthCode[authCode]).toStrictEqual(pot.noneLoading);
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.noneLoading);
  });
  it("Should be pot.some with the response, after the success action", () => {
    MockDate.set("2021-06-07");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(euCovidCertificateGet.success(mockResponseSuccess));

    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.some(mockResponseSuccess));
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.some(mockResponseSuccess));

    store.dispatch(euCovidCertificateGet.request(authCode));

    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.someLoading(mockResponseSuccess));
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.someLoading(mockResponseSuccess));

    store.dispatch(euCovidCertificateGet.failure(mockFailure));

    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.someError(mockResponseSuccess, errorFromFailure));
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.someError(mockResponseSuccess, errorFromFailure));
    MockDate.reset();
  });
  it("Should be pot.noneError after the failure action", () => {
    MockDate.set("2021-06-07");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);
    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(euCovidCertificateGet.failure(mockFailure));

    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.noneError(errorFromFailure));
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.noneError(errorFromFailure));

    store.dispatch(euCovidCertificateGet.request(authCode));
    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.noneLoading);
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.noneLoading);

    store.dispatch(euCovidCertificateGet.success(mockResponseSuccess));

    expect(
      store.getState().features.euCovidCert.byAuthCode[authCode]
    ).toStrictEqual(pot.some(mockResponseSuccess));
    expect(
      euCovidCertificateFromAuthCodeSelector(store.getState(), authCode)
    ).toStrictEqual(pot.some(mockResponseSuccess));
    MockDate.reset();
  });

  it("Should return true if the authCode is not in byAuthCode", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();
  });

  it("Should return true if the authCode slice is error or loading", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    store.dispatch(euCovidCertificateGet.request(authCode));

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    store.dispatch(
      euCovidCertificateGet.failure({
        kind: "generic",
        authCode,
        value: new Error("An error")
      })
    );

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();
  });

  it("Should return true if the authCode slice isn't a success response", () => {
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(
      euCovidCertificateGet.success({ kind: "notOperational", authCode })
    );

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(
      euCovidCertificateGet.success({ kind: "wrongFormat", authCode })
    );

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(
      euCovidCertificateGet.success({ kind: "notFound", authCode })
    );

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(
      euCovidCertificateGet.success({
        kind: "temporarilyNotAvailable",
        authCode
      })
    );

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();
  });

  it("Should return true after 1h (ttl) if the response is success", () => {
    MockDate.set("2021-06-07T00:00");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const store = createStore(appReducer, globalState as any);

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(euCovidCertificateGet.success(mockResponseSuccess));

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeFalsy();

    MockDate.set("2021-06-07T00:30");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeFalsy();

    MockDate.set("2021-06-07T00:59:59");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeFalsy();

    MockDate.set("2021-06-07T01:00:00");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    MockDate.set("2021-06-07T15:00:00");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    MockDate.set("2021-06-10T15:00:00");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();

    store.dispatch(euCovidCertificateGet.request(authCode));
    store.dispatch(euCovidCertificateGet.success(mockResponseSuccess));

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeFalsy();

    MockDate.set("2021-06-10T15:30:00");

    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeFalsy();

    MockDate.set("2021-06-10T16:00:00");
    expect(
      euCovidCertificateShouldBeLoadedSelector(store.getState(), authCode)
    ).toBeTruthy();
  });
});
