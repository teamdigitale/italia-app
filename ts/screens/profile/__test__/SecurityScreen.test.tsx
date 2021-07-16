import React from "react";
import configureMockStore from "redux-mock-store";
import { NavigationParams } from "react-navigation";
import { fireEvent } from "@testing-library/react-native";
import SecurityScreen from "../SecurityScreen";
import I18n from "../../../i18n";
import { appReducer } from "../../../store/reducers";
import { applicationChangeState } from "../../../store/actions/application";
import { GlobalState } from "../../../store/reducers/types";
import { renderScreenFakeNavRedux } from "../../../utils/testWrapper";
import ROUTES from "../../../navigation/routes";
import { identificationRequest } from "../../../store/actions/identification";
import { shufflePinPadOnPayment } from "../../../config";
import { updatePin } from "../../../store/actions/pinset";

describe("Test SecurityScreen", () => {
  jest.useFakeTimers();
  it("should be not null", () => {
    const { component } = renderComponent();

    expect(component).not.toBeNull();
  });
  it("should render H1 component with title and H4 component with subtitle", () => {
    const { component } = renderComponent();

    expect(component).not.toBeNull();
    expect(
      component.queryByText(I18n.t("profile.security.title"))
    ).not.toBeNull();
    expect(
      component.queryByText(I18n.t("profile.security.subtitle"))
    ).not.toBeNull();
  });
  it("should render ListItemComponent reset unlock code with the right title and subtitle", () => {
    const { component } = renderComponent();

    expect(component).not.toBeNull();
    expect(component.queryByTestId("reset-unlock-code")).not.toBeNull();
    expect(
      component.queryByText(I18n.t("profile.security.title"))
    ).not.toBeNull();
    expect(
      component.queryByText(I18n.t("profile.security.subtitle"))
    ).not.toBeNull();
  });
  it("when press ListItemComponent reset unlock code, should dispatch identificationRequest", () => {
    const { component, store } = renderComponent();

    expect(component).not.toBeNull();
    const listItemComponent = component.getByTestId("reset-unlock-code");
    expect(listItemComponent).not.toBeNull();
    fireEvent.press(listItemComponent);
    store.dispatch(
      identificationRequest(
        true,
        false,
        undefined,
        undefined,
        {
          onSuccess: () => store.dispatch(updatePin())
        },
        shufflePinPadOnPayment
      )
    );
  });
});

const renderComponent = () => {
  const globalState = appReducer(undefined, applicationChangeState("active"));

  const mockStore = configureMockStore<GlobalState>();
  const store: ReturnType<typeof mockStore> = mockStore({
    ...globalState
  } as GlobalState);

  return {
    component: renderScreenFakeNavRedux<GlobalState, NavigationParams>(
      () => <SecurityScreen />,
      ROUTES.PROFILE_SECURITY,
      {},
      store
    ),
    store
  };
};
