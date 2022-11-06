import StateModule from "@src/store/module";
import qs from "@src/utils/search-params";
import ICategories from "./ICategories";

/**
 * Состояние товара
 */
class CategoriesState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ICategories {
    return {
      items: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(): Promise<void> {
    this.setState({ waiting: true, items: [] }, "Ожидание загрузки категорий");

    const params = { fields: "_id,title,parent(_id)", limit: "*" };
    const json = await this.services.api.request({
      url: `/api/v1/categories/${qs.stringify(params)}`,
    });

    // Товар загружен успешно
    this.setState(
      {
        items: json.result.items,
        waiting: false,
      },
      "Катеории загружены"
    );
  }
}

export default CategoriesState;
