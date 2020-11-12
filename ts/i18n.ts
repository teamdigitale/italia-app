import I18n from "react-native-i18n";

// If the following import is missing, generate it by running:
// npm run generate:locales
import * as locales from "../locales/locales";

// Should the app fallback to English if user locale doesn't exists
// eslint-disable-next-line
I18n.fallbacks = true;

// Define the supported translations
// eslint-disable-next-line
I18n.translations = {
  en: locales.localeEN,
  it: locales.localeIT
};

export const translations = Object.keys(I18n.translations);

export const availableTransations: ReadonlyArray<locales.Locales> = translations
  .map(k => k as locales.Locales)
  .sort();

export function setLocale(lang: locales.Locales) {
  // eslint-disable-next-line
  I18n.locale = lang;
}

type TranslateReturn<S extends string> = S extends string & locales.TranslationKeys
  ? string
  : `${S}.one` extends locales.TranslationKeys
  ? `${S}.other` extends locales.TranslationKeys
    ? string
    : never
  : never;

type TranslateT = {
  // allow unsafe translations only when a defaultValue gets passed
  // allows the use of implicit pluralization of translations, use count as numeral variable
  // how-to use pluralization explained here https://github.com/pagopa/io-app/pull/2366
  // or else, the lookup must be safe
  <S extends string>(scope: S, options?: I18n.TranslateOptions): TranslateReturn<S>;
};

/**
 * Replacement for the I18n type for making the
 *
 * We can't simply add our definition for "t" as it will be
 * merged with the existing one (overloaded) keeping it unsafe by
 * making it accept any key.
 */
interface TypedI18n {
  readonly t: TranslateT;
  readonly translate: TranslateT;
  readonly locale: locales.Locales;
  readonly currentLocale: () => locales.Locales;
  readonly toNumber: typeof I18n.toNumber;
  readonly toCurrency: typeof I18n.toCurrency;
}

const TypedI18n = I18n as TypedI18n;

export default TypedI18n;
