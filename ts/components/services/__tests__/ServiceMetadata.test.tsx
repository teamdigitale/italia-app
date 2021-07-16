import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { OrganizationFiscalCode } from "italia-ts-commons/lib/strings";

import { TranslationKeys } from "../../../../locales/locales";
import { Service, ScopeEnum } from "../../../../definitions/content/Service";
import { ServiceId } from "../../../../definitions/backend/ServiceId";
import { capitalize } from "../../../utils/strings";
import * as utilsUrl from "../../../utils/url";
import I18n from "../../../i18n";
import ServiceMetadata from "../ServiceMetadata";

jest.mock("../../../utils/platform");

const spyOpenWebUrl = jest.spyOn(utilsUrl, "openWebUrl");

const defaultServiceMetadata: Service = {
  scope: ScopeEnum.NATIONAL
};

const defaultProps = {
  getItemOnPress: jest.fn(),
  isDebugModeEnabled: false,
  organizationFiscalCode: "01234567891" as OrganizationFiscalCode,
  serviceId: "ABC123" as ServiceId,
  servicesMetadata: defaultServiceMetadata
};

describe("ServiceMetadata component", () => {
  beforeEach(() => {
    defaultProps.getItemOnPress.mockReset();
    spyOpenWebUrl.mockReset();
  });
  afterEach(() => {
    jest.dontMock("../../../utils/url");
  });

  it("should render the section header", () => {
    expect(
      renderComponent({ ...defaultProps }).getByText(
        I18n.t("services.contactsAndInfo")
      )
    ).toBeDefined();
  });

  describe("when debug mode is enabled", () => {
    const currentOptions = {
      ...defaultProps,
      isDebugModeEnabled: true
    };
    it("should render the serviceId label", () => {
      expect(
        renderComponent(currentOptions).getByText(
          capitalize(I18n.t("global.id"))
        )
      ).toBeDefined();
    });

    it("should render the serviceId value", () => {
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

  describe("given an organizationFiscalCode", () => {
    it("should render the organizationFiscalCode label", () => {
      expect(
        renderComponent(defaultProps).getByText(
          capitalize(I18n.t("serviceDetail.fiscalCode"))
        )
      ).toBeDefined();
    });

    it("should render the organizationFiscalCode value", () => {
      expect(
        renderComponent(defaultProps).getByText(
          defaultProps.organizationFiscalCode
        )
      ).toBeDefined();
    });

    it(`should call "getItemOnPress" with (${defaultProps.organizationFiscalCode}, "COPY")`, () => {
      renderComponent(defaultProps);
      expect(defaultProps.getItemOnPress).toHaveBeenCalledWith(
        defaultProps.organizationFiscalCode,
        "COPY"
      );
    });
  });

  [["address", "via genova", "services.contactAddress", "MAP"]].forEach(
    ([name, value, label, action]) => {
      describe(`when ${name} is defined`, () => {
        const currentOptions = {
          ...defaultProps,
          servicesMetadata: {
            ...defaultServiceMetadata,
            [name]: value
          }
        };
        it(`should render its label "${label}"`, () => {
          expect(
            renderComponent(currentOptions).getByText(
              capitalize(I18n.t(label as TranslationKeys))
            )
          ).toBeDefined();
        });
        it(`should render its value "${value}"`, () => {
          expect(
            renderComponent(currentOptions).getByText(value)
          ).toBeDefined();
        });
        it(`should call "getItemOnPress" with ("${value}", ${action})`, () => {
          renderComponent(currentOptions);
          expect(currentOptions.getItemOnPress).toHaveBeenCalledWith(
            value,
            action
          );
        });
      });
    }
  );

  [
    ["email", "jest@test.com", "global.media.email", "mailto:"],
    ["pec", "jest.pec@test.com", "global.media.pec", "mailto:"],
    ["phone", "12341234", "global.media.phone", "tel:"]
  ].forEach(([name, value, label, prefix]) => {
    describe(`when ${name} is defined`, () => {
      const currentOptions = {
        ...defaultProps,
        servicesMetadata: { ...defaultServiceMetadata, [name]: value }
      };
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
  });

  [
    ["support_url", "www.support.it", "services.askForAssistance"],
    ["web_url", "www.product.it", "services.visitWebsite"]
  ].forEach(([name, value, label]) => {
    const currentOptions = {
      ...defaultProps,
      servicesMetadata: {
        ...defaultServiceMetadata,
        [name]: value
      }
    };
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
          expect(spyOpenWebUrl).toHaveBeenCalledWith(
            value,
            expect.any(Function)
          );
        });
      });
    });
  });

  describe("when the platform is Android", () => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../utils/platform").test_setPlatform("android");
    });

    describe(`and servicesMetadata.app_android is defined`, () => {
      const androidUrl = "http://www.android.google";
      const currentOptions = {
        ...defaultProps,
        servicesMetadata: {
          ...defaultServiceMetadata,
          app_android: androidUrl
        }
      };
      it(`should render the Android link`, () => {
        const component = renderComponent(currentOptions);
        const link = component.getByRole("link");
        expect(link.children.toString()).toMatch(
          I18n.t("services.otherAppAndroid")
        );
      });
      it(`the link should open ${androidUrl}`, () => {
        const component = renderComponent(currentOptions);
        const link = component.getByRole("link");
        fireEvent(link, "onPress");
        expect(spyOpenWebUrl).toHaveBeenCalledWith(
          androidUrl,
          expect.any(Function)
        );
      });
    });

    describe(`and servicesMetadata.app_ios is defined`, () => {
      const currentOptions = {
        ...defaultProps,
        servicesMetadata: {
          ...defaultServiceMetadata,
          app_ios: "dummy"
        }
      };
      it(`should not render it`, () => {
        expect(renderComponent(currentOptions).queryByRole("link")).toBeNull();
      });
    });
  });

  describe("when the platform is iOS", () => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../utils/platform").test_setPlatform("ios");
    });

    describe(`and servicesMetadata.app_ios is defined`, () => {
      const iosUrl = "http://www.ios.apple";
      const currentOptions = {
        ...defaultProps,
        servicesMetadata: {
          ...defaultServiceMetadata,
          app_ios: iosUrl
        }
      };
      it(`should render the iOS link`, () => {
        const component = renderComponent(currentOptions);
        const link = component.getByRole("link");
        expect(link.children.toString()).toMatch(
          I18n.t("services.otherAppIos")
        );
      });
      it(`the link should open ${iosUrl}`, () => {
        const component = renderComponent(currentOptions);
        const link = component.getByRole("link");
        fireEvent(link, "onPress");
        expect(spyOpenWebUrl).toHaveBeenCalledWith(
          iosUrl,
          expect.any(Function)
        );
      });
    });

    describe(`and servicesMetadata.app_android is defined`, () => {
      const currentOptions = {
        ...defaultProps,
        servicesMetadata: {
          ...defaultServiceMetadata,
          app_android: "dummy"
        }
      };
      it(`should not render it`, () => {
        expect(renderComponent(currentOptions).queryByRole("link")).toBeNull();
      });
    });
  });
});

function renderComponent(props: Parameters<typeof ServiceMetadata>[0]) {
  return render(<ServiceMetadata {...props} />);
}
