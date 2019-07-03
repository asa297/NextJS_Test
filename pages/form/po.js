import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuthFirebase, ModalLoading, PurchaseOrderForm, PurchaseOrderBill } from '<components>'
import isEmpty from 'lodash/isEmpty'
import { Button } from 'antd'
import Link from 'next/link'

import io from 'socket.io-client'

class index extends React.PureComponent {
  state = {
    socket: undefined,
  }

  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    const host = process.env.HOST_URL

    return { pageName: name, host }
  }

  componentWillMount() {
    const { FetchGroups, FetchSellers, Reset } = this.props

    Reset()
    FetchGroups()
    FetchSellers()
  }

  componentDidMount() {
    const { host, auth } = this.props

    const socket = io(host, {
      transports: ['websocket'],
      query: {
        userSocket: auth.user.name,
      },
    })

    socket.emit('joinroom')
    socket.emit('openpo')

    this.setState({ socket })
  }

  componentWillUnmount() {
    const { socket } = this.state
    socket.disconnect()
  }
  render() {
    const {
      poes: { isGroupsFetching, isSellersFetching, isItemFetching, sellers, groups, item },
      FindItem,
      Insert,
      Reset,
    } = this.props

    const { socket } = this.state

    return (
      <>
        {isEmpty(item) && (
          <FormContainer>
            <CustomerScreenContainer>
              <Link href="/display/customer">
                <a target="_blank">Purchase Display </a>
              </Link>
            </CustomerScreenContainer>

            <PurchaseOrderForm FindItem={FindItem} sellers={sellers} groups={groups} Insert={Insert} socket={socket} />
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

export default withAuthFirebase([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`

const CustomerScreenContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
`
