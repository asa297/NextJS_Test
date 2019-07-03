import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuthFirebase, ModalLoading, ButtonNew, ListVirtualized, GroupListRender, SearchBar } from '<components>'
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
      groups: { isFetching, List: data },
    } = prevProps
    if (data && isFetching) {
      this.setState({ data })
    }
  }

  handleClick(rowSelected) {
    const { _id } = rowSelected
    Router.push({ pathname: '/form/group', query: { _id } })
  }

  handleSearch({ target: { value } }) {
    const {
      groups: { List },
    } = this.props

    const result = List.filter(v => v.groupCode.includes(value) || v.orgName.includes(value))
    this.setState({ data: result })
  }

  render() {
    const {
      groups: { isFetching },
    } = this.props
    const { data } = this.state

    return (
      <>
        <SearchContainer>
          <SearchWrapper>
            <SearchBar placeholder="ค้นหารายการกรุ๊ป" onChange={e => this.handleSearch(e)} />
          </SearchWrapper>
        </SearchContainer>
        <ListContainer>
          <ListVirtualized
            rowRenderer={rowRenderer => GroupListRender({ ...rowRenderer, data, onClick: rowSelected => this.handleClick(rowSelected) })}
            rowCount={data.length}
            rowHeight={70}
          />
        </ListContainer>
        <ButtonNew onClick={() => Router.push({ pathname: '/form/group' })} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ groups }) => ({ groups }),
  { Fetch: Action.FetchGroup },
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
