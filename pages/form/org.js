import React from 'react'
import { connect } from 'react-redux'

import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, OrgFormRender } from '<components>'
import { default as Action } from '<actions>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    const { query } = ctx

    console.log(query.id)
    return { pageName: name }
  }

  render() {
    const {
      organizations: { isFetching, Item },
    } = this.props

    return (
      <>
        <OrgFormRender Item={Item} />

        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { GetOrganization: Action.GetOrganization },
)(index)

export default withAuth([admin])(index)
