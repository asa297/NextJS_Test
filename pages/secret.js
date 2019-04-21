import React from 'react'
import { withAuth } from '<components>'

class Screct extends React.PureComponent {
  render() {
    return (
      <>
        <div>This is Sccret Page</div>
      </>
    )
  }
}

export default withAuth(Screct)
