import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuthFirebase, ModalLoading, ButtonNew, ListVirtualized, SellerListRender, SearchBar } from '<components>'
import Router from 'next/router'

class index extends React.PureComponent {
  state = {
    data: [],
  }
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  componentWillMount() {
    const { Fetch } = this.props
    Fetch()
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      sellers: { isFetching, List: data },
    } = prevProps
    if (data && isFetching) {
      this.setState({ data })
    }
  }

  handleClick(rowSelected) {
    const { _id } = rowSelected
    Router.push({ pathname: '/form/seller', query: { _id } })
  }

  handleSearch({ target: { value } }) {
    const {
      sellers: { List },
    } = this.props

    const result = List.filter(v => v.sellerName.includes(value) || v.sellerCode.includes(value))
    this.setState({ data: result })
  }

  render() {
    const {
      sellers: { isFetching },
    } = this.props
    const { data } = this.state

    return (
      <>
        <SearchContainer>
          <SearchWrapper>
            <SearchBar placeholder="ค้นหารายการพนักงานขาย" onChange={e => this.handleSearch(e)} />
          </SearchWrapper>
        </SearchContainer>
        <ListContainer>
          <ListVirtualized
            rowRenderer={rowRenderer => SellerListRender({ ...rowRenderer, data, onClick: rowSelected => this.handleClick(rowSelected) })}
            rowCount={data.length}
            rowHeight={70}
          />
        </ListContainer>
        <ButtonNew onClick={() => Router.push({ pathname: '/form/seller' })} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ sellers }) => ({ sellers }),
  { Fetch: Action.FetchSeller },
)(index)

export default withAuthFirebase([admin])(index)

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;

  width: 100%;
`

const SearchWrapper = styled.div`
  @media (min-width: 0px) and (max-width: 1366px) {
    width: 100%;
  }
  width: 65%;
`
