import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, ButtonNew, ListVirtualized, OrgListRender } from '<components>'
import Router from 'next/router'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  componentWillMount() {
    const { Fetch } = this.props
    Fetch()
  }

  handleClick(rowSelected) {
    const { _id } = rowSelected
    Router.push({ pathname: '/form/org', query: { _id } })
  }

  render() {
    const {
      organizations: { isFetching, List: data },
    } = this.props

    return (
      <>
        <ListContainer>
          <ListVirtualized
            rowRenderer={rowRenderer => OrgListRender({ ...rowRenderer, data, onClick: rowSelected => this.handleClick(rowSelected) })}
            rowCount={data.length}
            rowHeight={70}
          />
        </ListContainer>
        <ButtonNew onClick={() => Router.push({ pathname: '/form/org' })} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { Fetch: Action.FetchOrganization },
)(index)

export default withAuth([admin])(index)

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`
