import { BaseProps, Size } from "../utils";

type Target = "_blank" | "_self";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
  target?: Target;
  href?: string;
};

export default Props;
