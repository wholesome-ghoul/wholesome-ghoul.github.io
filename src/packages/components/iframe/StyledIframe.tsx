import styled, { css } from "styled-components";

import { GridPos } from "../utils";

const StyledIframe = styled.iframe`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledIframe;
