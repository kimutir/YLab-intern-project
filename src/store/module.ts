import { IStore } from "@src/interfaces/interface-store";

class StateModule {
  /**
   * @param store {Store}
   * @param config {Object}
   */
  store: IStore;
  config: {
    name: string;
  };
  services: any;

  constructor(store: IStore, config: { name: string }) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig() {
    return {};
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.config.name];
  }

  setState(newState, description: string = "setState") {
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
