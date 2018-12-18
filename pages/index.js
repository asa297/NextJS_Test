import React from "react";

import Layout from "components/MyLayout.js";
import Link from "next/link";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUser } from "../stores/actions";
import { Button, notification } from "antd";

// const PostLink = props => (
//   <li>
//     <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
//       {props.title}
//     </Link>
//   </li>
// );

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
        <Testna>test</Testna>
      </Layout>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { fetchUser }
)(test);

const Testna = styled.div`
  margin-top: 50px;
  height: 1500px;
  color: red;
`;
