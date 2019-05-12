import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, PurchaseOrderForm } from '<components>'
import Router from 'next/router'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  componentWillMount() {
    const { FetchGroups, FetchSellers } = this.props
    FetchGroups()
    FetchSellers()
  }

  render() {
    const {
      poes: { isGroupsFetching, isSellersFetching, isItemFetching, sellers, groups },
      FindItem,
    } = this.props

    return (
      <>
        <FormContainer>
          <PurchaseOrderForm FindItem={FindItem} sellers={sellers} groups={groups} />
        </FormContainer>

        <ModalLoading loading={isGroupsFetching || isSellersFetching || isItemFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ poes }) => ({ poes }),
  { FindItem: Action.FetchItemForPO, FetchGroups: Action.FetchGroupsForPO, FetchSellers: Action.FetchSellersForPO },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 50px 5%;
  }
  padding: 3% 5% 50px 5%;
`
