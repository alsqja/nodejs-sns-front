import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IPostWithComments } from "./index.d";
import { Layout } from "../../components/Layout";
import { PostCrad } from "../../components/PostCrad";
import { useGetPosts } from "../../hooks/api";
import { useLogout, useSession } from "../../hooks/session";

export const Home = () => {
  const [req, res] = useGetPosts();
  const [posts, setPosts] = useState<IPostWithComments[]>([]);
  const logout = useLogout();
  const navigate = useNavigate();
  const { user } = useSession();

  useEffect(() => {
    req(1, 10);
  }, [req]);

  useEffect(() => {
    if (res.called && res.data) {
      setPosts(res.data.rows);
    }
  }, [res]);

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
      <Container>
        {posts.map((el: IPostWithComments) => (
          <PostCrad post={el} key={el.id} />
        ))}
      </Container>
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

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
`;
