import React from 'react'
import { admin } from '<helpers>/role'
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

export default withAuth([admin])(About)
