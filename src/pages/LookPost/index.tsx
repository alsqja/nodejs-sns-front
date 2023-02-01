import styled from "styled-components";
import theme from "../../styles/theme";
import { Layout } from "../../components/Layout";

export const LookPost = () =>{
  return(
    <Layout>
      <Wrapper>

      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  grid-column: 3 / span 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${theme.palette.shadow01};
  min-height: 300px;
  border-radius: 50px;
`;