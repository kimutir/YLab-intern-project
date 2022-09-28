import StateModule from "@src/store/module";
import qs from "@src/utils/search-params";
import diff from "@src/utils/diff";

/**
 * Состояние товара
 */
class CountriesState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      selected: "",
      waiting: false,
    };
  }

  selectCountry(id) {
    this.setState({
      ...this.getState(),
      selected: id,
    });
  }

  /**
   * Загрузка списка стран
   */
  async load() {
    this.setState({ waiting: true, items: [] }, "Ожидание загрузки стран");

    const params = { fields: "_id,title, code", limit: "10" };
    const json = await this.services.api.request({
      url: `/api/v1/countries/${qs.stringify(params)}&sort=title.ru`,
    });

    this.setState(
      {
        items: json.result.items,
        waiting: false,
      },
      "Страны загружены"
    );
  }

  async setParams(params = {}) {
    const newParams = { ...this.getState().params, ...params };

    const apiParams = diff(
      {
        limit: "*",
        // skip: (newParams.page - 1) * newParams.limit,
        fields: "_id,title,code",
        sort: "title.ru",
        search: {
          query: newParams.query, // search[query]=text
        },
      },
      { skip: 0, search: { query: "", category: "" } }
    );

    // ?search[query]=text
    const json = await this.services.api.request({
      url: `/api/v1/countries${qs.stringify(apiParams)}`,
    });
    // console.log("json:", json.result.items);

    // Установка полученных данных и сброс признака загрузки
    this.setState(
      {
        ...this.getState(),
        items: json.result.items,
        waiting: false,
      },
      "Обновление списка стран"
    );
  }
}

export default CountriesState;
