import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledA from "./StyledA";

const A = ({ children, gridPosition, size, className, ...rest }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledA
      className={cx(styles.a, styles[`${size}A`], className)}
      {...styledProps}
      {...rest}
    >
      {children}
    </StyledA>
  );
};

A.defaultProps = {
  size: "small",
  target: "_self",
};

export default A;
