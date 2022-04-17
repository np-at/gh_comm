import React from "react";
import styled, { css } from "styled-components";
import { Range } from "immutable";

const amount = 20;

const c = Range(0, amount - 1).toArray();
const HexGrid: React.FC<{}> = () => (
  // <HexGridContainer>
  //   {c.map((_, i) => (
  //     <GridItem key={i}>
  //       <GridItemContent>{i}</GridItemContent>
  //     </GridItem>
  //   ))}
  // </HexGridContainer>
  <Blk>
    <ul>
      {c.map((_, i) => (
        <li key={i}>
          <div />
        </li>
      ))}
    </ul>
    <ul>
      {c.map((_, i) => (
        <li key={i}>
          <div />
        </li>
      ))}
    </ul>
    <ul>
      {c.map((_, i) => (
        <li key={i}>
          <div />
        </li>
      ))}
    </ul>
  </Blk>
);

const grid_item_mixin = (mx_amt: number) => css`
  // Columns
  ${Range(1, mx_amt + 1, 1)
    .toArray()
    .map((i) => {
      return css`
        &:nth-of-type(${mx_amt}n + ${i}) {
          grid-column: ${i + i - 1} / span 3;
          ${i % 2 == 0
            ? css`
                grid-row: calc(var(--counter) + var(--counter) - 1) / span 2; ;
              `
            : css``}
        }
      `;
    })} // Rows
  ${Range(1, 21, 1)
    .toArray()
    .map((i) => {
      return css`
        &:nth-of-type(n + ${i * mx_amt + 1}) {
          --counter: ${i + 1};
        }
      `;
    })}
`;

const Blk = styled.div`
  width: 100%;
  position: static;
  --amount: ${amount};
  bottom: 0;
  --hexagon-color: rgb(255, 255, 255, 0.1);
  background-color: var(--workspace-color);

  & > ul {
    position: relative;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(var(--amount), 1fr 2fr) 1fr;
    grid-gap: 2.5rem 5rem;

    & li {
      position: relative;
      grid-column: 1 / span 3;
      grid-row: calc(var(--counter) + var(--counter)) / span 2;
      filter: drop-shadow(0 0 10px rgba(#444, 0.08));
      height: 0;
      padding-bottom: 90%;

      & div {
        position: absolute;
        height: 100%;
        width: 100%;
        font-size: 1.125rem;
        color: #111111;
        background-color: var(--hexagon-color);
        clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem 25%;
        text-decoration: none;
        text-align: center;
        transition: transform 0.24s ease-out;
      }
    }
  }

  @media screen and (min-width: 1440px) {
    & ul {
      --amount: ${amount};
      --counter: 1;
    }

    & li {
      ${grid_item_mixin(amount)}
    }
  }
  @media screen and (min-width: 1120px) and (max-width: 1439px) {
    & ul {
      --amount: 4;
      --counter: 1;

      & li {
        ${grid_item_mixin(4)}
      }
    }
  }
  @media screen and (min-width: 840px) and (max-width: 1119px) {
    & ul {
      --amount: 3;
      --counter: 1;
      grid-gap: 1.5rem 3rem;

      & li {
        ${grid_item_mixin(3)}
      }
    }
  }
  @media screen and (min-width: 480px) and (max-width: 839px) {
    & ul {
      --amount: 2;
      --counter: 1;
      grid-gap: 1.5rem 3rem;

      & li {
        ${grid_item_mixin(2)}
      }
    }
  }
  @media screen and (max-width: 479px) {
    & ul {
      --amount: 1;
      grid-gap: 1.5rem 3rem;
    }
  }
`;

export default HexGrid;
