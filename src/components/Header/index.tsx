import styled from "styled-components";
import theme from "../../styles/theme";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useSession } from "../../hooks/session";
import { useEffect } from "react";

export const Header = () => {
  const { user } = useSession();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Wrapper>
      <Container>
        <Logo>N.S</Logo>
        <SearchBox>
          <SearchInput />
          <SearchBtn>
            <FaSearch />
          </SearchBtn>
        </SearchBox>
        {!user?.id && <LoginBtn>로그인</LoginBtn>}
        {!user?.id && <LoginBtn>회원가입</LoginBtn>}
        {user?.id && (
          <UserBtn>
            <FaUserCircle
              style={{ fontSize: "30px", color: `${theme.palette.primary}` }}
            />
          </UserBtn>
        )}
      </Container>
    </Wrapper>
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
