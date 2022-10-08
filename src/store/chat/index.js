import StateModule from "@src/store/module";

/**
 * Состояние товара
 */
class ChatState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      connected: false,
      messages: [],
      userMessages: [],
    };
  }

  connect(token) {
    this.services.chatSocket.connect(
      token,
      (data) => {
        this.setState({
          ...this.getState(),
          connected: data.payload.result,
        });
      },
      () => {
        this.setState({
          ...this.getState(),
          connected: false,
        });
      }
    );
  }

  load(method = "last", payload = {}) {
    const socket = this.services.chatSocket.socket;
    socket.send(
      JSON.stringify({
        method: method,
        payload: payload,
      })
    );

    // const userMessages = (id, messages) => {
    //   const result = messages.map((i) => {
    //     if (keys.includes(i._key)) return { ...i, userMessage: true };
    //     return { ...i, userMessage: false };
    //   });
    //   return result;
    // };
    const updateMessages = (oldArr, recievedArr) => {
      if (!oldArr.length) return recievedArr;
      const newArr = [];
      const oldKeys = oldArr.map((i) => i._id);
      recievedArr.forEach((i) => {
        if (oldKeys.includes(i._key)) {
          newArr.push(i);
        }
      });
      return newArr;
    };

    socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      if (data?.method === "last") {
        console.log("mess", data.payload.items);
        const newMessages = updateMessages(
          this.getState().messages,
          data.payload.items
        );

        this.setState({
          ...this.getState(),
          messages: [...newMessages, ...this.getState().messages],
        });
      }
      if (data?.method === "old") {
        const newArr = [...data.payload.items];
        newArr.pop();

        this.setState({
          ...this.getState(),
          messages: [...newArr, ...this.getState().messages],
        });
      }

      if (data?.method == "post") {
        console.log("ответ на отправку сообщения", data);
        if (this.getState().userMessages.includes(data.payload._key)) {
          this.setState({
            ...this.getState(),
            messages: [
              ...this.getState().messages,
              { ...data.payload, userMessage: true },
            ],
          });
        } else {
          this.setState({
            ...this.getState(),
            messages: [
              ...this.getState().messages,
              { ...data.payload, userMessage: false },
            ],
          });
        }
      }
    };
  }

  send(message, key) {
    const socket = this.services.chatSocket.socket;
    console.log("keys", this.getState().userMessages);

    this.setState({
      ...this.getState(),
      userMessages: [...this.getState().userMessages, key],
    });

    socket.send(
      JSON.stringify({
        method: "post",
        payload: {
          _key: key,
          text: message,
        },
      })
    );

    console.log("chat ctore", this.getState().messages);
  }
}

export default ChatState;
