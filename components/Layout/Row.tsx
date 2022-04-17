import React from "react";

import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  padding: 0 1.0875rem;
`;
interface RowDivProps {
  alignment?: "center" | "left" | "right";
}
const RowDiv = styled.div<RowDivProps>`
  width: 100%;
  display: block;
  text-align: ${props =>props.alignment ? props.alignment : "left"};
`;
export const CenteredRow = styled(RowDiv)`
  width: 100%;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
`;
export default RowDiv;
