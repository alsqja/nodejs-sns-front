import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

export const FloatBtn = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/create");
  }, [navigate]);

  return (
    <div>
      <FloatingBtn onClick={handleClick}>
        <Plus>+</Plus>
      </FloatingBtn>
    </div>
  );
};

const FloatingBtn = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 40px;
  right: 20%;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  color: white;
  background-color: ${theme.palette.primary};
  font-size: 50px;
  cursor: pointer;
  box-shadow: ${theme.palette.shadow02};
`;

const Plus = styled.div`
  position: relative;
  top: -5px;
`;
