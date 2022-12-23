import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Layout } from "../../components/Layout";
import { ImgUploader } from "../../components/ImgUploader";
import { PostImgView } from "../../components/PostImgView";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const isActive = useMemo(
    () => title.length > 0 && contents.length > 0,
    [title, contents]
  );
  const [urls, setUrls] = useState<string[]>([]);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    if (urls.length) {
      console.log("urls:", urls);
      setModalOn(true);
    }
  }, [urls]);

  return (
    <Layout>
      <Wrapper>
        <TitleField placeholder="제목" />
        <TextField placeholder="내용을 입력하세요" />
        <ImgContainer>
          <ImgUploader
            multiple={true}
            url={urls}
            setUrl={setUrls}
            label="사진 추가"
          />
        </ImgContainer>
        <LoginButton isActive={isActive}>완료</LoginButton>
        <div style={{ gridColumn: "3 / span 8" }}>
          {urls.map((src, index) => (
            <img
              src={src}
              alt=""
              key={index}
              width={"100px"}
              style={{ border: "1px solid black" }}
            />
          ))}
        </div>
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

const TitleField = styled.input`
  all: unset;
  grid-column: 3 / span 8;
  border-radius: 10px;
  height: 40px;
  padding: 5px;
  font-size: 18px;
  border: 1px solid black;
  :focus {
    border: 2px solid ${theme.palette.primary};
  }
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
