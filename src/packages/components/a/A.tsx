import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledA from "./StyledA";

const A = ({
  children,
  gridPosition,
  size,
  className,
  noBorder,
  ...rest
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledA
      className={cx(
        styles.a,
        styles[`${size}A`],
        { [styles.noBorder]: noBorder },
        className
      )}
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
  noBorder: false,
};

export default A;
