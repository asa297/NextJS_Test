import React from 'react'
import { Auth } from '<services>'
import { Router } from '<routes>'
import { ModalLoading } from '<components>'

export default class Main extends React.PureComponent {
  async componentDidMount() {
    await Auth.handleAuthentication()
    Router.pushRoute('/')
  }

  render() {
    return <ModalLoading loading={true} text={'Loading...'} />
  }
}
