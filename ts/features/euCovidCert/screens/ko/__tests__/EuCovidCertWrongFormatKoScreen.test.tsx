import { createStore } from "redux";
import { fireEvent } from "@testing-library/react-native";
import { NavigationParams } from "react-navigation";
import { GlobalState } from "../../../../../store/reducers/types";
import { appReducer } from "../../../../../store/reducers";
import { renderScreenFakeNavRedux } from "../../../../../utils/testWrapper";
import EUCOVIDCERT_ROUTES from "../../../navigation/routes";
import { applicationChangeState } from "../../../../../store/actions/application";
import * as mixpanelTrack from "../../../../../mixpanel";
import { EUCovidCertificateAuthCode } from "../../../types/EUCovidCertificate";
import i18n from "../../../../../i18n";
import * as openWebUrl from "../../../../../utils/url";
import EuCovidCertWrongFormatKoScreen from "../EuCovidCertWrongFormatKoScreen";

const aMessageId = "123";
const anAuthCode = "1234" as EUCovidCertificateAuthCode;

describe("Test EuCovidCertNotFoundKoScreen", () => {
  jest.useFakeTimers();
  it("Should show the WorkunitGenericFailure and should send the mixpanel event if euCovidCertCurrentSelector return null", () => {
    const spyMixpanelTrack = jest.spyOn(mixpanelTrack, "mixpanelTrack");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const wrongFormatScreen = renderComponent(globalState);

    expect(
      wrongFormatScreen.queryByTestId("WorkunitGenericFailure")
    ).not.toBeNull();
    expect(
      wrongFormatScreen.queryByTestId("EuCovidCertWrongFormatKoScreen")
    ).toBeNull();
    expect(spyMixpanelTrack).toBeCalled();
  });
  it("Should show the authorization code and the message identifier if euCovidCertCurrentSelector is not null, and onButton click should open the web url", () => {
    const spyOpenWebUrl = jest.spyOn(openWebUrl, "openWebUrl");
    const globalState = appReducer(undefined, applicationChangeState("active"));
    const wrongFormatScreen = renderComponent({
      ...globalState,
      features: {
        ...globalState.features,
        euCovidCert: {
          ...globalState.features.euCovidCert,
          current: { messageId: aMessageId, authCode: anAuthCode }
        }
      }
    });
    const requestAssistanceButton = wrongFormatScreen.queryByText(
      i18n.t("features.euCovidCertificate.ko.wrongFormat.cta")
    );

    expect(requestAssistanceButton).not.toBeNull();

    if (requestAssistanceButton !== null) {
      fireEvent.press(requestAssistanceButton);
      expect(spyOpenWebUrl).toBeCalled();
    }

    expect(
      wrongFormatScreen.queryByTestId("authorizationCodeToCopy")
    ).not.toBeNull();
    expect(
      wrongFormatScreen.queryByTestId("messageIdentifierToCopy")
    ).not.toBeNull();
    expect(
      wrongFormatScreen.queryByTestId("WorkunitGenericFailure")
    ).toBeNull();
  });
});

const renderComponent = (state: GlobalState) => {
  const store = createStore(appReducer, state as any);

  return renderScreenFakeNavRedux<GlobalState, NavigationParams>(
    EuCovidCertWrongFormatKoScreen,
    EUCOVIDCERT_ROUTES.CERTIFICATE,
    {},
    store
  );
};
