export interface IConfigStore {
  log: boolean;
  modules: {
    session: {
      tokenHeader: string;
    };
  };
}

export interface IConfigApi {
  baseUrl: string;
}

export interface IConfigWS {
  url: string;
}

export default interface IConfig {
  store: IConfigStore;
  api: IConfigApi;
  chatSocket: IConfigWS;
  storeRedux?: {};
}

type Listener = () => void;

export type IListeners = Listener[];
