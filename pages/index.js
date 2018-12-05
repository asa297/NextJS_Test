import React from "react";

import Layout from "../components/MyLayout.js";
import Link from "next/link";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUser } from "../stores/actions";
import { Button } from "antd";

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      {props.title}
    </Link>
  </li>
);

class test extends React.PureComponent {
  static async getInitialProps() {
    return { TESTENV: process.env.TESTENV };
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Layout>
        <Button type="primary">Primary</Button>
      </Layout>
    );
  }
}
export default connect(
  null,
  { fetchUser }
)(test);

const Testna = styled.div`
  color: red;
`;
