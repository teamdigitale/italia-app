import { isNone, isSome, Option } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { CreatedMessageWithContent } from "../../../definitions/backend/CreatedMessageWithContent";
import { CreatedMessageWithContentAndAttachments } from "../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { FiscalCode } from "../../../definitions/backend/FiscalCode";
import { MessageBodyMarkdown } from "../../../definitions/backend/MessageBodyMarkdown";
import { MessageContent } from "../../../definitions/backend/MessageContent";
import { ScopeEnum } from "../../../definitions/content/Service";
import { Locales } from "../../../locales/locales";
import { setLocale } from "../../i18n";
import { CTA, CTAS } from "../../types/MessageCTA";
import {
  cleanMarkdownFromCTAs,
  getCTA,
  getMessagePaymentExpirationInfo,
  getRemoteLocale,
  getServiceCTA,
  isCtaActionValid,
  MaybePotMetadata,
  MessagePaymentExpirationInfo,
  paymentExpirationInfo
} from "../messages";

const messageBody = `### this is a message

this is a body`;

const CTA_2 =
  `---
it:
    cta_1: 
        text: "premi"
        action: "ioit://PROFILE_MAIN"
    cta_2: 
        text: "premi2"
        action: "ioit://PROFILE_MAIN2"
en:
    cta_1: 
        text: "go1"
        action: "ioit://PROFILE_MAIN"
    cta_2: 
        text: "go2"
        action: "ioit://PROFILE_MAIN2"
---
` + messageBody;

const CTA_WEBVIEW =
  `---
it:
    cta_1: 
        text: "Interno con params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
en:
    cta_1: 
        text: "Internal with params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
---
` + messageBody;

const messageWithoutPaymentData = {
  created_at: new Date(),
  fiscal_code: "RSSMRA83A12H501D" as FiscalCode,
  id: "93726BD8-D29C-48F2-AE6D-2F",
  sender_service_id: "dev-service_0",
  time_to_live: 3600,
  content: {
    subject: "Subject - test 1",
    markdown: CTA_2
  } as MessageContent
} as CreatedMessageWithContent;

const messageWithContentWithoutDueDate = {
  created_at: new Date(),
  fiscal_code: "RSSMRA83A12H501D" as FiscalCode,
  id: "93726BD8-D29C-48F2-AE6D-2F",
  sender_service_id: "dev-service_0",
  time_to_live: 3600,
  content: {
    subject: "Subject - test 1",
    markdown: CTA_2,
    payment_data: {
      notice_number: "012345678912345678",
      amount: 406,
      invalid_after_due_date: false
    }
  } as MessageContent
} as CreatedMessageWithContent;

const messageWithContent = {
  ...messageWithContentWithoutDueDate,
  content: { ...messageWithContentWithoutDueDate.content, due_date: new Date() }
};

const messageInvalidAfterDueDate = {
  ...messageWithContent,
  content: {
    ...messageWithContent.content,
    payment_data: {
      notice_number: "012345678912345678",
      amount: 406,
      invalid_after_due_date: true
    }
  }
};

const serviceMetadataBase = {
  description: "demo demo <br/>demo demo <br/>demo demo <br/>demo demo <br/>",
  scope: "LOCAL" as ScopeEnum,
  address: "Piazza di Spagna, Roma, Italia",
  email: "mock.service@email.com",
  pec: "mock.pec@email.com",
  phone: "5555555",
  web_url: "https://www.google.com",
  app_android: "https://www.google.com",
  app_ios: "https://www.google.com",
  support_url: "https://www.sos.com",
  tos_url: "https://www.tos.com",
  privacy_url: "https://www.privacy.com",
  cta: `---
  it:
      cta_1: 
          text: "premi"
          action: "ioit://SERVICE_WEBVIEW"
  en:
      cta_1: 
          text: "go1"
          action: "ioit://SERVICE_WEBVIEW"
  ---
  `
};

// test "it" as default language
beforeAll(() => setLocale("it" as Locales));

