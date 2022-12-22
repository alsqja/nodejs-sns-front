import { useCallback, useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ImgUploader } from "../../components/ImgUploader";
import { ProfileImg } from "../../components/ProfileImg";
import { TextField } from "../../components/TextField";
import { IUserWithToken } from "../../hooks";
import { useMyInfo, useSession, useUpdateUser } from "../../hooks/session";
import { userState } from "../../stores/session";
import theme from "../../styles/theme";
import { checkPassValidation } from "../../utils/functions";

export const User = () => {
  const { user } = useSession();
  const [url, setUrl] = useState(user?.profile || "");
  const [newPassword, setNewPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const error = useMemo(
    () => checkPassValidation(newPassword, checkPass),
    [newPassword, checkPass]
  );
  const isActive = useMemo(
    () =>
      (newPassword.length > 0 && checkPass.length > 0) || url !== user?.profile,
    [newPassword, checkPass, url, user]
  );
  const [req, res] = useUpdateUser();
  const [myInfo, result] = useMyInfo();
  const setUser = useSetRecoilState(userState);

  const handleUpdate = useCallback(() => {
    req({ newPassword, profile: url });
  }, [newPassword, url, req]);

  useEffect(() => {
    if (res.data && res.called && !res.error) {
      alert(res.data.message);
      myInfo();
    }
    if (res.error) {
      alert(res.error.response.message);
    }
  }, [res, myInfo]);

  useEffect(() => {
    if (result.called && result.data) {
      const u = result.data?.data as IUserWithToken;
      setUser((prev) => {
        return { ...prev, ...u };
      });
    }
  }, [result.called, result.data, setUser]);

  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileImg src={url} width={100} />
        <LabelContainer>
          <ImgUploader
            multiple={false}
            url={url}
            setUrl={setUrl}
            label="프로필 사진 변경"
          />
        </LabelContainer>
      </ProfileContainer>
      <ProfileInfoContainer>
        <div>{user?.name}</div>
        <div>{user?.createdAt}</div>
      </ProfileInfoContainer>
      <div>
        <TextField
          title="새 비밀번호"
          value={newPassword}
          onChange={setNewPassword}
          type="password"
        />
        <TextField
          title="새 비밀번호 확인"
          value={checkPass}
          onChange={setCheckPass}
          type="password"
          error={error}
        />
        <LoginButton onClick={handleUpdate} isActive={isActive}>
          변경
        </LoginButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 1200px;
  grid-template-columns: repeat(12, 1fr);
`;

const ProfileContainer = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoContainer = styled.div`
  grid-column: span 9;
  display: grid;
  grid-template-columns: repeat(1, 12fr);
`;

const LabelContainer = styled.div`
  margin-top: 10px;
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
