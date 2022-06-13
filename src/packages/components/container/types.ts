import { BaseProps, Grid } from "../utils";

type Props = BaseProps & {
  children: React.ReactNode;
  grid?: Grid | string;
};

export default Props;
