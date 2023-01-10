import styled from "styled-components";
import theme from "../../styles/theme";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useLogout, useSession } from "../../hooks/session";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenSelector } from "../../stores/session";

export const Header = () => {
  const token = useRecoilValue(tokenSelector);
  const navigate = useNavigate();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSession();
  const [searchValue, setSearchValue] = useState("");

  const handleHomeLink = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleLoginLink = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleSignupLink = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsOpen(false);
    logout();
  }, [logout]);

  const handleUserPageLink = useCallback(() => {
    setIsOpen(false);
    navigate(`/mypage/${user?.id}`);
  }, [navigate, user]);

  const handleSearch = useCallback(() => {
    navigate(`/search/:${searchValue}`, { state: { query: searchValue } });
  }, [navigate, searchValue]);

  return (
    <>
      <Wrapper>
        <Container>
          <Logo onClick={handleHomeLink}>N.S</Logo>
          <SearchBox>
            <SearchInput onChange={(e) => setSearchValue(e.target.value)} />
            <SearchBtn>
              <FaSearch onClick={handleSearch} />
            </SearchBtn>
          </SearchBox>
          {!token && <LoginBtn onClick={handleLoginLink}>로그인</LoginBtn>}
          {!token && <LoginBtn onClick={handleSignupLink}>회원가입</LoginBtn>}
          {token && (
            <UserBtn onClick={() => setIsOpen(!isOpen)}>
              <FaUserCircle
                style={{ fontSize: "30px", color: `${theme.palette.primary}` }}
              />
            </UserBtn>
          )}

          {isOpen && (
            <UserModal>
              <div onClick={handleUserPageLink}>내정보</div>
              <div onClick={handleLogout}>로그아웃</div>
            </UserModal>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  background-color: ${theme.palette.white};
  box-shadow: ${theme.palette.shadow01};
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1200px;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  align-items: center;
`;

const Logo = styled.div`
  grid-column: 0 / span 3;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  color: ${theme.palette.primary};
`;

const SearchBox = styled.div`
  grid-column: 3 / span 8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  all: unset;
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.palette.borderGray};
  padding: 0 10px;

  :focus {
    border: 1px solid ${theme.palette.primary};
  }
`;

const SearchBtn = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid ${theme.palette.border};
  left: -40px;
  cursor: pointer;
`;

const LoginBtn = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.primary};
  color: white;
  height: 40px;
  border-radius: 20px;
  font-size: large;
  cursor: pointer;
  font-weight: bold;
`;

const UserBtn = styled.div`
  grid-column: 12 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 40px;
`;

const UserModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 11 / span 2;
  position: relative;
  top: -20px;
  /* right: calc(-100% + 1200px); */
  width: 140px;
  padding: 10px 0px;
  background-color: white;
  box-shadow: ${theme.palette.shadow01};
  border-top: 2px solid ${theme.palette.primary};
  div {
    cursor: pointer;
  }
`;
