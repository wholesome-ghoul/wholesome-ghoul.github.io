import { Button } from "../";
import { themes } from "../../constants";
import { ThemeContext } from "../../context";
import { SunIcon, MoonIcon } from "../../components/icons";
import { IconSize } from "../utils";
import Props from "./types";

const ThemeToggler = ({ gridPosition, size }: Props) => {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) =>
        theme === themes.dark ? (
          <Button
            onClick={toggleTheme}
            gridPosition={gridPosition}
            size={size}
            icon={<SunIcon size={IconSize[size]} />}
            transparent
          />
        ) : (
          <Button
            onClick={toggleTheme}
            gridPosition={gridPosition}
            size={size}
            icon={<MoonIcon size={IconSize[size]} />}
            transparent
          />
        )
      }
    </ThemeContext.Consumer>
  );
};

export default ThemeToggler;
