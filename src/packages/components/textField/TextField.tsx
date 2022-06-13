import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledTextField from "./StyledTextField";

// TODO: as sucks
const TextField = ({ children, size, gridPosition, as, className }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledTextField
      as={as}
      className={cx(styles.textField, className)}
      {...styledProps}
    >
      {children}
    </StyledTextField>
  );
};

TextField.defaultProps = {
  size: "small",
  as: "div"
};

export default TextField;
