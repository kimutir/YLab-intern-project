/**
 * Настройки сервисов
 */

import IConfig from "@src/types/interface-config";

const config: IConfig = {
  store: {
    log: false,

    modules: {
      session: {
        tokenHeader: "X-Token",
      },
    },
  },

  api: {
    baseUrl: "",
  },

  chatSocket: {
    url: "ws://example.front.ylab.io/chat",
  },
};

export default config;
