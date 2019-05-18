import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, PurchaseOrderForm, PurchaseOrderBill } from '<components>'
import Router from 'next/router'
import isEmpty from 'lodash/isEmpty'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  componentWillMount() {
    const { FetchGroups, FetchSellers, Reset } = this.props
    Reset()
    FetchGroups()
    FetchSellers()
  }

  render() {
    const {
      poes: { isGroupsFetching, isSellersFetching, isItemFetching, sellers, groups, item },
      FindItem,
      Insert,
      Reset,
    } = this.props

    return (
      <>
        {isEmpty(item) && (
          <FormContainer>
            <PurchaseOrderForm FindItem={FindItem} sellers={sellers} groups={groups} Insert={Insert} />
          </FormContainer>
        )}

        {!isEmpty(item) && <PurchaseOrderBill item={item} Reset={Reset} />}
        <ModalLoading loading={isGroupsFetching || isSellersFetching || isItemFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ poes }) => ({ poes }),
  {
    FindItem: Action.FindItemForPO,
    FetchGroups: Action.FetchGroupsForPO,
    FetchSellers: Action.FetchSellersForPO,
    Insert: Action.InsertPurchaseOrder,
    Reset: Action.ResetPurchaseOrderStore,
  },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`
