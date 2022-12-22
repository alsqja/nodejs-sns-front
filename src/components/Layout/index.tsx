import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSession } from "../../hooks/session";

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

  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
