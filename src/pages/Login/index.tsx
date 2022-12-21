import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextField } from "../../components/TextField";
import Typography from "../../components/Typography";
import { useLogin } from "../../hooks/session";
import theme from "../../styles/theme";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isActive = useMemo(
    () => name.length > 0 && password.length > 0,
    [name, password]
  );
  const [req, res] = useLogin();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      req(name, password);
    },
    [name, password, req]
  );

  const handleLink = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  useEffect(() => {
    if (res.loading) return;
    if (res.called && res.data && !res.error) {
      navigate("/");
    } else if (res.error) {
      alert(res.error.response.data);
    }
  }, [navigate, res]);

  return (
    <Wrapper>
      <Container onSubmit={handleLogin}>
        <Title>로그인</Title>
        <TextField title="아이디" value={name} onChange={setName} />
        <TextField
          title="비밀번호"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <LoginButton isActive={isActive}>로그인</LoginButton>
        <Typography>아직 계정이 없으신가요?</Typography>
        <SignupLink color={theme.palette.primary} onClick={handleLink}>
          회원가입
        </SignupLink>
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

const Container = styled.form`
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

const LoginButton = styled.button<{ isActive: boolean }>`
  all: unset;
  width: 292px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
  cursor: pointer;
  color: ${theme.palette.white};
  font-weight: bold;
  background-color: ${({ isActive }) =>
    isActive ? theme.palette.primary : theme.palette.primaryLight};
`;

const SignupLink = styled(Typography)`
  margin-top: 10px;
  cursor: pointer;
  color: ${theme.palette.primary};
`;
