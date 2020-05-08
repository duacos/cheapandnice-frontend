import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/normalize.css";
import "./assets/styles/general.sass";

import App from "./router";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
