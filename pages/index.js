import React from 'react'
import { getPageNameFromReq } from '<helpers>/utils'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    return { pageName: name }
  }

  render() {
    return (
      <>
        <div>test</div>
      </>
    )
  }
}

export default index
