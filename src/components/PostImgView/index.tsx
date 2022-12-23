import { useMemo, useState } from "react";
import styled from "styled-components";
import { DotPage } from "../DotPage";
import { Modal } from "../Modal";

interface IProps {
  urls: string[];
  onClose: any;
}

export const PostImgView = ({ urls, onClose }: IProps) => {
  const length = useMemo(() => urls.length, [urls]);
  const [page, setPage] = useState(0);

  return (
    <Modal width={600} onClose={onClose}>
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
    </Modal>
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
  /* border: 1px solid black; */
`;
