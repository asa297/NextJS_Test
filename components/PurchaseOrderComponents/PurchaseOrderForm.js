import { useState } from 'react'
import { Formik, Field } from 'formik'
import { GroupSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, SearchBar, PurchaseOrderItemLists } from '<components>'
import { Collapse } from 'antd'
import styled from 'styled-components'

const Panel = Collapse.Panel

export default ({ Insert, FindItem, groups, sellers, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  const [listItems, setlistItems] = useState([])
  const [searchKey, setsearchKey] = useState('')

  const handleSearch = async e => {
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
  }

  const groupsData = () => {
    return groups.map(v => {
      return {
        id: v._id,
        label: `${v.groupCode} (${v.guideName})`,
        ...v,
      }
    })
  }

  const sellersData = () => {
    return sellers.map(v => {
      return {
        id: v._id,
        label: `${v.sellerName} (${v.sellerCode})`,
        ...v,
      }
    })
  }
  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validationSchema={GroupSchema}
        onSubmit={async (values, actions) => {
          // setisSubmiting(true)
          // if (isEditingForm && values._id) await Update(values)
          // else if (!isEditingForm) await Insert(values)
          // else alert(`Server refuse your request.`)
          // setisSubmiting(false)
          // goBack()
        }}
        render={props => (
          <form>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="ส่วนที่ 1 : รายละเอียดเบื้องต้น" key="1">
                <Field
                  label="กรุ๊ป"
                  name="org"
                  component={SelectItem}
                  required
                  data={groupsData()}
                  value={props.values.org ? props.values.org.label : ''}
                  fieldread="label"
                  onChange={e => props.setFieldValue('org', orgData.find(v => v.label === e))}
                />

                <Field
                  label="พนักงานขาย"
                  name="org"
                  component={SelectItem}
                  required
                  data={sellersData()}
                  value={props.values.org ? props.values.org.label : ''}
                  fieldread="label"
                  onChange={e => props.setFieldValue('org', orgData.find(v => v.label === e))}
                />
              </Panel>
            </Collapse>

            <ItemListContainer>
              <SearchBar
                placeholder="ค้นหาสินค้า"
                value={searchKey}
                onChange={e => setsearchKey(e.target.value)}
                onSearch={e => handleSearch(e, props)}
                enterButton={true}
                size="large"
              />

              <PurchaseOrderItemLists listItems={listItems} />
            </ItemListContainer>

            <Field
              label="รหัสกรุ๊ป"
              type="text"
              name="groupCode"
              component={InputItem}
              required
              value={props.values.groupCode}
              onChange={props.handleChange}
            />

            <Field
              label="หมายเลขสติกเกอร์"
              type="text"
              name="groupStickerNumber"
              component={InputItem}
              value={props.values.groupStickerNumber}
              onChange={props.handleChange}
            />
            <Field
              label="ชื่อไกด์"
              type="text"
              name="guideName"
              component={InputItem}
              required
              value={props.values.guideName}
              onChange={props.handleChange}
            />
            <Field
              label="หมายเหตุ"
              type="text"
              name="groupRemarks"
              component={InputItem}
              value={props.values.groupRemarks}
              onChange={props.handleChange}
            />

            <ActionBar onSubmit={props.handleSubmit} loading={isSubmiting} />
          </form>
        )}
      />
    </>
  )
}

const ItemListContainer = styled.div`
  background: white;

  margin: 10px 0;
`
