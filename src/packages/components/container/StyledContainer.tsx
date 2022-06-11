import styled, { css } from "styled-components";

import { Grid } from "../utils";

const StyledContainer = styled.div`
  display: grid;
  ${({ rows, cols }: Grid) => css`
    grid-template-columns: ${cols};
    grid-template-rows: ${rows};
  `}
`;

export default StyledContainer;
