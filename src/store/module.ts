import Services from "@src/services";
import Store from ".";
import { IModules, IState } from "./type";
import * as modules from "./exports";

class StateModule {
  /**
   * @param store {Store}
   * @param config {Object}
   */
  // store: IStore;
  store: Store;
  config: {
    name: string;
    tokenHeader: string;
  };
  services: Services;

  constructor(store: Store, config: { name: string; tokenHeader: string }) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig(): {} {
    return {};
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): {} {
    return {};
  }

  getState() {
    return this.store.getState()[this.config.name];
  }
  // getState<T>():T {
  //   return this.store.getState()[this.config.name]
  // }

  setState(newState: any, description: string = "setState") {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.config.name]: newState,
      },
      description
    );
  }
}

export default StateModule;
