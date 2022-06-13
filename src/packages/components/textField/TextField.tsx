import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledTextFieldFactory from "./StyledTextField";

const StyledTextField = StyledTextFieldFactory({ as: "div" });

const TextField = ({ children, size, gridPosition, className }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledTextField
      className={cx(styles.textField, className)}
      {...styledProps}
    >
      {children}
    </StyledTextField>
  );
};

TextField.defaultProps = {
  size: "small",
};

export default TextField;
