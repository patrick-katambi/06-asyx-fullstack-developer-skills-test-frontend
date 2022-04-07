import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import CreateTicket from "./features/create_ticket/CreateTicket";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" exact element={<App tab="home" />} />
        <Route path="create" exact strict element={<CreateTicket />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
