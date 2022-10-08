import { method } from "lodash";

class WSService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
  }

  connect(token, success, onclose) {
    let socket;
    const fun = () => {
      socket = new WebSocket(this.config.url);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            method: "auth",
            payload: {
              token,
            },
          })
        );
      };

      socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        // учесть ошибку авторизации

        if (data?.method === "auth") {
          this.socket = socket;
          success(data);
        }
      };

      socket.onclose = (res) => {
        if (!res.wasClean) {
          onclose();
          fun();
        } else {
          onclose();
        }
      };
    };

    fun();
  }
}

export default WSService;

const userMessages = (keys, messages) => {
  console.log("keys:", keys);
  // const
  return messages.map((i) => {
    if (keys.includes(i._key)) return { ...i, userMesage: true };
    return { ...i, userMesage: false };
  });
};
