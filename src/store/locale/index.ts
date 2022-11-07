import StateModule from "@src/store/module";
import ILocale from "./type";

/**
 * Состояние товара
 */
class LocaleState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ILocale {
    return {
      lang: "ru",
    };
  }

  async setLang(lang: string): Promise<void> {
    this.setState(
      {
        lang,
      },
      "Смена локали"
    );
  }
}

export default LocaleState;
