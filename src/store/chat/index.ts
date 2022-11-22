import StateModule from "@src/store/module";
import IChat, { MessageResponse } from "./type";

/**
 * Состояние товара
 */
class ChatState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): IChat {
    return {
      isLast: false,
      scroll: false,
      connected: false,
      messages: [],
      userMessages: [],
      unreadMessage: false,
    };
  }

  connect(token: string) {
    this.services.chatSocket.connect(
      token,
      (data) => {
        this.#callback(data);
      },
      () => {
        this.setState({
          ...this.initState(),
        });
      }
    );
  }

  #callback(res) {
    const data = JSON.parse(res.data);

    switch (data?.method) {
      // авторизация
      case "auth":
        this.setState({
          ...this.getState(),
          connected: data.payload.result,
        });
        break;
      // первоначальная загрузка
      case "last":
        const newMessages = this.#updateMessages(
          this.getState().messages,
          data.payload.items
        );

        this.setState({
          ...this.getState(),
          messages: [...newMessages, ...this.getState().messages],
        });
        break;
      // дозагрузка старых
      case "old":
        const updatedOld = [...data.payload.items];
        updatedOld.pop();

        if (updatedOld.length <= 1) {
          this.setState({
            ...this.getState(),
            isLast: true,
          });
        }

        this.setState({
          ...this.getState(),
          messages: [...updatedOld, ...this.getState().messages],
        });
        break;
      // отправка - прием сообщений
      case "post":
        if (this.getState().userMessages.includes(data.payload._key)) {
          const checkedMessages = this.#checkStatus(data);

          this.setState({
            ...this.getState(),
            scroll: true,
            messages: checkedMessages,
          });
        } else {
          this.setState({
            ...this.getState(),
            unreadMessage: true,
            messages: [...this.getState().messages, data.payload],
          });
        }
        break;
      default:
        break;
    }
  }

  #updateMessages(oldArr, recievedArr) {
    if (!oldArr.length) return recievedArr;
    const newArr: any[] = [];
    const oldKeys = oldArr.map((i) => i._key);
    recievedArr.forEach((i) => {
      if (oldKeys.includes(i._key)) {
        newArr.push(i);
      }
    });
    return newArr;
  }

  #checkStatus(data) {
    const newArr = [...this.getState().messages].map((i) => {
      if (i._key === data.payload._key)
        return { ...data.payload, status: "отправлено" };
      return i;
    });

    return newArr;
  }

  load(
    method = "last",
    payload: {
      _key?: string;
      fromId?: string;
      fromDate?: string;
      text?: string;
    } = {}
  ) {
    const socket = this.services.chatSocket.socket;

    // сохраняем ключи для сверки статуса
    if (payload._key) {
      this.setState({
        ...this.getState(),
        userMessages: [...this.getState().userMessages, payload._key],
      });
    }

    socket.send(
      JSON.stringify({
        method: method,
        payload: payload,
      })
    );
  }

  close() {
    this.services.chatSocket.disconnect();
  }

  postMessage(key: string, text: string, id: string) {
    this.setState({
      ...this.getState(),
      unreadMessage: true,

      messages: [
        ...this.getState().messages,
        {
          // createDate: new Date(),
          _key: key,
          text,
          author: { profile: { name: "test" }, _id: id },
          status: "отправляется",
        },
      ],
    });
  }

  resetScroll() {
    this.setState({
      ...this.getState(),
      scroll: false,
      unreadMessage: false,
    });
  }
}

export default ChatState;
