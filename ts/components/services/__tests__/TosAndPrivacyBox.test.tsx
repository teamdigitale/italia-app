import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import I18n from "../../../i18n";
import TosAndPrivacyBox from "../TosAndPrivacyBox";

// eslint-disable-next-line functional/no-let
let MOCK_URL_WILL_FAIL = false;

const mockOpenWebUrl = jest.fn();
const mockShowToast = jest.fn();

jest.mock("../../../utils/url", () => ({
  openWebUrl: (_: string, onError: () => void) => {
    mockOpenWebUrl();
    // we rely on an internal of `openWebUrl`, this might be improved?
    if (MOCK_URL_WILL_FAIL) {
      onError();
    }
  }
}));

jest.mock("../../../utils/showToast", () => ({
  showToast: () => mockShowToast()
}));

const options = {
  tosUrl: "https://www.fsf.org/",
  privacyUrl: "https://gnupg.org/"
};
// header.children.find(node => node

describe("TosAndPrivacyBox component", () => {
  beforeEach(() => {
    mockOpenWebUrl.mockReset();
    mockShowToast.mockReset();
    MOCK_URL_WILL_FAIL = false;
  });

  it("should have one header", () => {
    const component = renderComponent({ ...options });
    expect(component.getByRole("header")).toBeDefined();
    expect(component.getByText(I18n.t("services.tosAndPrivacy"))).toBeDefined();
  });

  describe("when both URLs are defined", () => {
    it("should call `openWebUrl` for TOS link", () => {
      const component = renderComponent(options);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const link = component
        .getAllByRole("link")
        .find(item => item.children[0] === I18n.t("services.tosLink"))!;
      fireEvent(link, "onPress");
      expect(mockOpenWebUrl).toHaveBeenCalledTimes(1);
    });

    it("should call `openWebUrl` for Privacy link", () => {
      const component = renderComponent(options);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const link = component
        .getAllByRole("link")
        .find(item => item.children[0] === I18n.t("services.privacyLink"))!;
      fireEvent(link, "onPress");
      expect(mockOpenWebUrl).toHaveBeenCalledTimes(1);
    });

    it("should call `showToast` when then link fails", () => {
      MOCK_URL_WILL_FAIL = true;
      const component = renderComponent(options);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const link = component
        .getAllByRole("link")
        .find(item => item.children[0] === I18n.t("services.privacyLink"))!;
      fireEvent(link, "onPress");
      expect(mockShowToast).toHaveBeenCalledTimes(1);
    });
  });

  describe("when either URL is not defined", () => {
    it("should not render TOS link", () => {
      expect(
        renderComponent({ ...options, tosUrl: undefined })
          .getAllByRole("link")
          .find(item => item.children[0] === I18n.t("services.tosLink"))
      ).toBeUndefined();
    });

    it("should not render Privacy link", () => {
      expect(
        renderComponent({ ...options, privacyUrl: undefined })
          .getAllByRole("link")
          .find(item => item.children[0] === I18n.t("services.privacyLink"))
      ).toBeUndefined();
    });
  });

  describe("when neither URL is defined", () => {
    it("should not render anything", () => {
      expect(renderComponent({}).toJSON()).toEqual(null);
    });
  });
});

function renderComponent({
  tosUrl,
  privacyUrl
}: Parameters<typeof TosAndPrivacyBox>[0]) {
  return render(<TosAndPrivacyBox tosUrl={tosUrl} privacyUrl={privacyUrl} />);
}
