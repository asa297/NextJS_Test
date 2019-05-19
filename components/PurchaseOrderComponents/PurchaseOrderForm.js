import React from 'react'
import { Field, withFormik } from 'formik'
import { PurchaseOrderValidation } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, SearchBar, PurchaseOrderItemLists } from '<components>'
import { Collapse, message } from 'antd'
import sumBy from 'lodash/sumBy'

const Panel = Collapse.Panel

class index extends React.PureComponent {
  state = {
    isSubmiting: false,
    searchKey: '',
    listItems: [],
  }

  componentWillUpdate(nextProps, nextStates) {
    const { setFieldValue, values } = nextProps
    const { listItems } = nextStates

    if (listItems.length > 0) {
      const subTotal = sumBy(listItems, item => item._qty * item.itemPrice)
      setFieldValue('subTotal', subTotal)

      const grandTotalDiscount = subTotal * ((values.discount || 0) / 100)

      setFieldValue('grandTotalDiscount', grandTotalDiscount)

      setFieldValue('grandTotalCredit', values.credit || 0)

      const grandTotalCreditCharge = (values.credit || 0) * ((values.creditCharge || 0) / 100)
      setFieldValue('grandTotalCreditCharge', grandTotalCreditCharge)

      const grandTotal = subTotal - (grandTotalDiscount || 0) - (values.credit || 0)
      setFieldValue('grandTotal', grandTotal)

      if (values.receiveCash) {
        const changeCash = values.receiveCash - grandTotal
        setFieldValue('changeCash', changeCash)
      }
    }
  }

  groupsData() {
    const { groups } = this.props
    return groups.map(v => {
      return {
        id: v._id,
        label: `${v.groupCode} (${v.guideName})`,
        ...v,
      }
    })
  }

  sellersData() {
    const { sellers } = this.props
    return sellers.map(v => {
      return {
        id: v._id,
        label: `${v.sellerName} (${v.sellerCode})`,
        ...v,
      }
    })
  }

  handleListClick(id, type) {
    const { listItems } = this.state
    const { socket } = this.props
    let _listItems = [...listItems]
    const foundItem = listItems.findIndex(v => v._id === id)
    if (type === 'PLUS' && listItems[foundItem]._qty + 1 > listItems[foundItem].itemQty_Shop1) {
      message.error('This item quantity is maximum of inventory quantity.')
      return
    }
    if (type === 'MINUS' && listItems[foundItem]._qty - 1 === 0) {
      _listItems.splice(foundItem, 1)

      socket.emit('showitem', { data: listItems[foundItem], status: 2 })
      this.setState({ listItems: [..._listItems] })
      return
    }

    if (type === 'PLUS') {
      _listItems[foundItem]._qty++
      socket.emit('showitem', { data: _listItems[foundItem], status: 1 })
    } else {
      _listItems[foundItem]._qty--
      socket.emit('showitem', { data: _listItems[foundItem], status: 2 })
    }

    this.setState({ listItems: [..._listItems] })
  }

  async handleSearch(e) {
    const { listItems } = this.state
    const { FindItem, socket } = this.props

    let _listItems = [...listItems]
    let item = await FindItem(e)
    const foundItem = listItems.findIndex(v => v.itemCode === e)
    if (!item) {
      message.error('Not Found item.')
      return
    }
    if (item.itemQty_Shop1 === 0) {
      message.error('Item quantity is out of stock.')
      return
    }
    if (foundItem > -1) {
      if (_listItems[foundItem]._qty === item.itemQty_Shop1) {
        message.error('This item quantity is maximum of inventory quantity.')
        return
      } else {
        _listItems[foundItem]._qty++

        socket.emit('showitem', { data: _listItems[foundItem], status: 1 })
      }
    } else {
      item._qty = 1
      _listItems.push(item)

      socket.emit('showitem', { data: item, status: 1 })
    }

    this.setState({ listItems: [..._listItems], searchKey: '' })
  }

  // handleQtyChange(id, e) {
  //   const { listItems } = this.state
  //   const { socket } = this.props
  //   let _listItems = [...listItems]
  //   const foundItem = listItems.findIndex(v => v._id === id)

