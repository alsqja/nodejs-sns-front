import { useMemo, useState } from "react";
import styled from "styled-components";
import TextField from "../components/TextField";
import theme from "../styles/theme";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isActive = useMemo(
    () => name.length > 0 && password.length > 0,
    [name, password]
  );
  return (
    <Wrapper>
      <Container>
        <Title>로그인</Title>
        <TextField title="아이디" value={name} onChange={setName} />
        <TextField title="비밀번호" value={password} onChange={setPassword} />
        <LoginButton isActive={isActive}>로그인</LoginButton>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 372px;
  height: 554px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Title = styled.div`
  width: 292px;
  font-size: 22px;
  margin-bottom: 36px;
`;

const LoginButton = styled.div<{ isActive: boolean }>`
  width: 292px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 40px;
  background-color: ${({ isActive }) =>
    isActive ? theme.palette.primary : theme.palette.primaryLight};
`;
