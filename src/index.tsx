import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Home } from "./home";
import { themes } from "tubeyou-components/dist/constants";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

document.body.setAttribute(
  "data-theme",

  JSON.parse(
    window.localStorage.getItem(process.env.THEME_LOCAL_STORAGE_KEY!) || "false"
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
