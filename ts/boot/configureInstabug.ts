import { Option } from "fp-ts/lib/Option";
import Instabug, {
  BugReporting,
  NetworkLogger,
  Replies
} from "instabug-reactnative";

import { Locales } from "../../locales/locales";
import { instabugToken } from "../config";
import I18n from "../i18n";
import { IdentityProvider } from "../models/IdentityProvider";
import variables from "../theme/variables";
import { getAppVersion } from "../utils/appVersion";
import { isDevEnv } from "../utils/environment";

type InstabugLocales = { [k in Locales]: Instabug.locale };

type InstabugUserAttributeKeys =
  | "backendVersion"
  | "activeScreen"
  | "fiscalcode"
  | "identityProvider"
  | "lastSeenMessageID"
  | "appVersion"
  | "blockedPaymentRptId";

const instabugLocales: InstabugLocales = {
  en: Instabug.locale.english,
  it: Instabug.locale.italian
};

export enum TypeLogs {
  "INFO" = "INFO",
  "VERBOSE" = "VERBOSE",
  "ERROR" = "ERROR",
  "DEBUG" = "DEBUG",
  "WARN" = "WARN"
}

type InstabugLoggerType = {
  [key in keyof typeof TypeLogs]: (value: string) => void;
};
const InstabugLogger: InstabugLoggerType = {
  INFO: Instabug.logInfo,
  VERBOSE: Instabug.logVerbose,
  ERROR: Instabug.logError,
  DEBUG: Instabug.logDebug,
  WARN: Instabug.logWarn
};

export const initialiseInstabug = () => {
  // Initialise Instabug for iOS. The Android initialisation is inside MainApplication.java
  Instabug.startWithToken(instabugToken, [Instabug.invocationEvent.none]);
  // it seems NetworkLogger.setEnabled(false) turns off all network interceptions
  // this may cause an empty timeline in Reactotron too
  if (!isDevEnv) {
    // avoid Instabug to log network requests
    NetworkLogger.setEnabled(false);
  }

  // Set primary color for iOS. The Android's counterpart is inside MainApplication.java
  Instabug.setPrimaryColor(variables.contentPrimaryBackground);
  Instabug.setColorTheme(Instabug.colorTheme.light);

  // Set the language for Instabug ui/screens
  Instabug.setLocale(
    I18n.currentLocale().startsWith("it")
      ? instabugLocales.it
      : instabugLocales.en
  );
  setInstabugUserAttribute("appVersion", getAppVersion());
};

export const defaultAttachmentTypeConfiguration = {
  screenshot: true,
  extraScreenshot: true,
  galleryImage: true,
  screenRecording: true
};

export const attachmentTypeConfigurationNoScreenshot = {
  ...defaultAttachmentTypeConfiguration,
  screenshot: false,
  extraScreenshot: false
};

export type DefaultReportAttachmentTypeConfiguration = typeof defaultAttachmentTypeConfiguration;

export const openInstabugQuestionReport = (
  attcahmentTypeConfiguration: DefaultReportAttachmentTypeConfiguration = defaultAttachmentTypeConfiguration
) => {
  Instabug.setEnabledAttachmentTypes(
    attcahmentTypeConfiguration.screenshot,
    attcahmentTypeConfiguration.extraScreenshot,
    attcahmentTypeConfiguration.galleryImage,
    attcahmentTypeConfiguration.screenRecording
  );
  BugReporting.showWithOptions(BugReporting.reportType.question, [
    BugReporting.option.commentFieldRequired,
    BugReporting.option.emailFieldOptional
  ]);
};

export const openInstabugReplies = () => {
  Replies.show();
};

export const setInstabugUserAttribute = (
  attributeKey: InstabugUserAttributeKeys,
  attributeValue: string
) => {
  Instabug.setUserAttribute(attributeKey, attributeValue);
};

export const setInstabugProfileAttributes = (
  maybeIdp: Option<IdentityProvider>
) => {
  maybeIdp.fold(undefined, (idp: IdentityProvider) =>
    setInstabugUserAttribute("identityProvider", idp.entityID)
  );
};

// The maximum log length accepted by Instabug
const maxInstabugLogLength = 4096;
// margin used for numerate the chunks
const numberMargin = 15;
/**
 * This method allows to log a string in the Instabug report. If the log is too long,
 * the string will be splitted in chunks
 * @param log the text that will be logged on istabug
 * @param typeLog the type of the log
 * @param tag a tag that can be used to identify the log
 */
export const instabugLog = (log: string, typeLog: TypeLogs, tag?: string) => {
  const chunckSize =
    maxInstabugLogLength - (tag ? tag.length : 0) - numberMargin;

  const chunks = log.match(
    new RegExp("(.|[\r\n]){1," + chunckSize.toString() + "}", "g")
  );
  if (chunks) {
    const prefix = tag ? tag : "";
    const space = prefix.length > 0 && chunks.length > 1 ? " " : "";

    chunks.forEach((chunk, i) => {
      const count = chunks.length > 1 ? `${i + 1}/${chunks.length}` : "";
      InstabugLogger[typeLog](`[${prefix}${space}${count}] ${chunk}`);
    });
  }
};
