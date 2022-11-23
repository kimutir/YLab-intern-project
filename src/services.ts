import Store from "./store";
import APIService from "./api";
import createStoreRedux from "./store-redux";
import WSService from "./ws";
import IConfig from "@src/types/type-config";
import { IChatSocket } from "@src/types/type-chatSocket";

class Services {
  private config: IConfig;
  private _store: Store;
  private _api: APIService;
  private _storeRedux: any;
  private _chatSocket: WSService;

  constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(): Store {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Сервис АПИ
   */
  get api(): APIService {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Redux store
   */
  get storeRedux(): any {
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }

  /**
   * ChatSocket сервис
   */
  get chatSocket(): WSService {
    if (!this._chatSocket) {
      this._chatSocket = new WSService(this, this.config.chatSocket);
    }
    return this._chatSocket;
  }
}

export default Services;
