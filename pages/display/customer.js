import React from 'react'
import { CustomerDisplayConponents } from '<components>'

import io from 'socket.io-client'

export default class index extends React.PureComponent {
  state = {
    socket: undefined,
    items: [],
    showPrice: '',
    showChange: 0,
    status: -1,
    grandTotal: 0,
    subTotal: 0,
    discount: 0,
    credit: 0,
    creditCharge: 0,
  }
  static async getInitialProps(ctx) {
    const host = process.env.HOST_URL

    return { host, noHeader: true }
  }

  componentDidMount() {
    const { host, auth } = this.props

    const socket = io(host, {
      transports: ['websocket'],
      query: {
        userSocket: auth.user.name,
      },
    })

    this.setState({ socket })

    socket.emit('joinroom')

    socket.on('openpo', () => {
      this.setState({
        items: [],
        showPrice: '',
        showChange: 0,
        status: -1,
        grandTotal: 0,
        subTotal: 0,
        discount: 0,
        credit: 0,
        creditCharge: 0,
      })
    })

    socket.on('closepo', () => {
      this.setState({
        items: [],
        showPrice: '',
        showChange: 0,
        status: -1,
        grandTotal: 0,
        subTotal: 0,
        discount: 0,
        credit: 0,
        creditCharge: 0,
      })
    })

    socket.on('sendItem', ({ data, status }) => {
      const { itemCode, itemName, itemPrice } = data
      let { items } = this.state
      items.unshift({
        item: `${itemCode} - ${itemName}`,
        itemPrice: `${status === 2 ? '-' : ''}${itemPrice}`,
      })

      this.setState({
        items,
        showPrice: `${status === 2 ? '-' : ''}${itemPrice}`,
        subTotal: status === 1 ? this.state.subTotal + 1 * itemPrice : this.state.subTotal + -1 * itemPrice,
        status,
      })

      this.recalculate()
    })

    socket.on('dc', data => {
      let { items, subTotal } = this.state

      items.unshift({
        item: `Discount Total`,
        itemPrice: `-${subTotal * (data / 100)}`,
      })

      // const showitem = `Your Discount`;
      const showPrice = `-${subTotal * (data / 100)}`
      const status = 2

      this.setState({ items, showPrice, discount: data, status })
      this.recalculate()
    })
    socket.on('credit', data => {
      let { items } = this.state

      items.unshift({
        item: `Credit Total`,
        itemPrice: `-${data}`,
      })

      // const showitem = `Your Credit`;
      const showPrice = `-${data}`
      const status = 2

      this.setState({ items, showPrice, credit: data, status })
      this.recalculate()
    })
    socket.on('creditcharge', data => {
      let { items, credit } = this.state

      items.unshift({
        item: `Credit Charge Total`,
        itemPrice: `${credit * (data / 100)}`,
      })

      // const showitem = `Your Credit Charge`;
      const showPrice = `${credit * (data / 100)}`
      const status = 1

      this.setState({ items, showPrice, creditCharge: data, status })

      this.recalculate()
    })

    socket.on('submitpo', data => {
      const showChange = `${data.receiveCash - data.grandTotal}`
      const status = 1

      this.setState({
        items: [],
        showPrice: data.receiveCash,
        showChange,
        status,
        grandTotal: data.grandTotal,
        subTotal: 0,
        discount: 0,
        credit: 0,
        creditCharge: 0,
      })
    })
  }

  componentWillUnmount() {
    const { socket } = this.state

    socket.disconnect()
  }

  recalculate() {
    const { subTotal, discount, credit } = this.state
    const resultDiscount = subTotal * (discount / 100)
    const grandTotal = subTotal - resultDiscount - credit

    this.setState({ grandTotal })
  }

  render() {
    return <CustomerDisplayConponents {...this.state} />
  }
}
