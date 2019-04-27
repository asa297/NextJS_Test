import React from 'react'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ButtonNew } from '<components>'

class org extends React.PureComponent {
  state = {
    isList: true,
  }
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  render() {
    const { isList } = this.state
    const {} = this.props
    return (
      <>
        <ButtonNew hide={!isList} onClick={() => alert('test')} />
      </>
    )
  }
}

export default withAuth([admin])(org)
