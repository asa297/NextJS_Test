import React from 'react'
import { Auth } from '<services>'
import { Router } from '<routes>'

class Main extends React.PureComponent {
  async componentDidMount() {
    await Auth.handleAuthentication()

    Router.pushRoute('/')
  }

  render() {
    return (
      <>
        <div>Loading</div>
      </>
    )
  }
}

Main.getInitialProps = async ctx => {
  return {}
}

export default Main
