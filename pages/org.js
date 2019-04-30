import React from 'react'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ButtonNew, ListVirtualized, ListRender } from '<components>'

class org extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  state = {
    isList: true,
    data: [{ id: 0, username: `username0` }, { id: 1, username: `username1` }],
  }

  render() {
    const { isList, data } = this.state

    return (
      <>
        <ListVirtualized rowRenderer={row => ListRender({ ...row, data, keyData: 'username' })} rowCount={data.length} rowHeight={50} />
        <ButtonNew hide={!isList} onClick={() => alert('test')} />
      </>
    )
  }
}

export default withAuth([admin])(org)
