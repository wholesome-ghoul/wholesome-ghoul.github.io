import { Grid } from "tubeyou-components/dist/utils";
import { bp } from "tubeyou-components/dist/constants";

import { HomeSizes, HomeGridPositions } from "../types";

type ResizeHandler = {
  setMainGrid: React.Dispatch<React.SetStateAction<Grid>>;
  setGridPosition: React.Dispatch<React.SetStateAction<HomeGridPositions>>;
  setSize: React.Dispatch<React.SetStateAction<HomeSizes>>;
};

// TODO: WTF

const input = { rowPos: "3", colPos: "5/9" };
const downloadButton = { rowPos: "4", colPos: "5/9" };
const iframe = { rowPos: "6/10", colPos: "2/12" };
const header = { rowPos: "1", colPos: "2/12" };
const subHeader = { rowPos: "2", colPos: "2/12" };
const sidebar = { rowPos: "1/12", colPos: "1" };

const homeGridItems: HomeGridPositions = {
  input,
  downloadButton,
  iframe,
  header,
  subHeader,
  sidebar,
};

const resizeHandler =
  ({ setMainGrid, setGridPosition, setSize }: ResizeHandler) =>
  (_entry: ResizeObserverEntry) => {
    if (window.innerWidth <= bp.xsmall0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "small",
        input: "medium",
        downloadButton: "small",
        iframe: "small",
        logo: "small",
        sidebar: "small",
        modal: "medium",
      });
    } else if (window.innerWidth <= bp.xsmall1) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "medium",
        input: "medium",
        downloadButton: "small",
        iframe: "medium",
        logo: "medium",
        sidebar: "medium",
        modal: "medium",
      });
    } else if (window.innerWidth <= bp.xsmall2) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "medium",
        input: "large",
        downloadButton: "medium",
        iframe: "medium",
        logo: "medium",
        sidebar: "medium",
        modal: "medium",
      });
    } else if (window.innerWidth <= bp.small0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "large",
        input: "large",
        downloadButton: "medium",
        iframe: "large",
        logo: "large",
        sidebar: "large",
        modal: "large",
      });
    } else if (window.innerWidth <= bp.medium0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "large",
        input: "large",
        downloadButton: "medium",
        iframe: "large",
        logo: "xlarge",
        sidebar: "xlarge",
        modal: "large",
      });
    } else {
      setGridPosition({
        ...homeGridItems,
        iframe: { ...iframe, rowPos: "5/12" },
      });
      setSize({
        themeToggler: "large",
        input: "large",
        downloadButton: "medium",
        iframe: "large",
        logo: "xlarge",
        sidebar: "xlarge",
        modal: "large",
      });
    }

    setMainGrid({});
  };

export { resizeHandler, homeGridItems };
