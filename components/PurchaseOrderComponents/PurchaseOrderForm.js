import { useState } from 'react'
import { Formik, Field } from 'formik'
import { PurchaseOrderSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, SearchBar, PurchaseOrderItemLists } from '<components>'
import { Collapse } from 'antd'

const Panel = Collapse.Panel

export default ({ Insert, FindItem, groups, sellers, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  const [listItems, setlistItems] = useState([])
  const [searchKey, setsearchKey] = useState('')

  const handleSearch = async (e, props) => {
    let item = await FindItem(e)
    const foundItem = listItems.findIndex(v => v.itemCode === e)
    if (!item) {
      alert('ไม่มีเว้ย')
      return
    }
    if (item.itemQty_Shop1 === 0) {
      alert('ไม่มีของเว้ย')
      return
    }
    if (foundItem > -1) {
      if (listItems[foundItem]._qty === item.itemQty_Shop1) {
        alert('จำนวนสินค้าของรายการขายนี้เท่ากับจำนวนสินค้าที่มีในคลังสินค้าแล้ว')
        return
      } else listItems[foundItem]._qty++
    } else {
      item._qty = 1
      setlistItems([...listItems, item])
    }
    setsearchKey('')

    calculatePO(props)
  }

  const handleListClick = (id, type, props) => {
    let _listItems = [...listItems]
    const foundItem = listItems.findIndex(v => v._id === id)
    if (type === 'PLUS' && listItems[foundItem]._qty + 1 > listItems[foundItem].itemQty_Shop1) {
      alert('Full')
      return
    }
    if (type === 'MINUS' && listItems[foundItem]._qty - 1 === 0) {
      _listItems.splice(foundItem, 1)
      setlistItems([..._listItems])
      return
    }

    if (type === 'PLUS') _listItems[foundItem]._qty++
    else _listItems[foundItem]._qty--

    setlistItems([..._listItems])
    calculatePO(props)
  }

  const handleQtyChange = (id, e, props) => {
    let _listItems = [...listItems]
    const foundItem = listItems.findIndex(v => v._id === id)

    if (e.target.value > listItems[foundItem].itemQty_Shop1) _listItems[foundItem]._qty = listItems[foundItem].itemQty_Shop1
    else if (e.target.value < 0) _listItems[foundItem]._qty = 0
    else _listItems[foundItem]._qty = e.target.value

    setlistItems([..._listItems])
    calculatePO(props)
  }

  const calculatePO = props => {
    console.log(props)
  }

  const calculateDiscount = (value, props) => {
    props.setFieldValue('discount', value)

    console.log(value)
  }
  const calculateCredit = (value, props) => {
    props.setFieldValue('credit', value)
    console.log(value)
  }
  const calculateCreditCharge = (value, props) => {
    props.setFieldValue('creditCharge', value)
    console.log(value)
  }

  const groupsData = () =>
    groups.map(v => {
      return {
        id: v._id,
        label: `${v.groupCode} (${v.guideName})`,
        ...v,
      }
    })

  const sellersData = () =>
    sellers.map(v => {
      return {
        id: v._id,
        label: `${v.sellerName} (${v.sellerCode})`,
        ...v,
      }
    })

  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validationSchema={PurchaseOrderSchema}
        onSubmit={async (values, actions) => {
          // setisSubmiting(true)
          // if (isEditingForm && values._id) await Update(values)
          // else if (!isEditingForm) await Insert(values)
          // else alert(`Server refuse your request.`)
          // setisSubmiting(false)
          // goBack()
        }}
        render={props => {
          return (
            <form>
              <Collapse defaultActiveKey={['1']}>
                <Panel header="ส่วนที่ 1 : รายละเอียดเบื้องต้น" key="1">
                  <Field
                    label="กรุ๊ป"
                    name="group"
                    component={SelectItem}
                    required
                    data={groupsData()}
                    value={props.values.group ? props.values.group.label : ''}
                    fieldread="label"
                    onChange={e => props.setFieldValue('group', groupsData().find(v => v.label === e))}
                  />

                  <Field
                    label="พนักงานขาย"
                    name="seller"
                    component={SelectItem}
                    required
                    data={sellersData()}
                    value={props.values.seller ? props.values.seller.label : ''}
                    fieldread="label"
                    onChange={e => props.setFieldValue('seller', sellersData().find(v => v.label === e))}
                  />
                </Panel>

                <Panel header="ส่วนที่ 2 : รายการสินค้า" key="2">
                  <SearchBar
                    placeholder="ค้นหาสินค้า"
                    value={searchKey}
                    onChange={e => setsearchKey(e.target.value)}
                    onSearch={e => handleSearch(e, props)}
                    enterButton={true}
                    size="large"
                  />

                  <PurchaseOrderItemLists
                    listItems={listItems}
                    onClick={(id, type) => handleListClick(id, type, props)}
                    onChange={(id, e) => handleQtyChange(id, e, props)}
                  />
                </Panel>

                <Panel header="ส่วนที่ 3 : รายละเอียดการชำระเงิน" key="3">
                  <Field
                    label="ส่วนลด"
                    type="text"
                    name="discount"
                    component={InputItem}
                    value={props.values.discount}
                    onChange={e => calculateDiscount(e.target.value, props)}
                  />
                  <Field
                    label="ชำระเป็นเครดิต"
                    type="text"
                    name="credit"
                    component={InputItem}
                    value={props.values.credit}
                    onChange={e => calculateCredit(e.target.value, props)}
                  />

                  {props.values.credit && (
                    <Field
                      label="ชาร์์จเครดิต"
                      type="text"
                      name="creditCharge"
                      component={InputItem}
                      value={props.values.creditCharge}
                      onChange={e => calculateCreditCharge(e.target.value, props)}
                    />
                  )}
                </Panel>

                <Panel header="ส่วนที่ 4 : สรุปราชการขาย" key="4">
                  <Field label="ยอดรวม" type="text" name="subTotal" component={InputItem} value={props.values.itemRemarks} disabled />

                  <Field label="ส่วนลด" type="text" name="grandTotalDiscount" component={InputItem} value={props.values.itemRemarks} disabled />

                  <Field
                    label="จำนวนชำระเครดิต"
                    type="text"
                    name="grandTotalCredit"
                    component={InputItem}
                    value={props.values.itemRemarks}
                    disabled
                  />

                  <Field
                    label="จำนวนชาร์จเครดิต"
                    type="text"
                    name="grandTotalCreditCharge"
                    component={InputItem}
                    value={props.values.itemRemarks}
                    disabled
                  />

                  <Field label="ยอดที่ต้องชำระ" type="text" name="grandTotal" component={InputItem} value={props.values.grandTotal} disabled />

                  <Field
                    label="ยอดรับเงิน"
                    type="text"
                    name="receiveCash"
                    component={InputItem}
                    required
                    value={props.values.receiveCash}
                    onChange={props.handleChange}
                  />

                  <Field label="ยอดเงินทอน" type="text" name="changeCash" component={InputItem} value={props.values.changeCash} disabled />
                </Panel>
              </Collapse>

              <ActionBar onSubmit={props.handleSubmit} loading={isSubmiting} />
            </form>
          )
        }}
      />
    </>
  )
}