describe("getRemoteLocale", () => {
  it("should return it if locale is it", () => {
    setLocale("it" as Locales);
    expect(getRemoteLocale()).toEqual("it");
  });

  it("should return en if locale is en", () => {
    setLocale("en" as Locales);
    expect(getRemoteLocale()).toEqual("en");
  });

  it("should return it if locale is a supported language but is not in MessageCTALocales", () => {
    setLocale("de" as Locales);
    expect(getRemoteLocale()).toEqual("it");
  });

  it("should return it if locale is not a supported language and is not in MessageCTALocales", () => {
    setLocale("xyz" as Locales);
    expect(getRemoteLocale()).toEqual("it");
  });
});

describe("getCTA", () => {
  it("should have 2 valid CTA", () => {
    const maybeCTAs = getCTA(messageWithContent);
    test2CTA(
      maybeCTAs,
      "premi",
      "ioit://PROFILE_MAIN",
      "premi2",
      "ioit://PROFILE_MAIN2"
    );
    setLocale("en" as Locales);
    const maybeCTAsEn = getCTA(messageWithContent);
    test2CTA(
      maybeCTAsEn,
      "go1",
      "ioit://PROFILE_MAIN",
      "go2",
      "ioit://PROFILE_MAIN2"
    );
  });

  it("should return the italian CTA when the language is not supported", () => {
    setLocale("fr" as Locales);
    const maybeCTAs = getCTA(messageWithContent);
    test2CTA(
      maybeCTAs,
      "premi",
      "ioit://PROFILE_MAIN",
      "premi2",
      "ioit://PROFILE_MAIN2"
    );
    setLocale("it" as Locales); // restore default
  });

  it("should not have valid CTA (action is malformed)", () => {
    const CTA_1 = `---
it:
    cta_1:
        text: "premi"
        action: "io://PROFILE_MAIN"
--- 
some noise`;

    const maybeCTA = getCTA({
      ...messageWithContent,
      content: {
        ...messageWithContent.content,
        markdown: CTA_1 as MessageBodyMarkdown
      }
    });
    expect(maybeCTA.isNone());
  });

  it("should not have a valid CTA", () => {
    const maybeCTA = getCTA({
      ...messageWithContent,
      content: {
        ...messageWithContent.content,
        markdown: "nothing of nothing" as MessageBodyMarkdown
      }
    });
    expect(maybeCTA.isNone()).toBeTruthy();
  });

  it("should not have a valid CTA", () => {
    const NO_CTA = `---
it:
    act_1:
        txet: "premi"
        aa: "ioit://PROFILE_MAIN"
--- 
some noise`;
    const maybeCTA = getCTA({
      ...messageWithContent,
      content: {
        ...messageWithContent.content,
        markdown: NO_CTA as MessageBodyMarkdown
      }
    });
    expect(maybeCTA.isNone()).toBeTruthy();
  });

  it("should have a valid CTA for service", () => {
    const validServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase,
      token_name: "myPortalToken"
    });
    const maybeCTAs = getCTA(
      {
        ...messageWithContent,
        content: {
          ...messageWithContent.content,
          markdown: CTA_WEBVIEW as MessageBodyMarkdown
        }
      },
      validServiceMetadata
    );
    expect(maybeCTAs.isSome()).toBeTruthy();
    if (maybeCTAs.isSome()) {
      const ctas = maybeCTAs.value;
      expect(ctas.cta_1).toBeDefined();
      expect(ctas.cta_1.text).toEqual("Interno con params");
      expect(ctas.cta_1.action).toEqual(
        "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
      );
    }
  });

  it("should not have a valid CTA for service (for the given route 'SERVICE_WEBVIEW' token_name must present in service metadata)", () => {
    const validServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase
    });
    const maybeCTAs = getCTA(
      {
        ...messageWithContent,
        content: {
          ...messageWithContent.content,
          markdown: CTA_WEBVIEW as MessageBodyMarkdown
        }
      },
      validServiceMetadata
    );
    expect(maybeCTAs.isSome()).toBeFalsy();
  });

  it("should not have a valid CTA without service", () => {
    const maybeCTAs = getCTA({
      ...messageWithContent,
      content: {
        ...messageWithContent.content,
        markdown: CTA_WEBVIEW as MessageBodyMarkdown
      }
    });
    expect(maybeCTAs.isSome()).toBeFalsy();
  });
});

