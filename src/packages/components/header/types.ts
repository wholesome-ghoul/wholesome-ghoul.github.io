import { BaseProps, Size } from "../utils";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default Props;
