import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { PostCrad } from "../../components/PostCrad";
import { useLogout, useSession } from "../../hooks/session";

const DUMMYPOST = [
  {
    id: 10,
    contents: "asd",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:47:10.000Z",
    updatedAt: "2022-12-28T05:47:10.000Z",
    images: [
      {
        url: "https://node-sns-imgs.s3.ap-northeast-2.amazonaws.com/1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-12-19%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.09.47.png/0",
      },
    ],
    user: {
      id: 1,
      name: "1",
      profile:
        "https://node-sns-imgs.s3.ap-northeast-2.amazonaws.com/1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-12-19%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.09.47.png/0",
    },
    likes: [],
    comments: [],
  },
  {
    id: 9,
    contents: "ad1gv\n1d1",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:29:13.000Z",
    updatedAt: "2022-12-28T05:29:13.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 8,
    contents: "1235afx",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:29:07.000Z",
    updatedAt: "2022-12-28T05:29:07.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 7,
    contents: "zcxvzxc",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:29:01.000Z",
    updatedAt: "2022-12-28T05:29:01.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 6,
    contents: "f2e1\nff1ss",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:58.000Z",
    updatedAt: "2022-12-28T05:28:58.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 5,
    contents: "ds1",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:52.000Z",
    updatedAt: "2022-12-28T05:28:52.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 4,
    contents: "avcva",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:48.000Z",
    updatedAt: "2022-12-28T05:28:48.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 3,
    contents: "ac",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:43.000Z",
    updatedAt: "2022-12-28T05:28:43.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 2,
    contents: "r",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:40.000Z",
    updatedAt: "2022-12-28T05:28:40.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
  {
    id: 1,
    contents: "123",
    views: 0,
    user_id: 1,
    createdAt: "2022-12-28T05:28:36.000Z",
    updatedAt: "2022-12-28T05:28:36.000Z",
    images: [],
    user: {
      id: 1,
      name: "1",
      profile: null,
    },
    likes: [],
    comments: [],
  },
];

export const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { user } = useSession();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Layout>
      {/* <div>
        <AA>home</AA>
        <AA onClick={handleLogout}>logout</AA>
        <AA onClick={() => navigate(`/mypage/${user?.id}`)}>Mypage</AA>
        <AA onClick={() => navigate("/create")}>CreatePost</AA>
      </div> */}
      <Container>
        <PostCrad post={DUMMYPOST[0]} />
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
