import React from 'react'

class Main extends React.PureComponent {
  render() {
    return (
      <>
        <div>test</div>
      </>
    )
  }
}

Main.getInitialProps = async ctx => {
  return {}
}

export default Main
