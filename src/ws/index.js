class WSService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
  }

  connect(token, callback, onclose) {
    this.socket = new WebSocket(this.config.url);

    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          method: "auth",
          payload: {
            token,
          },
        })
      );
    };

    this.socket.onmessage = (res) => {
      // const data = JSON.parse(res.data);
      callback(res);
      // if (data?.method === "auth") {
      //   callback(data);
      // }
    };

    this.socket.onclose = (res) => {
      if (!res.wasClean) {
        this.connect(token, success, onclose);
      } else {
        onclose();
      }
    };
  }

  disconnect() {
    this.socket.close();
  }
}

export default WSService;
