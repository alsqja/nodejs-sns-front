import styled from "styled-components";

interface IProps {
  totalPage: number;
  currentPage: number;
}

export const DotPage = ({ totalPage, currentPage }: IProps) => {
  const arr = new Array(totalPage).fill(0);
  return (
    <Wrapper>
      <DotContainer>
        {arr.map((_, index) => (
          <Dot isOn={index === currentPage} key={index} />
        ))}
      </DotContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: -50px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Dot = styled.div<{ isOn: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  border: 1px solid black;
  margin: 0 3px;
  background-color: ${({ isOn }) => (isOn ? "red" : "white")};
`;
