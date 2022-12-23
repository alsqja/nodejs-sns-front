import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Backdrop, ModalContainer } from "./components";
import IconX from "./icon__x.svg";
import { ModalProps } from "./index.d";

export const Modal = ({
  title,
  width = 600,
  fullWidth,
  print,
  onClose,
  ...props
}: ModalProps) => {
  return (
    <>
      <Backdrop />
      <ModalContainer onClick={onClose}>
        <Wrapper
          width={width}
          fullWidth={fullWidth}
          print={print}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {!!title?.length && (
            <Header width={width}>
              {title} {!!onClose && <Close onClick={onClose} />}
            </Header>
          )}
          {!title?.length && (
            <Header width={width}>
              {!!onClose && <Close onClick={onClose} />}
            </Header>
          )}
          <Body {...props} />
        </Wrapper>
      </ModalContainer>
    </>
  );
};

const Wrapper = styled(({ width, fullWidth, print, ...props }) => (
  <div {...props} />
))<ModalProps>`
  position: relative;
  max-height: 80%;
  overflow-y: auto;
  border-radius: 10px;
  padding: 0 16px 16px 16px;
  background-color: ${theme.palette.white};
  box-shadow: 0 2px 4px 0 ${theme.palette.disabled};
  width: 100%;
  ${({ fullWidth, width }) => !fullWidth && `max-width: ${width}px;`}
`;

const Header = styled.header<{ width: number }>`
  background-color: ${theme.palette.white};
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${theme.palette.primary};
  ${({ width }) => width && `width: ${width - 25}px;`};
  position: fixed;
  min-height: 46px;
  letter-spacing: -0.27px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #f2f2f2;
`;

const Body = styled.div`
  padding-top: 56px;
  width: 100%;
`;

export const Close = styled.div`
  position: absolute;
  right: 8px;
  top: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url(${IconX});
  :active {
    opacity: 0.5;
  }
`;
