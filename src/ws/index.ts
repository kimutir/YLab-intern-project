import Services from "@src/services";
import { IConfigWS } from "@src/types/type-config";

class WSService {
  services: Services;
  config: IConfigWS;
  socket: WebSocket;

  constructor(services: Services, config: IConfigWS) {
    this.services = services;
    this.config = config;
  }

  connect(token: string, callback, onclose: () => void) {
    this.socket = new WebSocket(this.config.url);

    // Проверка входа пользователя
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

    // Обработка входящих
    this.socket.onmessage = (res) => {
      callback(res);
    };

    // Закрытие соединения
    this.socket.onclose = (res) => {
      if (!res.wasClean) {
        // Переподключение
        this.connect(token, callback, onclose);
      } else {
        // Ручное отключение
        onclose();
      }
    };
  }

  disconnect() {
    this.socket.close();
  }
}

export default WSService;