  //   if (e.target.value > listItems[foundItem].itemQty_Shop1) _listItems[foundItem]._qty = listItems[foundItem].itemQty_Shop1
  //   else if (e.target.value < 0) _listItems[foundItem]._qty = 0
  //   else _listItems[foundItem]._qty = e.target.value

  //   this.setState({ listItems: [..._listItems] })
  // }

  customHandleSubmit() {
    const { validateForm, isValid, Insert } = this.props

    validateForm().then(async () => {
      if (!isValid) return

      this.setState({ isSubmiting: true })
      let { values } = this.props
      const { listItems } = this.state
      values.listItems = [...listItems]

      await Insert(values)

      this.setState({ isSubmiting: false })
    })
  }

  render() {
    const { values, setFieldValue, handleChange } = this.props
    const { isSubmiting, searchKey, listItems } = this.state

    return (
      <form>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="ส่วนที่ 1 : รายละเอียดเบื้องต้น" key="1">
            <Field
              label="กรุ๊ป"
              name="group"
              component={SelectItem}
              required
              data={this.groupsData()}
              value={values.group ? values.group.label : ''}
              fieldread="label"
              onChange={e => setFieldValue('group', this.groupsData().find(v => v.label === e))}
            />

            <Field
              label="พนักงานขาย"
              name="seller"
              component={SelectItem}
              required
              data={this.sellersData()}
              value={values.seller ? values.seller.label : ''}
              fieldread="label"
              onChange={e => setFieldValue('seller', this.sellersData().find(v => v.label === e))}
            />
          </Panel>

          <Panel header="ส่วนที่ 2 : รายการสินค้า" key="2">
            <SearchBar
              placeholder="ค้นหาสินค้า"
              value={searchKey}
              onChange={e => this.setState({ searchKey: e.target.value })}
              onSearch={e => this.handleSearch(e)}
              enterButton={true}
              size="large"
            />

            <PurchaseOrderItemLists listItems={listItems} onClick={(id, type) => this.handleListClick(id, type)} />
          </Panel>

          <Panel header="ส่วนที่ 3 : รายละเอียดการชำระเงิน" key="3">
            <Field label="ส่วนลด" type="number" name="discount" component={InputItem} value={values.discount} onChange={handleChange} />
            <Field label="ชำระเป็นเครดิต" type="number" name="credit" component={InputItem} value={values.credit} onChange={handleChange} />

            {values.credit && (
              <Field
                label="ชาร์์จเครดิต"
                type="number"
                name="creditCharge"
                component={InputItem}
                value={values.creditCharge}
                onChange={handleChange}
              />
            )}
          </Panel>

          <Panel header="ส่วนที่ 4 : สรุปราชการขาย" key="4">
            <Field label="ยอดรวม" type="number" name="subTotal" component={InputItem} value={values.subTotal} disabled />

            <Field label="ส่วนลด" type="number" name="grandTotalDiscount" component={InputItem} value={values.grandTotalDiscount} disabled />

            {values.credit && (
              <Field label="จำนวนชำระเครดิต" type="number" name="grandTotalCredit" component={InputItem} value={values.grandTotalCredit} disabled />
            )}

            {values.credit && (
              <Field
                label="จำนวนชาร์จเครดิต"
                type="number"
                name="grandTotalCreditCharge"
                component={InputItem}
                value={values.grandTotalCreditCharge}
                disabled
              />
            )}

            <Field label="ยอดที่ต้องชำระ" type="number" name="grandTotal" component={InputItem} value={values.grandTotal} disabled />

            <Field
              label="ยอดรับเงิน"
              type="number"
              name="receiveCash"
              component={InputItem}
              required
              value={values.receiveCash}
              onChange={handleChange}
            />

            <Field label="ยอดเงินทอน" type="text" name="changeCash" component={InputItem} value={values.changeCash} disabled />
          </Panel>
        </Collapse>

        <ActionBar onSubmit={() => this.customHandleSubmit()} loading={isSubmiting} />
      </form>
    )
  }
}

export default withFormik({
  mapPropsToValues: () => ({ creditCharge: 0, grandTotalCreditCharge: 0 }),
  validate: PurchaseOrderValidation,
  displayName: 'PurchaseOrder_Form',
})(index)
