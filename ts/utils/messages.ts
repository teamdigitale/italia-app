/**
 * Generic utilities for messages
 */

import * as pot from "italia-ts-commons/lib/pot";
import {
  fromNullable,
  fromPredicate,
  none,
  Option,
  some
} from "fp-ts/lib/Option";
import FM from "front-matter";
import { Linking } from "react-native";
import { Dispatch } from "redux";
import { Predicate } from "fp-ts/lib/function";
import { CreatedMessageWithContent } from "../../definitions/backend/CreatedMessageWithContent";
import { CreatedMessageWithContentAndAttachments } from "../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { MessageBodyMarkdown } from "../../definitions/backend/MessageBodyMarkdown";
import { PrescriptionData } from "../../definitions/backend/PrescriptionData";
import { ServicePublic } from "../../definitions/backend/ServicePublic";
import {
  getInternalRoute,
  handleInternalLink
} from "../components/ui/Markdown/handlers/internalLink";
import { deriveCustomHandledLink } from "../components/ui/Markdown/handlers/link";
import { CTA, CTAS, MessageCTA, MessageCTALocales } from "../types/MessageCTA";
import { Service as ServiceMetadata } from "../../definitions/content/Service";
import ROUTES from "../navigation/routes";
import { localeFallback } from "../i18n";
import { Locales } from "../../locales/locales";
import { getExpireStatus } from "./dates";
import { getLocalePrimaryWithFallback } from "./locale";
import { isTextIncludedCaseInsensitive } from "./strings";

export function messageContainsText(
  message: CreatedMessageWithContentAndAttachments,
  searchText: string
) {
  return (
    isTextIncludedCaseInsensitive(message.content.subject, searchText) ||
    isTextIncludedCaseInsensitive(message.content.markdown, searchText)
  );
}

export function messageNeedsDueDateCTA(
  message: CreatedMessageWithContentAndAttachments
): boolean {
  return message.content.due_date !== undefined;
}

export function messageNeedsPaymentCTA(
  message: CreatedMessageWithContentAndAttachments
): boolean {
  return message.content.payment_data !== undefined;
}

export function messageNeedsCTABar(
  message: CreatedMessageWithContentAndAttachments
): boolean {
  return (
    message.content.eu_covid_cert !== undefined || // eucovid data
    messageNeedsDueDateCTA(message) ||
    messageNeedsPaymentCTA(message) ||
    getCTA(message).isSome()
  );
}

export const handleCtaAction = (
  cta: CTA,
  dispatch: Dispatch,
  service?: ServicePublic
) => {
  const maybeInternalLink = getInternalRoute(cta.action);
  if (maybeInternalLink.isSome()) {
    handleInternalLink(
      dispatch,
      cta.action,
      service ? service.service_id : undefined
    );
  } else {
    const maybeHandledAction = deriveCustomHandledLink(cta.action);
    if (maybeHandledAction.isRight()) {
      Linking.openURL(maybeHandledAction.value.url).catch(() => 0);
    }
  }
};

export const hasPrescriptionData = (
  message: CreatedMessageWithContentAndAttachments
): boolean => fromNullable(message.content.prescription_data).isSome();

type MessagePaymentUnexpirable = {
  kind: "UNEXPIRABLE";
  noticeNumber: NonNullable<
    CreatedMessageWithContentAndAttachments["content"]["payment_data"]
  >["notice_number"];
  amount: NonNullable<
    CreatedMessageWithContentAndAttachments["content"]["payment_data"]
  >["amount"];
  expireStatus?: ExpireStatus;
  dueDate?: Date;
};
export type ExpireStatus = "VALID" | "EXPIRING" | "EXPIRED";
type MessagePaymentExpirable = {
  kind: "EXPIRABLE";
  noticeNumber: NonNullable<
    CreatedMessageWithContentAndAttachments["content"]["payment_data"]
  >["notice_number"];
  amount: NonNullable<
    CreatedMessageWithContentAndAttachments["content"]["payment_data"]
  >["amount"];
  expireStatus: ExpireStatus;
  dueDate: Date;
};

export type MessagePaymentExpirationInfo =
  | MessagePaymentUnexpirable
  | MessagePaymentExpirable;

/**
 * Given a payment data and a due date return an object that specifies if the data are expirable or not.
 * There are 3 cases:
 *  - if the due date is undefined -> the message is unexpirable
 *  - if the due date is defined and the message is valid after the due date -> the message is expirable
 * - if the due date is defined and the message is invalid after the due date -> the message is unexpirable
 * @param paymentData
 * @param dueDate -> optional
 */
export function getMessagePaymentExpirationInfo(
  paymentData: NonNullable<
    CreatedMessageWithContentAndAttachments["content"]["payment_data"]
  >,
  dueDate?: Date
): MessagePaymentExpirationInfo {
  const { notice_number, amount, invalid_after_due_date } = paymentData;

  if (dueDate !== undefined) {
    const expireStatus = getExpireStatus(dueDate);

    return {
      kind: invalid_after_due_date ? "EXPIRABLE" : "UNEXPIRABLE",
      expireStatus,
      noticeNumber: notice_number,
      amount,
      dueDate
    };
  }

  return { kind: "UNEXPIRABLE", noticeNumber: notice_number, amount };
}

/**
 * Given a message return an object of type MessagePaymentExpirationInfo
 * @param message
 */
export const paymentExpirationInfo = (message: CreatedMessageWithContent) => {
  const { payment_data, due_date } = message.content;
  return fromNullable(payment_data).map(paymentData =>
    getMessagePaymentExpirationInfo(paymentData, due_date)
  );
};

