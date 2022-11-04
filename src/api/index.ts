interface IConfig {}

class APIService {
  services: any;
  config: {
    baseUrl: string;
  };
  defaultHeaders: {
    [key: string]: string;
  };
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services: unknown, config: any = {}) {
    // console.log("config from APIService:", config);
    console.log("services from APIService:", services);
    this.services = services;
    this.config = {
      baseUrl: "",
      ...config,
    };
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<any>}
   */
  async request({
    url,
    method = "GET",
    headers = {},
    ...options
  }): Promise<any> {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...options,
    });
    return res.json();
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголвока
   * @param value {String|null} Значение загововка
   */
  setHeader(name: string, value: string | null = null): void {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