const test2CTA = (
  maybeCTAS: Option<CTAS>,
  text1: string,
  action1: string,
  text2: string,
  action2: string
) => {
  expect(maybeCTAS.isSome()).toBeTruthy();
  if (maybeCTAS.isSome()) {
    const ctas = maybeCTAS.value;
    expect(ctas.cta_1).toBeDefined();
    expect(ctas.cta_2).toBeDefined();
    expect(ctas.cta_1.text).toEqual(text1);
    expect(ctas.cta_1.action).toEqual(action1);
    if (ctas.cta_2) {
      expect(ctas.cta_2.text).toEqual(text2);
      expect(ctas.cta_2.action).toEqual(action2);
    }
  }
};

describe("getServiceCTA", () => {
  it("Should extract a valid CTA for the service", () => {
    const CTA_SERVICE = `---
it:
    cta_1:
        text: "Interno con params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
en:
    cta_1:
        text: "Internal with params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
---`;
    const validServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase,
      token_name: "myPortalToken",
      cta: CTA_SERVICE
    });
    const maybeCTA = getServiceCTA(validServiceMetadata);
    expect(maybeCTA.isSome()).toBeTruthy();
    if (maybeCTA.isSome()) {
      const ctas = maybeCTA.value;
      expect(ctas.cta_1).toBeDefined();
      expect(ctas.cta_1.text).toEqual("Interno con params");
      expect(ctas.cta_1.action).toEqual(
        "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
      );
    }
  });

  it("Should not extract a CTA for the service without cta attribute", () => {
    const invalidServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase,
      token_name: "myPortalToken"
    });
    const maybeCTA = getServiceCTA(invalidServiceMetadata);
    expect(maybeCTA.isSome()).toBeFalsy();
  });

  it("Should not extract a CTA for the service without token_name attribute", () => {
    const CTA_SERVICE = `---
it:
    cta_1:
        text: "Interno con params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
en:
    cta_1:
        text: "Internal with params"
        action: "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
---`;
    const invalidServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase,
      cta: CTA_SERVICE
    });
    const maybeCTA = getServiceCTA(invalidServiceMetadata);
    expect(maybeCTA.isSome()).toBeFalsy();
  });
});

describe("isCtaActionValid", () => {
  it("should be a valid action for service", () => {
    const validServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase,
      token_name: "myPortalToken"
    });
    const CTA = {
      text: "dummy",
      action:
        "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
    };
    const isValid = isCtaActionValid(CTA, validServiceMetadata);
    expect(isValid).toBeTruthy();
  });

  it("should NOT be a valid action for service", () => {
    const invalidServiceMetadata: MaybePotMetadata = pot.some({
      ...serviceMetadataBase
    });
    const CTA = {
      text: "dummy",
      action:
        "ioit://SERVICE_WEBVIEW?url=http://192.168.1.10:3000/myportal_playground.html"
    };
    const isValid = isCtaActionValid(CTA, invalidServiceMetadata);
    expect(isValid).toBeFalsy();
  });

  it("should be a valid internal navigation action", async () => {
    const valid: CTA = { text: "dummy", action: "ioit://PROFILE_MAIN" };
    const isValid = isCtaActionValid(valid);
    expect(isValid).toBeTruthy();
  });

  it("should be not valid (wrong protocol)", async () => {
    const invalidProtocol: CTA = {
      text: "dummy",
      action: "iosit://PROFILE_MAIN"
    };
    const isValid = isCtaActionValid(invalidProtocol);
    expect(isValid).toBeFalsy();
  });

  it("should be not valid (wrong route)", async () => {
    const invalidRoute: CTA = { text: "dummy", action: "iosit://WRONG_ROUTE" };
    const isValid = isCtaActionValid(invalidRoute);
    expect(isValid).toBeFalsy();
  });

  it("should be a valid RN Linking", async () => {
    const phoneCtaValid: CTA = {
      text: "dummy",
      action: "iohandledlink://tel://3471615647"
    };
    const isValid = isCtaActionValid(phoneCtaValid);
    expect(isValid).toBeTruthy();
  });

  it("should be a valid RN Linking (web)", async () => {
    const webCtaValid: CTA = {
      text: "dummy",
      action: "iohandledlink://https://www.google.it"
    };
    const isValid = isCtaActionValid(webCtaValid);
    expect(isValid).toBeTruthy();
  });
});

