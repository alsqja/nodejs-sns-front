import styled from "styled-components";
import { Layout } from "../../components/Layout";

export const Home = () => {
  return (
    <Layout>
      <AA>home</AA>
    </Layout>
  );
};

const AA = styled.div`
  grid-column: 8 / span 2;
`;
