import { GridPos, Size } from "tubeyou-components/dist/utils";

// TODO: [key]: Size
type Sizes = {
  input: Size;
  downloadButton: Size;
  themeToggler: Size;
  iframe: Size;
  logo: Size;
  sidebar: Size;
  modal: Size;
};

// TODO: [key]: GridPos
type GridPositions = {
  input: GridPos;
  downloadButton: GridPos;
  iframe: GridPos;
  header: GridPos;
  subHeader: GridPos;
  sidebar: GridPos;
};

export type { Sizes as HomeSizes, GridPositions as HomeGridPositions };
