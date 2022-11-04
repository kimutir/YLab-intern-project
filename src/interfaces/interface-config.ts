export interface IConfig {
  api: { baseUrl: string };
  chatSocket: { url: string };
  store: {
    log: boolean;
    modules: {
      session: {
        tokenHeader: string;
      };
    };
  };
  storeRedux?: {};
}
