import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import Services from "./services";
import ServicesProvider from "./provider";
import config from "./config";
import { Provider } from "react-redux";
import counter from "./utils/counter";

// Менеджер сервисов
const services = new Services(config);

// Корень React приложения

const rootDOM: HTMLElement | null = document.getElementById("root");

if (rootDOM) {
  const root = createRoot(rootDOM);

  root.render(
    <Provider store={services.storeRedux}>
      <ServicesProvider services={services}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ServicesProvider>
    </Provider>
  );
}
