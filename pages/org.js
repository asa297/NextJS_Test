import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, ButtonNew, ListVirtualized, ListRender } from '<components>'
import { GetOrganization } from '<actions>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  state = {
    isList: true,
  }

  componentWillMount() {
    const { GetOrganization } = this.props
    GetOrganization()
  }

  render() {
    const { isList } = this.state
    const {
      organizations: { isFetching, List: data },
    } = this.props
    return (
      <>
        <Container>
          <ListVirtualized rowRenderer={row => ListRender({ ...row, data })} rowCount={data.length} rowHeight={50} />
        </Container>

        <ButtonNew hide={!isList} onClick={() => alert('test')} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { GetOrganization },
)(index)

export default withAuth([admin])(index)

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`
