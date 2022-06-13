import styled, { css, AnyStyledComponent } from "styled-components";

import { GridPos } from "../utils";

type AS = AnyStyledComponent["p"] | AnyStyledComponent["div"];

const StyledTextFieldFactory = ({ as }: { as: AS }) => styled(as)`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledTextFieldFactory;
