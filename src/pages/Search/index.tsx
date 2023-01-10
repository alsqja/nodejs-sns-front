import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPostWithComments } from "../Home/index.d";
import { Layout } from "../../components/Layout";
import { PostCrad } from "../../components/PostCrad";
import { useSearchPosts } from "../../hooks/api";
import { FloatBtn } from "../../components/FloatBtn";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const location = useLocation();
  const { query } = location.state || "";
  const [req, res] = useSearchPosts();
  const [posts, setPosts] = useState<IPostWithComments[]>([]);

  useEffect(() => {
    req(query, 1, 10);
  }, [req, query]);

  useEffect(() => {
    if (res.called && res.data) {
      setPosts(res.data.rows);
    }
  }, [res]);

  return (
    <Layout>
      <Container>
        {posts.map((el: IPostWithComments) => (
          <PostCrad post={el} key={el.id} />
        ))}
      </Container>
      <FloatBtn />
    </Layout>
  );
};

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
`;
