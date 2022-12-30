import { useMemo, useState } from "react";
import styled from "styled-components";
import { DotPage } from "../DotPage";

interface IProps {
  urls: string[];
}

export const PostCardImg = ({ urls }: IProps) => {
  const length = useMemo(() => urls.length, [urls]);
  const [page, setPage] = useState(0);

  return (
    <Wrapper>
      <ImgContainer>
        <div
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          {"<"}
        </div>
        <Img src={urls[page]} />
        <div
          onClick={() => {
            if (page < length - 1) {
              setPage(page + 1);
            }
          }}
        >
          {">"}
        </div>
      </ImgContainer>
      <DotPage currentPage={page} totalPage={length} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Img = styled.div<{ src: string }>`
  margin-top: 50px;
  width: 80%;
  height: 500px;
  background-image: url(${({ src }) => `'${src}'`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
