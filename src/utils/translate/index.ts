import * as locales from "./locales";

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Перведенный текст
 */
export default function translate(
  lang: string,
  text: string,
  plural: number | undefined
): string {
  const result: string =
    locales[lang] && typeof locales[lang][text] !== "undefined"
      ? locales[lang][text]
      : text;
  if (typeof plural !== "undefined") {
    const key = new Intl.PluralRules(lang).select(plural);
    return result[key] || result;
  }

  return result;
}
