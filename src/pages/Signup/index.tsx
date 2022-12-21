import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextField } from "../../components/TextField";
import Typography from "../../components/Typography";
import { useSignup } from "../../hooks/session";
import theme from "../../styles/theme";
import { checkPassValidation } from "../../utils/functions";

export const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const error = useMemo(
    () => checkPassValidation(password, checkPass),
    [password, checkPass]
  );
  const isActive = useMemo(
    () => name.length > 0 && password.length > 0 && !error,
    [name, password, error]
  );
  const [req, res] = useSignup();
  const navigate = useNavigate();

  const handleSignup = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (error) {
        return;
      }
      req({ name, password });
    },
    [password, error, req, name]
  );

  const handleLink = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (res.loading) return;
    if (res.called && res.data && !res.error) {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } else if (res.error) {
      alert(res.error.response.data);
    }
  }, [navigate, res]);

  return (
    <Wrapper>
      <Container onSubmit={handleSignup}>
        <Title>회원가입</Title>
        <TextField title="아이디" value={name} onChange={setName} />
        <TextField
          title="비밀번호"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <TextField
          title="비밀번호 확인"
          value={checkPass}
          onChange={setCheckPass}
          type="password"
          error={error}
        />
        <LoginButton isActive={isActive}>회원가입</LoginButton>
        <Typography>이미 계정이 있으신가요?</Typography>
        <SignupLink color={theme.palette.primary} onClick={handleLink}>
          로그인
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
  height: 654px;
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
