import React from "react";

import { useEventListener } from "./";

const usePrefersDarkMode = () => {
  let mql = window.matchMedia("(prefers-color-scheme: dark)");
  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false);

  // TODO: type
  const handler = (e: any) => {
    setPrefersDarkMode(e.matches);
  };

  useEventListener("change", handler, mql);

  return prefersDarkMode;
};

export default usePrefersDarkMode;
