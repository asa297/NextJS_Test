import React from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { FetchUser } from "../stores/actions";
import Header from "../components/Header";
import Sider from "../components/Sider";

class Main extends React.PureComponent {
  componentWillMount() {
    this.props.FetchUser();
  }
  render() {
    return (
      <Container>
        <Header />
        {/* <Sider /> */}
      </Container>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { FetchUser }
)(Main);

const Container = styled.div`
  width: 100%;
`;
