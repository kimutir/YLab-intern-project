import IConfig from "./type-config";

export interface IApi {
  config: { baseUrl: string };
  defaultHeaders: { [key: string]: string };
  services: {
    config: IConfig;
  };
}
