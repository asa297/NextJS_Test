import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import styled from "styled-components";

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      {props.title}
    </Link>
  </li>
);

class test extends React.PureComponent {
  static async getInitialProps() {
    console.log(process.env.TESTENV);
    return { TESTENV: process.env.TESTENV };
  }

  render() {
    return (
      <Layout>
        <h1>My Blog {this.props.TESTENV}</h1>
        <ul>
          <PostLink id="hello-nextjs" title="Hello Next.js" />
          <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
          <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
        </ul>
        <Testna>aaaa</Testna>
      </Layout>
    );
  }
}
export default test;

const Testna = styled.div`
  color: red;
`;
