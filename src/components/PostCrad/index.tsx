import styled from "styled-components";
import theme from "../../styles/theme";
import { IPostWithComments } from "../../pages/Home/index.d";
import { ProfileImg } from "../ProfileImg";
import { PostCardImg } from "../PostCardImg";

interface IProps {
  post: IPostWithComments;
}

export const PostCrad = ({ post }: IProps) => {
  return (
    <Wrapper>
      <UserContainer>
        <ProfileImg src={post.user.profile || ""} width={40} />
        <UserName>{post.user.name}</UserName>
      </UserContainer>
      {post.images.length > 0 && (
        <PostCardImg urls={post.images.map((el) => el.url)} />
      )}
      <PostContents>{post.contents}</PostContents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-column: 3 / span 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${theme.palette.shadow01};
  min-height: 300px;
  border-radius: 50px;
`;

const UserContainer = styled.div`
  display: flex;
  width: 80%;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.palette.border};
  align-items: center;
`;

const UserName = styled.div`
  font-size: large;
  font-weight: bold;
  margin-left: 10px;
`;

const PostContents = styled.div`
  width: 80%;
  padding: 30px 0%;
  max-height: 200px;
  overflow: hidden;
  white-space: nowrap;
`;