export const isUnexpirable = (
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo
): messagePaymentExpirationInfo is MessagePaymentExpirable =>
  messagePaymentExpirationInfo.kind === "UNEXPIRABLE";

export const isExpirable = (
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo
): messagePaymentExpirationInfo is MessagePaymentExpirable =>
  messagePaymentExpirationInfo.kind === "EXPIRABLE";

export const isValid = (
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo
) =>
  isExpirable(messagePaymentExpirationInfo) &&
  messagePaymentExpirationInfo.expireStatus === "VALID";

export const isExpiring = (
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo
) => messagePaymentExpirationInfo.expireStatus === "EXPIRING";

export const isExpired = (
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo
) => messagePaymentExpirationInfo.expireStatus === "EXPIRED";

/**
 * given a name, return the relative prescription data value if it corresponds to a field
 * @param message
 * @param name it should be a string nre | iup | prescriber_fiscal_code
 */
export const getPrescriptionDataFromName = (
  prescriptionData: PrescriptionData | undefined,
  name: string
): Option<string> =>
  fromNullable(prescriptionData).fold(none, pd => {
    switch (name.toLowerCase()) {
      case "nre":
        return some(pd.nre);
      case "iup":
        return fromNullable(pd.iup);
      case "prescriber_fiscal_code":
        return fromNullable(pd.prescriber_fiscal_code);
    }
    return none;
  });

export type MaybePotMetadata =
  | pot.Pot<ServiceMetadata | undefined, Error>
  | undefined;
const hasMetadataTokenName = (metadata: MaybePotMetadata): boolean =>
  fromNullable(metadata)
    .map(m =>
      pot.getOrElse(
        pot.map(m, m => m !== undefined && m.token_name !== undefined),
        false
      )
    )
    .getOrElse(false);

// a mapping between routes name (the key) and predicates (the value)
// the predicate says if for that specific route the navigation is allowed
const internalRoutePredicates: Map<
  string,
  Predicate<MaybePotMetadata>
> = new Map<string, Predicate<MaybePotMetadata>>([
  [ROUTES.SERVICE_WEBVIEW, hasMetadataTokenName]
]);

/**
 * since remote payload can have a subset of supported locales, this function
 * return the locale supported by the app. If the remote locale is not supported
 * a fallback will be returned
 */
export const getRemoteLocale = (): Extract<Locales, MessageCTALocales> =>
  MessageCTALocales.decode(getLocalePrimaryWithFallback()).getOrElse(
    localeFallback.locale
  );

const extractCTA = (
  text: string,
  serviceMetadata: MaybePotMetadata
): Option<CTAS> =>
  fromPredicate((t: string) => FM.test(t))(text)
    .map(m => FM<MessageCTA>(m).attributes)
    .chain(attrs =>
      CTAS.decode(attrs[getRemoteLocale()]).fold(
        _ => none,
        // check if the decoded actions are valid
        cta => (hasCtaValidActions(cta, serviceMetadata) ? some(cta) : none)
      )
    );

/**
 * extract the CTAs if they are nested inside the message markdown content
 * if some CTAs are been found, the localized version will be returned
 * @param message
 * @param serviceMetadata
 */
export const getCTA = (
  message: CreatedMessageWithContent,
  serviceMetadata?: MaybePotMetadata
): Option<CTAS> => extractCTA(message.content.markdown, serviceMetadata);

/**
 * extract the CTAs from a string given in serviceMetadata such as the front-matter of the message
 * if some CTAs are been found, the localized version will be returned
 * @param cta
 * @param serviceMetadata
 */
export const getServiceCTA = (
  serviceMetadata: MaybePotMetadata
): Option<CTAS> =>
  fromNullable(serviceMetadata)
    .map(s =>
      pot.getOrElse(
        pot.map(s, metadata =>
          fromNullable(metadata)
            .chain(m => fromNullable(m.cta))
            .getOrElse("")
        ),
        ""
      )
    )
    .chain(cta => extractCTA(cta, serviceMetadata));

/**
 * return a boolean indicating if the cta action is valid or not
 * Checks on servicesMetadata for defined parameter based on predicates defined in internalRoutePredicates map
 * @param cta
 * @param serviceMetadata
 */
export const isCtaActionValid = (
  cta: CTA,
  serviceMetadata?: MaybePotMetadata
): boolean => {
  // check if it is an internal navigation
  const maybeInternalRoute = getInternalRoute(cta.action);
  if (maybeInternalRoute.isSome()) {
    return fromNullable(
      internalRoutePredicates.get(maybeInternalRoute.value.routeName)
    )
      .map(f => f(serviceMetadata))
      .getOrElse(true);
  }
  // check if it is a custom action (it should be composed in a specific format)
  const maybeCustomHandledAction = deriveCustomHandledLink(cta.action);
  return maybeCustomHandledAction.isRight();
};

/**
 * return true if at least one of the CTAs is valid
 * @param ctas
 * @param serviceMetadata
 */
export const hasCtaValidActions = (
  ctas: CTAS,
  serviceMetadata?: pot.Pot<ServiceMetadata | undefined, Error>
): boolean => {
  const isCTA1Valid = isCtaActionValid(ctas.cta_1, serviceMetadata);
  if (ctas.cta_2 === undefined) {
    return isCTA1Valid;
  }
  const isCTA2Valid = isCtaActionValid(ctas.cta_2, serviceMetadata);
  return isCTA1Valid || isCTA2Valid;
};

/**
 * remove the cta front-matter if it is nested inside the markdown
 * @param cta
 */
export const cleanMarkdownFromCTAs = (markdown: MessageBodyMarkdown): string =>
  fromPredicate((t: string) => FM.test(t))(markdown)
    .map(m => FM(m).body)
    .getOrElse(markdown as string);
