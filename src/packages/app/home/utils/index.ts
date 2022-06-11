import { Grid } from "../../../components/utils";
import { bp } from "../../../constants";
import { HomeSizes, HomeGridPositions } from "../types";

type ResizeHandler = {
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
  setGridPosition: React.Dispatch<React.SetStateAction<HomeGridPositions>>;
  setSize: React.Dispatch<React.SetStateAction<HomeSizes>>;
};

// TODO: WTF

const input = { rowPos: "3", colPos: "5/9" };
const downloadButton = { rowPos: "4", colPos: "5/9" };
const themeToggler = { rowPos: "1/2", colPos: "12" };
const iframe = { rowPos: "6/10", colPos: "2/12" };
const header = { rowPos: "1", colPos: "2/12" };
const subHeader = { rowPos: "2", colPos: "2/12" };
const logo = { rowPos: "2", colPos: "2/12" };

const homeGridItems: HomeGridPositions = {
  input,
  downloadButton,
  themeToggler,
  iframe,
  header,
  subHeader,
  logo,
};

const resizeHandler =
  ({ setGrid, setGridPosition, setSize }: ResizeHandler) =>
  (_entry: ResizeObserverEntry) => {
    if (window.innerWidth <= bp.xsmall0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "small",
        input: "medium",
        downloadButton: "small",
        iframe: "small",
        logo: "small",
      });
    } else if (window.innerWidth <= bp.xsmall1) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "medium",
        input: "medium",
        downloadButton: "small",
        iframe: "medium",
        logo: "medium",
      });
    } else if (window.innerWidth <= bp.xsmall2) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "medium",
        input: "large",
        downloadButton: "medium",
        iframe: "medium",
        logo: "medium",
      });
    } else if (window.innerWidth <= bp.small0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "large",
        input: "large",
        downloadButton: "medium",
        iframe: "large",
        logo: "large",
      });
    } else if (window.innerWidth <= bp.medium0) {
      setGridPosition(homeGridItems);
      setSize({
        themeToggler: "large",
        input: "large",
        downloadButton: "medium",
        iframe: "large",
        logo: "xlarge",
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
      });
    }

    setGrid({});
  };

export { resizeHandler, homeGridItems };
