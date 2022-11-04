import { IConfig } from "./interface-config";

type Listener = () => void;

export interface IStore {
  config: {
    log: boolean;
    modules: {
      session: {
        tokenHeader: string;
      };
    };
  };
  listeners: Listener[];
  modules: any;
  services: any;
  getState: () => any;
  setState: ({}: any, description: string) => void;
}
