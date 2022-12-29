import React from "react";
import styled from "styled-components";
import { Header } from "../Header";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;
