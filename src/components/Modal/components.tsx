import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0%    {opacity: 0;}
  100%  {opacity: 1;}
`;

export const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  z-index: 100000010;
  background-color: #2c2c2ccc;
  animation: 200ms ${fadeIn} linear;
`;

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 100000011;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  max-height: 100vh;
`;
