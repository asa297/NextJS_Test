import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, ButtonNew, ListVirtualized, OrgListRender } from '<components>'
import { default as Action } from '<actions>'
import Router from 'next/router'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    return { pageName: name }
  }

  componentWillMount() {
    const { FetchOrganization } = this.props
    FetchOrganization()
  }

  handleClick(rowSelected) {
    const { _id } = rowSelected
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
            rowHeight={50}
          />
        </ListContainer>

        <ButtonNew onClick={() => Router.push({ pathname: '/form/org', query: { id: 5 } })} />

        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { FetchOrganization: Action.FetchOrganization },
)(index)

export default withAuth([admin])(index)

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`
