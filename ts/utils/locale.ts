import { fromNullable, Option, some } from "fp-ts/lib/Option";
import { Locales } from "../../locales/locales";
import I18n, {
  availableTranslations,
  localeFallback,
  localeToLocalizedMessageKey,
  localeToPreferredLanguageMapping,
  LocalizedMessageKeys
} from "../i18n";
import { PreferredLanguageEnum } from "../../definitions/backend/PreferredLanguage";
/**
 * Helpers for handling locales
 */

/**
 * Return a full string locale. (it -> it-IT)
 * If not italian, for all other languages italian is the default.
 */
export const getFullLocale = (): LocalizedMessageKeys =>
  localeToLocalizedMessageKey.get(I18n.currentLocale()) ??
  localeFallback.localizedMessageKey;
/**
 * Returns the primary component of a locale
 *
 * @see https://en.wikipedia.org/wiki/IETF_language_tag
 */
export function getLocalePrimary(
  locale: string,
  separator: string = "-"
): Option<string> {
  return some(locale.split(separator))
    .filter(_ => _.length > 0)
    .map(_ => _[0]);
}

// return the current locale set in the device (this could be different from the app supported languages)
export const getCurrentLocale = (): Locales => I18n.currentLocale();

/**
 * return the primary component of the current locale (i.e: it-US -> it)
 * if the current locale (the language set in the device) is not a language supported by the app
 * the fallback will returned
 */
export const getLocalePrimaryWithFallback = (): Locales =>
  getLocalePrimary(getCurrentLocale())
    .filter(l =>
      availableTranslations.some(t => t.toLowerCase() === l.toLowerCase())
    )
    .map(s => s as Locales)
    .getOrElse(localeFallback.locale);

const preferredLanguageMappingToLocale = new Map<
  PreferredLanguageEnum,
  Locales
>(Array.from(localeToPreferredLanguageMapping).map(item => [item[1], item[0]]));

export const localeDateFormat = (date: Date, format: string): string =>
  isNaN(date.getTime())
    ? I18n.t("global.date.invalid")
    : I18n.strftime(date, format);

// from a given Locales return the relative PreferredLanguageEnum
export const fromLocaleToPreferredLanguage = (
  locale: Locales
): PreferredLanguageEnum =>
  fromNullable(localeToPreferredLanguageMapping.get(locale)).getOrElse(
    localeFallback.localeEnum
  );

// from a given preferredLanguage return the relative Locales
export const fromPreferredLanguageToLocale = (
  preferredLanguage: PreferredLanguageEnum
): Locales =>
  fromNullable(
    preferredLanguageMappingToLocale.get(preferredLanguage)
  ).getOrElse(localeFallback.locale);
