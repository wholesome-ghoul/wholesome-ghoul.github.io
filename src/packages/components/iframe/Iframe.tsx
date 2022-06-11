import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledIframe from "./StyledIframe";

const Iframe = ({ gridPosition, size, className, src, ...rest }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledIframe
      className={cx(styles.iframe, styles[`${size}Iframe`], className)}
      src={src}
      {...styledProps}
      {...rest}
    ></StyledIframe>
  );
};

Iframe.defaultProps = {
  size: "small",
};

export default Iframe;
