import React, { useCallback, useState } from "react";
import {
  Button,
  Input,
  Container,
  ThemeToggler,
  Iframe,
  Header,
  TextField,
  A,
} from "tubeyou-components";
import { ThemeContext } from "tubeyou-components/dist/context";
import { themes } from "tubeyou-components/dist/constants";
import {
  useDarkMode,
  useResizeObserver,
  useEventListener,
} from "tubeyou-components/dist/hooks";
import { TyIcon, EmailIcon } from "tubeyou-components/dist/icons";
import { Grid, IconSize } from "tubeyou-components/dist/utils";

import { HomeSizes, HomeGridPositions } from "./types";
import { resizeHandler, homeGridItems } from "./utils";
import styles from "./style.module.scss";

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

let holdTime: number = 0;
const MIN_HOLD_TIME = 500;

// TODO: too many states
// TODO: move main grid into it's own component
const Home = () => {
  const [ytLink, setYtLink] = useState("");
  const [isValidYtLink, setIsValidYtLink] = useState(false);
  const [request, setRequest] = useState("");
  const [youtubeID, setYoutubeID] = useState<string | null>(null);
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode(themes.dark);
  const [mainGrid, setMainGrid] = useState<Grid>({});
  const [gridPosition, setGridPosition] =
    useState<HomeGridPositions>(homeGridItems);
  const [size, setSize] = useState<HomeSizes>({
    input: "medium",
    downloadButton: "small",
    themeToggler: "small",
    iframe: "small",
    logo: "small",
  });

  const holdStartListener = useCallback(() => {
    holdTime = Date.now();
  }, []);
  const holdEndListener = useCallback(async () => {
    holdTime = Date.now() - holdTime;
    if (holdTime >= MIN_HOLD_TIME) {
      const clipboard = await navigator.clipboard.readText();
      setYtLink(clipboard);
    }
    holdTime = 0;
  }, []);

  useEventListener("touchstart", holdStartListener, document.body);
  useEventListener("touchend", holdEndListener, document.body);

  useEventListener("mousedown", holdStartListener, document.body);
  useEventListener("mouseup", holdEndListener, document.body);

  const toggleTheme = () => {
    setDarkModeEnabled((prev: any) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYtLink(event.currentTarget.value);
  };

  useResizeObserver(
    document.body,
    resizeHandler({ setMainGrid, setGridPosition, setSize })
  );

  React.useEffect(() => {
    if (isValid(ytLink.trim())) {
      setIsValidYtLink(true);
      setYoutubeID(getYoutubeIDFromURL(ytLink.trim()));
      setRequest(`${server}/api/convert?ytLink=${ytLink.trim()}`);
    } else {
      setIsValidYtLink(false);
    }
  }, [ytLink]);

  const downloadHandler = () => {
    isValidYtLink && window.open(request, "_self");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: darkModeEnabled ? themes.dark : themes.light,
        toggleTheme,
      }}
    >
      <Container grid={mainGrid} className={styles.home}>
        <Button
          icon={<TyIcon size={IconSize[size.logo]} />}
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
          onClick={downloadHandler}
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
      <Container grid="1x2">
        <A
          gridPosition={{
            rowPos: "1",
            colPos: "1/-1",
          }}
          href="mailto:wholesome.ghoul@gmail.com"
          noBorder
        >
          <EmailIcon />
        </A>
        <TextField
          gridPosition={{
            rowPos: "2",
            colPos: "1/-1",
          }}
          as="p"
        >
          Sorry for the design, I am just a programmer.
        </TextField>
      </Container>
    </ThemeContext.Provider>
  );
};

export default Home;
