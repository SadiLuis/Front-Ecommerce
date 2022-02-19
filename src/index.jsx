import React from "react";
import ReactDOM from "react-dom";
import AppEcommerce from "./AppEcommerce";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.module.css'
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppEcommerce />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