describe("cleanMarkdownFromCTAs", () => {
  it("should be the same", async () => {
    const markdown = "simple text";
    const cleaned = cleanMarkdownFromCTAs(markdown as MessageBodyMarkdown);
    expect(cleaned).toEqual(markdown);
  });

  it("should be cleaned", async () => {
    const withCTA = `---
it:
    cta_1:
        text: "premi"
        action: "io://PROFILE_MAIN"
--- 
some noise`;
    const cleaned = cleanMarkdownFromCTAs(withCTA as MessageBodyMarkdown);
    expect(cleaned).toEqual("some noise");
  });

  it("should be cleaned (extended version)", async () => {
    const cleaned = cleanMarkdownFromCTAs(CTA_2 as MessageBodyMarkdown);
    expect(cleaned).toEqual(messageBody);
  });
});

describe("getMessagePaymentExpirationInfo", () => {
  it("should return an object with type UNEXPIRABLE if there isn't a duedate", () => {
    const messagePaymentExpirationInfo = getMessagePaymentExpirationInfo(
      messageWithContentWithoutDueDate.content.payment_data as NonNullable<
        CreatedMessageWithContentAndAttachments["content"]["payment_data"]
      >
    );
    const expectedInfo = {
      kind: "UNEXPIRABLE",
      noticeNumber:
        messageWithContentWithoutDueDate.content.payment_data?.notice_number,
      amount: messageWithContentWithoutDueDate.content.payment_data?.amount
    };
    expect(messagePaymentExpirationInfo).toStrictEqual(expectedInfo);
  });
  it("should return an object with type UNEXPIRABLE if there a duedate but invalid_after_due_date is false", () => {
    const messagePaymentExpirationInfo = getMessagePaymentExpirationInfo(
      messageWithContent.content.payment_data as NonNullable<
        CreatedMessageWithContentAndAttachments["content"]["payment_data"]
      >,
      messageWithContent.content.due_date
    );
    const expectedInfo = {
      kind: "UNEXPIRABLE",
      noticeNumber: messageWithContent.content.payment_data?.notice_number,
      amount: messageWithContent.content.payment_data?.amount,
      expireStatus: "EXPIRED",
      dueDate: messageWithContent.content.due_date
    };
    expect(messagePaymentExpirationInfo).toStrictEqual(expectedInfo);
  });
  it("should return an object with type EXPIRABLE if there a duedate and invalid_after_due_date is true", () => {
    const messagePaymentExpirationInfo = getMessagePaymentExpirationInfo(
      messageInvalidAfterDueDate.content.payment_data as NonNullable<
        CreatedMessageWithContentAndAttachments["content"]["payment_data"]
      >,
      messageInvalidAfterDueDate.content.due_date
    );

    const expectedInfo = {
      kind: "EXPIRABLE",
      noticeNumber:
        messageInvalidAfterDueDate.content.payment_data.notice_number,
      amount: messageInvalidAfterDueDate.content.payment_data.amount,
      expireStatus: "EXPIRED",
      dueDate: messageInvalidAfterDueDate.content.due_date
    };
    expect(messagePaymentExpirationInfo).toStrictEqual(expectedInfo);
  });
});

describe("paymentExpirationInfo", () => {
  it("should be None if there isn't payment data in the message", () => {
    const expirationInfo = paymentExpirationInfo(messageWithoutPaymentData);
    expect(isNone(expirationInfo)).toBe(true);
  });
  it("should be a MessagePaymentExpirationInfo if there is payment data in the message", () => {
    const expirationInfo = paymentExpirationInfo(messageWithoutPaymentData);
    if (isSome(expirationInfo)) {
      expect(expirationInfo.value).toBeInstanceOf(
        {} as MessagePaymentExpirationInfo
      );
    }
  });
});
