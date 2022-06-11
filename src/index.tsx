import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Home } from "./packages/app";
import { themes } from "./packages/constants";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

document.body.setAttribute(
  "data-theme",

  JSON.parse(
    window.localStorage.getItem(
      process.env.REACT_APP_THEME_LOCAL_STORAGE_KEY!
    ) || "false" // >.<
  )
    ? themes.dark
    : themes.light
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
