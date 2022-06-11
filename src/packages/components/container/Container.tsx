import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledContainer from "./StyledContainer";

const defaultRows = "repeat(12, minmax(0, 1fr))";
const defaultCols = "repeat(12, minmax(0, 1fr))";

const Container = ({ children, className, grid, ...rest }: Props) => {
  if (grid) {
    if (!grid.rows) {
      grid.rows = defaultRows;
    }

    if (!grid.cols) {
      grid.cols = defaultCols;
    }
  }

  const styledProps = { ...grid };

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
