import Layout from "../components/MyLayout.js";
import styled from "styled-components";

export default () => (
  <Layout>
    <Testna>This is the about page</Testna>
  </Layout>
);

const Testna = styled.div`
  margin-top: 50px;
  height: 1500px;
  color: red;
`;
