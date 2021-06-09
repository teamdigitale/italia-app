import { createStore } from "redux";
import { fireEvent } from "@testing-library/react-native";
import { NavigationParams } from "react-navigation";
import { GlobalState } from "../../../../../store/reducers/types";
import { appReducer } from "../../../../../store/reducers";
import { renderScreenFakeNavRedux } from "../../../../../utils/testWrapper";
import EuCovidCertNotFoundKoScreen from "../EuCovidCertNotFoundKoScreen";
import EUCOVIDCERT_ROUTES from "../../../navigation/routes";
import { applicationChangeState } from "../../../../../store/actions/application";
import * as mixpanelTrack from "../../../../../mixpanel";
import { EUCovidCertificateAuthCode } from "../../../types/EUCovidCertificate";
import i18n from "../../../../../i18n";
import * as openWebUrl from "../../../../../utils/url";

const aMessageId = "123";
const anAuthCode = "1234" as EUCovidCertificateAuthCode;

describe("Test EuCovidCertNotFoundKoScreen", () => {
  jest.useFakeTimers();
  it("Should show the WorkunitGenericFailure and should send the mixpanel event if euCovidCertCurrentSelector return null", () => {
    const spyMixpanelTrack = jest.spyOn(mixpanelTrack, "mixpanelTrack");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const notFoundScreen = renderComponent(globalState);

    expect(
      notFoundScreen.queryByTestId("WorkunitGenericFailure")
    ).not.toBeNull();
    expect(
      notFoundScreen.queryByTestId("EuCovidCertNotFoundKoScreen")
    ).toBeNull();
    expect(spyMixpanelTrack).toBeCalled();
  });
  it("Should show the authorization code and the message identifier if euCovidCertCurrentSelector is not null, and onButton click should open the web url", () => {
    const spyOpenWebUrl = jest.spyOn(openWebUrl, "openWebUrl");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const notFoundScreen = renderComponent({
      ...globalState,
      features: {
        ...globalState.features,
        euCovidCert: {
          ...globalState.features.euCovidCert,
          current: { messageId: aMessageId, authCode: anAuthCode }
        }
      }
    });
    const requestAssistanceButton = notFoundScreen.queryByText(
      i18n.t("features.euCovidCertificate.ko.notFound.cta")
    );

    expect(requestAssistanceButton).not.toBeNull();

    if (requestAssistanceButton !== null) {
      fireEvent.press(requestAssistanceButton);
      expect(spyOpenWebUrl).toBeCalled();
    }

    expect(
      notFoundScreen.queryByTestId("authorizationCodeToCopy")
    ).not.toBeNull();
    expect(
      notFoundScreen.queryByTestId("messageIdentifierToCopy")
    ).not.toBeNull();
    expect(notFoundScreen.queryByTestId("WorkunitGenericFailure")).toBeNull();
  });
});

const renderComponent = (state: GlobalState) => {
  const store = createStore(appReducer, state as any);

  return renderScreenFakeNavRedux<GlobalState, NavigationParams>(
    EuCovidCertNotFoundKoScreen,
    EUCOVIDCERT_ROUTES.CERTIFICATE,
    {},
    store
  );
};
