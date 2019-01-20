import React, { Component } from "react";

import styled from "styled-components";
import { Icon, Modal, Button } from "antd";
import LoginModal from "./Modal/Login";

class Header extends Component {
  state = {
    loading: false,
    visible: false,
    namePage: "Login"
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <>
        <HeaderContainer>
          <Icon type="bars" />

          <RightHeaderContainer>
            <LoginContainer>
              <Icon type="login" />
              <div
                style={{ paddingLeft: "5px" }}
                onClick={() => this.showModal()}
              >
                Login
              </div>
            </LoginContainer>
          </RightHeaderContainer>
        </HeaderContainer>
        <Modal
          visible={visible}
          title={this.state.namePage}
          centered={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <LoginModal
            visible={visible}
            changeComponent={namePage => this.setState({ namePage })}
          />
        </Modal>
      </>
    );
  }
}

export default Header;

const HeaderContainer = styled.div`
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #91d5ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 3;
`;

const RightHeaderContainer = styled.div`
  display: none;
  @media (min-width: 1600px) {
    display: flex;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;
