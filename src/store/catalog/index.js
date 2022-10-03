import StateModule from "@src/store/module";
import qs from "@src/utils/search-params";
import diff from "@src/utils/diff";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
      },

      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}) {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search);
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;
    if (urlParams.category) validParams.category = urlParams.category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(params = {}, resetItems = false, historyReplace = false) {
    const newParams = { ...this.getState().params, ...params };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        // params: resetItems ? { ...newParams, page: 1 } : newParams,
        params: newParams,
        items: resetItems ? [] : this.getState().items,
        waiting: true,
      },
      "Смена параметров каталога"
    );

    const apiParams = diff(
      {
        limit: newParams.limit,
        // skip: (newParams.page - 1) * newParams.limit,
        skip: newParams.skip,
        fields: "items(*),count",
        sort: newParams.sort,
        search: {
          query: newParams.query, // search[query]=text
          category: newParams.category, // -> search[category]=id
        },
      },
      { skip: 0, search: { query: "", category: "" } }
    );

    // ?search[query]=text&search[category]=id
    const json = await this.services.api.request({
      url: `/api/v1/articles${qs.stringify(apiParams)}`,
    });

    // Установка полученных данных и сброс признака загрузки
    this.setState(
      {
        ...this.getState(),
        items: [...this.getState().items, ...json.result.items],
        count: json.result.count,
        waiting: false,
      },
      "Обновление списка товара"
    );
    // Запоминаем параметры в URL, которые отличаются от начальных
    let queryString = qs.stringify(diff(newParams, this.initState().params));
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }

  async initialLoadItems(query = "") {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Загрузка списка товара"
    );

    const pageURL = query?.match(/\?page=(\d*)&/);
    const limitURL = query.match(/limit=(\d*)&/);

    const newURL = pageURL && query.replace(pageURL[0], "");

    const json = await this.services.api.request({
      url: `/api/v1/articles?fields=items(*),count&sort=order${
        newURL && "&" + newURL
      }
      `,
    });

    this.setState(
      {
        ...this.getState(),
        items: json.result.items,
        count: json.result.count,
        params: {
          ...this.getState().params,
          page: pageURL ? +pageURL[1] : 1,
          limit: limitURL ? +limitURL[1] : 10,
        },
        waiting: false,
      },
      "Загрузка списка товара"
    );
  }

  newParams(params = {}) {
    this.setState(
      {
        ...this.getState(),

        params: {
          ...this.getState().params,
          limit: params.limit ? params.limit : this.getState().params.limit,
          page: params.page ? params.page : this.getState().params.page,
        },
      },
      "Загрузка списка товара"
    );
    // console.log("store params after initial load", this.getState().params);
  }
}

export default CatalogState;
