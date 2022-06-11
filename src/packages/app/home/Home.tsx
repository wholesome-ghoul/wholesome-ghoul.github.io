import React from "react";

import {
  Button,
  Input,
  Container,
  ThemeToggler,
  Iframe,
  Header,
} from "../../components";
import { ThemeContext } from "../../context";
import { themes } from "../../constants";
import { useDarkMode, useResizeObserver } from "../../components/hooks";
import { HomeSizes, HomeGridPositions } from "./types";
import { Grid, IconSize } from "../../components/utils";
import { resizeHandler, homeGridItems } from "./utils";
import styles from "./style.module.scss";
import Ty from "../../components/icons/Ty";

const isValid = (ytLink: string) => {
  const p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matches = ytLink.match(p);
  if (matches) {
    return matches[1];
  }

  return false;
};

// TODO: .env?
const server =
  process.env.REACT_APP_STAGE_ENV === "development"
    ? process.env.REACT_APP_PRODUCTION_LOCAL_URL
    : process.env.REACT_APP_PRODUCTION_SERVER_URL;

const getYoutubeIDFromURL = (ytLink: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = ytLink.match(regExp);

  return match && match[7].length === 11 ? match[7] : null;
};

const Home = () => {
  const [ytLink, setYtLink] = React.useState("");
  const [isValidYtLink, setIsValidYtLink] = React.useState(false);
  const [request, setRequest] = React.useState("");
  const [youtubeID, setYoutubeID] = React.useState<string | null>(null);
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode(themes.dark);
  const [grid, setGrid] = React.useState<Grid>({});
  const [gridPosition, setGridPosition] =
    React.useState<HomeGridPositions>(homeGridItems);
  const [size, setSize] = React.useState<HomeSizes>({
    input: "medium",
    downloadButton: "small",
    themeToggler: "small",
    iframe: "small",
    logo: "small",
  });

  const toggleTheme = () => {
    setDarkModeEnabled((prev: any) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYtLink(event.currentTarget.value);
  };

  useResizeObserver(
    document.body,
    resizeHandler({ setGrid, setGridPosition, setSize })
  );

  React.useEffect(() => {
    if (isValid(ytLink)) {
      setIsValidYtLink(true);
      setYoutubeID(getYoutubeIDFromURL(ytLink));
      setRequest(`${server}/api/convert?ytLink=${ytLink}`);
    } else {
      setIsValidYtLink(false);
    }
  }, [ytLink]);

  const handler = () => {
    isValidYtLink && window.open(request, "_self");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: darkModeEnabled ? themes.dark : themes.light,
        toggleTheme,
      }}
    >
      <Container grid={grid} className={styles.home}>
        <Button
          icon={<Ty size={IconSize[size.logo]} />}
          onClick={() => alert("I don't know what to do in this case >.<")}
        />
        <Header gridPosition={gridPosition.header}>No Ads. Ever.</Header>
        <Header
          gridPosition={gridPosition.subHeader}
          level={3}
          className={styles.subHeader}
        >
          Why? Cuz F@#$'em That's Why.
        </Header>
        <Input
          gridPosition={gridPosition.input}
          size={size.input}
          value={ytLink}
          onChange={handleInputChange}
        />
        <Button
          onClick={handler}
          gridPosition={gridPosition.downloadButton}
          size={size.downloadButton}
          disabled={!isValidYtLink}
        >
          Download
        </Button>
        <ThemeToggler
          size={size.themeToggler}
          gridPosition={gridPosition.themeToggler}
        />
        {isValidYtLink && (
          <Iframe
            src={`https://www.youtube.com/embed/${youtubeID}`}
            gridPosition={gridPosition.iframe}
            size={size.iframe}
          />
        )}
      </Container>
    </ThemeContext.Provider>
  );
};

export default Home;
