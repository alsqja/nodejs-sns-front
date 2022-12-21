import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <Wrapper>
      <GridContainer>{children}</GridContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  width: 1200px;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`;
