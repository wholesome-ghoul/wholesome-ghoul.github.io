import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledHeader from "./StyledHeader";

const Header = ({ children, level, gridPosition, className }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledHeader
      className={cx(styles.header, styles[`h${level}`], className)}
      {...styledProps}
      as={`h${level}`}
    >
      {children}
    </StyledHeader>
  );
};

Header.defaultProps = {
  level: 1,
};

export default Header;
