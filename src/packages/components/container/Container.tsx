import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledContainer from "./StyledContainer";
import { Grid } from "../utils";

const cellCreator = (n: number | string) => `repeat(${n}, minmax(0, 1fr))`;

const defaultRows = cellCreator(12);
const defaultCols = cellCreator(12);

const Container = ({ children, className, grid, ...rest }: Props) => {
  let _grid: Grid = {};

  if (grid) {
    if (grid.constructor === String) {
      [_grid.cols, _grid.rows] = grid.split("x").map(cellCreator); // 4x5
    } else {
      _grid = grid as Grid;

      if (!_grid.rows) {
        _grid.rows = defaultRows;
      }

      if (!_grid.cols) {
        _grid.cols = defaultCols;
      }
    }
  }

  const styledProps = { ..._grid };

  return (
    <StyledContainer
      className={cx(styles.container, className)}
      {...styledProps}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
};

Container.defaultProps = {
  grid: {
    rows: defaultRows,
    cols: defaultCols,
  },
};

export default Container;
