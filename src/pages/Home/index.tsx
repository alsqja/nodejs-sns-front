import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { useLogout, useSession } from "../../hooks/session";

export const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { user } = useSession();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <Layout>
      <AA>home</AA>
      <AA onClick={handleLogout}>logout</AA>
      <AA>uploadImage</AA>
      <AA onClick={() => navigate(`/mypage/${user?.id}`)}>Mypage</AA>
    </Layout>
  );
};

const AA = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border: 1px solid black;
`;
