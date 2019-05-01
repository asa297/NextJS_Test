import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, ButtonNew, ListVirtualized, OrgListRender, OrgFormRender } from '<components>'
import { FetchOrganization } from '<actions>'
import { Router } from '<routes>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  state = {
    isList: true,
  }

  componentWillMount() {
    const { FetchOrganization } = this.props
    FetchOrganization()
  }

  openForom() {
    this.setState({ isList: false })
  }

  handleClick(rowSelected) {
    this.openForom()

    // console.log(rowSelected)
  }

  render() {
    const { isList } = this.state
    const {
      organizations: { isFetching, List: data, Object },
    } = this.props
    return (
      <>
        {isList && (
          <ListContainer>
            <ListVirtualized
              rowRenderer={rowRenderer => OrgListRender({ ...rowRenderer, data, onClick: rowSelected => this.handleClick(rowSelected) })}
              rowCount={data.length}
              rowHeight={50}
            />
          </ListContainer>
        )}

        {!isList && <div>test</div>}

        <ButtonNew hide={!isList} onClick={() => this.openForom()} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { FetchOrganization },
)(index)

export default withAuth([admin])(index)

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`
