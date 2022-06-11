import { createContext } from "react";
import { themes } from "../constants";

const ThemeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

export { ThemeContext };
