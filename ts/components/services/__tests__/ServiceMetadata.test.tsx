import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { TranslationKeys } from "../../../../locales/locales";
import { capitalize } from "../../../utils/strings";
import I18n from "../../../i18n";
import ServiceMetadata from "../ServiceMetadata";

const mockOpenWebUrl = jest.fn();

jest.mock("../../../utils/url", () => ({
  openWebUrl: (...args: any) => mockOpenWebUrl(...args)
}));

describe("ServiceMetadata component", () => {
  beforeEach(() => {
    mockOpenWebUrl.mockReset();
  });

  it("should render the section header", () => {
    expect(
      renderComponent({ ...options }).getByText(
        I18n.t("services.contactsAndInfo")
      )
    ).toBeDefined();
  });

  describe("given a serviceId", () => {
    const currentOptions = {
      ...options,
      serviceId: "abcdDEF123___",
      getItemOnPress: jest.fn()
    };
    beforeEach(() => currentOptions.getItemOnPress.mockReset());
    it("should render its label", () => {
      expect(
        renderComponent(currentOptions).getByText(
          capitalize(I18n.t("global.id"))
        )
      ).toBeDefined();
    });

    it("should render service its value", () => {
      expect(
        renderComponent(currentOptions).getByText(currentOptions.serviceId)
      ).toBeDefined();
    });

    it(`should call "getItemOnPress" with (${currentOptions.serviceId}, "COPY")`, () => {
      renderComponent(currentOptions);
      expect(currentOptions.getItemOnPress).toHaveBeenCalledWith(
        currentOptions.serviceId,
        "COPY"
      );
    });
  });

  [
    ["address", "via genova", "services.contactAddress", "MAP"],
    ["fiscalCode", "via genova", "profile.fiscalCode.fiscalCode", "COPY"]
  ].forEach(([name, value, label, action]) => {
    describe(`when ${name} is defined`, () => {
      const currentOptions = {
        ...options,
        [name]: value,
        getItemOnPress: jest.fn()
      };
      beforeEach(() => currentOptions.getItemOnPress.mockReset());
      it(`should render its label "${label}"`, () => {
        expect(
          renderComponent(currentOptions).getByText(
            capitalize(I18n.t(label as TranslationKeys))
          )
        ).toBeDefined();
      });
      it(`should render its value "${value}"`, () => {
        expect(renderComponent(currentOptions).getByText(value)).toBeDefined();
      });
      it(`should call "getItemOnPress" with ("${value}", ${action})`, () => {
        renderComponent(currentOptions);
        expect(currentOptions.getItemOnPress).toHaveBeenCalledWith(
          value,
          action
        );
      });
    });
    describe(`when ${name} is not defined`, () => {
      it(`should not render it`, () => {
        expect(renderComponent(options).queryByText(value)).toBeNull();
      });
    });
  });

  [
    ["email", "jest@test.com", "global.media.email", "mailto:"],
    ["pec", "jest.pec@test.com", "global.media.pec", "mailto:"],
    ["phone", "12341234", "global.media.phone", "tel:"]
  ].forEach(([name, value, label, prefix]) => {
    describe(`when ${name} is defined`, () => {
      const currentOptions = {
        ...options,
        [name]: value,
        getItemOnPress: jest.fn()
      };
      beforeEach(() => currentOptions.getItemOnPress.mockReset());
      // eslint-disable-next-line sonarjs/no-identical-functions
      it(`should render its label "${label}"`, () => {
        expect(
          renderComponent(currentOptions).getByText(
            capitalize(I18n.t(label as TranslationKeys))
          )
        ).toBeDefined();
      });
      it(`should render its value "${value}"`, () => {
        expect(renderComponent(currentOptions).getByText(value)).toBeDefined();
      });
      it(`should call "getItemOnPress" with ("${prefix}:${value}")`, () => {
        renderComponent(currentOptions);
        expect(currentOptions.getItemOnPress).toHaveBeenCalledWith(
          `${prefix}${value}`
        );
      });
    });
    // eslint-disable-next-line sonarjs/no-identical-functions
    describe(`when ${name} is not defined`, () => {
      it(`should not render it`, () => {
        expect(renderComponent(options).queryByText(value)).toBeNull();
      });
    });
  });

  [
    ["supportUrl", "www.support.it", "services.askForAssistance"],
    ["webUrl", "www.product.it", "services.visitWebsite"],
    ["iosStoreUrl", "www.ios.it", "services.otherAppIos"],
    ["androidStoreUrl", "www.android.it", "services.otherAppAndroid"]
  ].forEach(([name, value, label]) => {
    const currentOptions = {
      ...options,
      [name]: value,
      getItemOnPress: jest.fn()
    };
    beforeEach(() => currentOptions.getItemOnPress.mockReset());
    describe(`when ${name} is defined`, () => {
      it(`should render a link with "${label}"`, () => {
        const component = renderComponent(currentOptions);
        const link = component.getByRole("link");
        expect(link).toBeDefined();
        expect(link.children.toString()).toMatch(
          I18n.t(label as TranslationKeys)
        );
      });
      describe("when the link is pressed", () => {
        it(`should open the url "${value}"`, () => {
          const component = renderComponent(currentOptions);
          const link = component.getByRole("link");
          fireEvent(link, "onPress");
          expect(mockOpenWebUrl).toHaveBeenCalledWith(
            value,
            expect.any(Function)
          );
        });
      });
    });
    describe(`when ${name} is not defined`, () => {
      it(`should not render it`, () => {
        expect(renderComponent(options).queryByRole("link")).toBeNull();
      });
    });
  });
});

const options = {
  getItemOnPress: jest.fn(),
  serviceId: "ABC123"
};

function renderComponent(props: Parameters<typeof ServiceMetadata>[0]) {
  return render(<ServiceMetadata {...props} />);
}
