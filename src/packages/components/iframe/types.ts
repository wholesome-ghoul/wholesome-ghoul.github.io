import { IframeHTMLAttributes } from "react";

import { BaseProps, Size } from "../utils";

type Props = BaseProps &
  IframeHTMLAttributes<HTMLIFrameElement> & {
    children?: React.ReactNode;
    size?: Size;
  };

export default Props;
