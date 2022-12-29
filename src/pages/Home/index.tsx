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
  }, [logout]);

  return (
    <Layout>
      <div>
        <AA>home</AA>
        <AA onClick={handleLogout}>logout</AA>
        <AA onClick={() => navigate(`/mypage/${user?.id}`)}>Mypage</AA>
        <AA onClick={() => navigate("/create")}>CreatePost</AA>
      </div>
    </Layout>
  );
};

const AA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border: 1px solid black;
`;
