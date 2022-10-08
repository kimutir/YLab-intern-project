import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import Services from "./services";
import ServicesProvider from "./provider";
import config from "./config";
import { Provider } from "react-redux";

// Менеджер сервисов
const services = new Services(config);

// Корень React приложения
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={services.storeRedux}>
    <ServicesProvider services={services}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServicesProvider>
  </Provider>
);

let socket;

function connect() {
  socket = new WebSocket("ws://example.front.ylab.io/chat");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        method: "auth",
        payload: {
          token:
            "b32976da482f62588bb5c5ffe85b0a05484ba8a8691bc99494e7d083899f4763",
        },
      })
    );
  };

  socket.onmessage = (res) => {
    const data = JSON.parse(res.data);
    console.log("data", data);
  };

  socket.onclose = (res) => {
    console.log("closed", res);

    if (!res.wasClean) connect();
  };
}

// connect();
