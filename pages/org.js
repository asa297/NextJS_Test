import React from 'react'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth } from '<components>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    return { pageName: name }
  }

  render() {
    return (
      <>
        <div>Org </div>
      </>
    )
  }
}

export default withAuth([admin])(index)
