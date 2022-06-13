import { AnyStyledComponent } from "styled-components";

import { BaseProps, Size } from "../utils";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
  as?: AnyStyledComponent["p"] | AnyStyledComponent["div"];
};

export default Props;
