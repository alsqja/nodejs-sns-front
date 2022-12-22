import styled from "styled-components";

interface IProps {
  src: string;
  width: number;
}

export const ProfileImg = ({ src, width }: IProps) => {
  return <ImgContainer src={src} width={width} />;
};

const ImgContainer = styled.div<{ src: string; width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  border-radius: ${({ width }) => width}px;
  background-image: url(${({ src }) => `'${src}'`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid black;
`;
