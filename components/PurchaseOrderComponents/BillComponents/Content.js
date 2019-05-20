import React from 'react'
import Item from './Item/Item'

export default class Content extends React.PureComponent {
  state = {
    itemList: [],
  }
  componentDidMount() {
    const {
      item: { listItems, credit, discount, discountPercent, creditCharge, creditChargePercent },
    } = this.props

    let _itemList = [...listItems]

    if (discountPercent > 0) {
      const model = {
        _id: 'discount_id',
        itemCode: null,
        itemName: `Discount (${discountPercent}%)`,
        _qty: 1,
        itemPrice: discount * -1,
      }

      _itemList.push({ ...model })
    }

    if (creditChargePercent > 0) {
      const model = {
        _id: 'creditcharge_id',
        itemCode: null,
        itemName: `${creditChargePercent}% charge from ${credit}฿ (amount of credit card pay)`,
        _qty: 1,
        itemPrice: creditCharge,
      }

      _itemList.push({ ...model })
    }

    this.setState({ listItems: [..._itemList] })
  }

  render() {
    const {
      item: { grandTotal, credit, creditCharge },
      copy,
    } = this.props

    const { listItems } = this.state
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '90%' }}>
          <Item itemList={listItems} copy={copy} grandtotal={grandTotal} credit={credit} creditcharge={creditCharge} />
        </div>
      </div>
    )
  }
}
