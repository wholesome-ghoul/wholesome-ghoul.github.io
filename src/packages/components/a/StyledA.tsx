import styled, { css } from "styled-components";

import { GridPos } from "../utils";

const StyledA = styled.a`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledA;
