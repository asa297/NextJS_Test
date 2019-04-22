import React from 'react'
import { withAuth } from '<components>'

class About extends React.PureComponent {
  render() {
    return (
      <>
        <div>5555</div>
      </>
    )
  }
}

About.getInitialProps = async ctx => {
  return {}
}

export default withAuth(About)
