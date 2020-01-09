import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App/App";
import Store from "./Stores/Stores";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./_lib";
/// Router ////
const Router = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Router />, document.getElementById("root"));
