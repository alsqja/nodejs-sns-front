import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Layout } from "../../components/Layout";
import { ImgUploader } from "../../components/ImgUploader";
import { PostImgView } from "../../components/PostImgView";
import Typography from "../../components/Typography";
import { useCreatePost } from "../../hooks/api";

export const CreatePost = () => {
  const [contents, setContents] = useState("");
  const isActive = useMemo(() => contents.length > 0, [contents]);
  const [urls, setUrls] = useState<string[]>([]);
  const [modalOn, setModalOn] = useState(false);
  const [req, res] = useCreatePost();

  const handleCreate = useCallback(() => {
    req({ contents, urls });
  }, [contents, urls, req]);

  useEffect(() => {
    if (urls.length) {
      setModalOn(true);
    }
  }, [urls]);

  useEffect(() => {
    if (res.called && res.data && !res.error) {
      alert("게시글이 등록되었습니다.");
      window.location.replace("/");
    } else if (res.error) {
      alert(res.error.response.message);
    }
  });

  return (
    <Layout>
      <Wrapper>
        <Title>게시글 생성</Title>
        <TextField
          placeholder="내용을 입력하세요"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <ImgContainer>
          <ImgUploader
            multiple={true}
            url={urls}
            setUrl={setUrls}
            label="사진 추가"
          />
        </ImgContainer>
        <LoginButton isActive={isActive} onClick={handleCreate}>
          등록
        </LoginButton>
      </Wrapper>
      {modalOn && <PostImgView urls={urls} onClose={() => setModalOn(false)} />}
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 1200px;
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
`;

const Title = styled(Typography)`
  font-size: 34px;
  grid-column: 3 / span 8;
  display: flex;
  justify-content: center;
`;

const TextField = styled.textarea`
  resize: none;
  grid-column: 3 / span 8;
  height: 460px;
  padding: 10px;
  margin-top: 50px;
  border: 1px solid black;
`;

const LoginButton = styled.button<{ isActive: boolean }>`
  all: unset;
  grid-column: 9 / span 2;
  width: 292px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  color: ${theme.palette.white};
  font-weight: bold;
  background-color: ${({ isActive }) =>
    isActive ? theme.palette.primary : theme.palette.primaryLight};
`;

const ImgContainer = styled.div`
  grid-column: 10 / span 1;
  /* width: 292px; */
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border-radius: 10px; */
  /* margin-top: 40px; */
  /* margin-bottom: 20px; */
  cursor: pointer;
  color: ${theme.palette.primary};
`;
