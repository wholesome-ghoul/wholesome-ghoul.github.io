import { GridPos, Size } from "tubeyou-components/dist/utils";

// TODO: [key]: Size
type Sizes = {
  input: Size;
  downloadButton: Size;
  themeToggler: Size;
  iframe: Size;
  logo: Size;
};

// TODO: [key]: GridPos
type GridPositions = {
  input: GridPos;
  downloadButton: GridPos;
  themeToggler: GridPos;
  iframe: GridPos;
  header: GridPos;
  subHeader: GridPos;
  logo: GridPos;
};

export type { Sizes as HomeSizes, GridPositions as HomeGridPositions };
