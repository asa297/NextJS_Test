import React from 'react'
import { Auth } from '<services>'
import Router from 'next/router'
// import { ModalLoading } from '<components>'

export default class Main extends React.PureComponent {
  async componentDidMount() {
    await Auth.handleAuthentication()
    Router.push({ pathname: '/' })
  }

  render() {
    // return <ModalLoading loading={true} text={'Loading...'} />
    return <>test</>
  }
}
