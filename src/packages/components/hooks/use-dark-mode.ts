import React from "react";

import { themes } from "../../constants";
import { useLocalStorage, usePrefersDarkMode } from "./";

const useDarkMode = (
  mode: string,
  themeAttr: string = "data-theme",
  storageKey: string = process.env.REACT_APP_THEME_LOCAL_STORAGE_KEY!
) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useLocalStorage(
    storageKey,
    mode
  );
  const prefersDarkMode = usePrefersDarkMode();
  const enabled = isDarkModeEnabled || prefersDarkMode;

  React.useEffect(() => {
    if (enabled) document.body.setAttribute(themeAttr, themes.dark);
    else document.body.setAttribute(themeAttr, themes.light);
  }, [enabled, themeAttr]);

  return [enabled, setIsDarkModeEnabled];
};

export default useDarkMode;
