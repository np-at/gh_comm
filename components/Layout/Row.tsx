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
const RowDiv = styled.div`
  width: 100%;
  display: block;
  align-items: center;
`;
export const CenteredRow = styled(RowDiv)`
  width: 100%;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
`;
export default RowDiv;
