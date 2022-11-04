import Store from "./store";
import APIService from "./api";
import createStoreRedux from "./store-redux";
import WSService from "./ws";
import { IConfig } from "@src/interfaces/interface-config";
import { IApi } from "@src/interfaces/interface-api";
import { IStore } from "@src/interfaces/interface-store";
import { IChatSocket } from "@src/interfaces/interface-chatSocket";

class Services {
  config: IConfig;
  private _store: IStore;
  private _api: IApi;
  private _storeRedux: any;
  private _chatSocket: IChatSocket;

  constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(): IStore {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api(): IApi {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Redux store
   */
  get storeRedux() {
    if (!this._storeRedux) {
      this._storeRedux = createStoreRedux(this, this.config.storeRedux);
    }
    return this._storeRedux;
  }

  /**
   * ChatSocket store
   */
  get chatSocket(): IChatSocket {
    if (!this._chatSocket) {
      this._chatSocket = new WSService(this, this.config.chatSocket);
    }
    return this._chatSocket;
  }
}

export default Services;
