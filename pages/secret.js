import React from 'react'
import { withAuth } from '<components>'

class Screct extends React.PureComponent {
  static async getInitialProps(args) {
    return {}
  }

  render() {
    return (
      <>
        <div>This is Sccret Page</div>
      </>
    )
  }
}

export default withAuth(Screct)
