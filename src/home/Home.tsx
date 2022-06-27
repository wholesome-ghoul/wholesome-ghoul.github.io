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
  Sidebar,
  Modal,
  Switch,
} from "tubeyou-components";
import { ThemeContext } from "tubeyou-components/dist/context";
import { themes } from "tubeyou-components/dist/constants";
import {
  useDarkMode,
  useResizeObserver,
  useEventListener,
  useLocalStorage,
} from "tubeyou-components/dist/hooks";
import { TyIcon, EmailIcon } from "tubeyou-components/dist/icons";
import { Grid, IconSize } from "tubeyou-components/dist/utils";

import { HomeSizes, HomeGridPositions } from "./types";
import { resizeHandler, homeGridItems } from "./utils";
import styles from "./style.module.scss";
import { MIN_MOUSE_HOLD_TIME } from "../utils";

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

// TODO: too many states
// TODO: move main grid into it's own component
const Home = () => {
  const [ytLink, setYtLink] = useState("");
  const [isValidYtLink, setIsValidYtLink] = useState(false);
  const [request, setRequest] = useState("");
  const [youtubeID, setYoutubeID] = useState<string | null>(null);
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode(themes.dark);
  const [shortcutsModal, setShortcutsModal] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useLocalStorage(
    "tubeyou-shortcuts",
    true
  );
  const [mainGrid, setMainGrid] = useState<Grid>({});
  const [gridPosition, setGridPosition] =
    useState<HomeGridPositions>(homeGridItems);
  const [size, setSize] = useState<HomeSizes>({
    input: "medium",
    downloadButton: "small",
    themeToggler: "small",
    iframe: "small",
    logo: "small",
    sidebar: "small",
    modal: "medium",
  });

  const holdStartListener = useCallback(() => {
    if (shortcutsEnabled) {
      holdTime = Date.now();
    }
  }, [shortcutsEnabled]);
  const holdEndListener = useCallback(async () => {
    if (shortcutsEnabled) {
      holdTime = Date.now() - holdTime;
      if (holdTime >= MIN_MOUSE_HOLD_TIME) {
        const clipboard = await navigator.clipboard.readText();
        setYtLink(clipboard);
      }
      holdTime = 0;
    }
  }, [shortcutsEnabled]);

  useEventListener("touchstart", holdStartListener, document.body);
  useEventListener("touchend", holdEndListener, document.body);

  useEventListener("mousedown", holdStartListener, document.body);
  useEventListener("mouseup", holdEndListener, document.body);

  useEventListener(
    "keydown",
    (e) => shortcutsEnabled && e.keyCode === 27 && setShortcutsModal(false),
    document.body
  );

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
      <Modal visible={shortcutsModal} size={size.modal}>
        <Container className={styles.shortcutsModalContent} grid="1x2">
          <li>
            Hold mouse/touch anywhere on the page for at least{" "}
            {MIN_MOUSE_HOLD_TIME} milliseconds to paste the last shit you copied
          </li>
          <li>Press `ESC` or click the logo again to close this modal</li>
          <Switch
            checked={shortcutsEnabled}
            onChange={() => setShortcutsEnabled((prev: boolean) => !prev)}
          >
            Shortcuts are {shortcutsEnabled ? "enabled" : "disabled"}
          </Switch>
        </Container>
      </Modal>
      <Container grid={mainGrid} className={styles.home}>
        <Sidebar
          options={[
            {
              icon: (
                <Button
                  icon={<TyIcon size={IconSize[size.logo]} />}
                  onClick={() => setShortcutsModal((prev) => !prev)}
                  active={shortcutsModal}
                />
              ),
            },
            {
              icon: <ThemeToggler size={size.themeToggler} />,
            },
          ]}
          gridPosition={gridPosition.sidebar}
          className={styles.sidebar}
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
