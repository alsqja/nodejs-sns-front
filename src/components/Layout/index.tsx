import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSession } from "../../hooks/session";
import { Header } from "../Header";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    }
  }, [user, navigate]);

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
