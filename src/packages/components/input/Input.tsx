import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledInput from "./StyledInput";

const placeholders = [
  "(╯°□°）╯︵ ┻━┻",
  "（╯°□°）╯︵( .o.)",
  "┬──┬ ノ( ゜-゜ノ)",
];

const Input = ({
  type,
  value,
  onChange,
  size,
  gridPosition,
  placeholder,
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledInput
      className={cx(styles.input, styles[`${size}Input`], className)}
      placeholder={`${placeholder} Youtube Link goes here`}
      type={type}
      value={value}
      onChange={onChange}
      {...styledProps}
    />
  );
};

Input.defaultProps = {
  size: "small",
  type: "text",
  placeholder: placeholders[0],
};

export default Input;
