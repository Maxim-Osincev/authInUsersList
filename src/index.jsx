import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./main.scss";
import App from "./App.jsx";
import { store } from "./store/index.jsx";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
);
