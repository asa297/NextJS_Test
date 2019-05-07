import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { ItemSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, InputUploadFile } from '<components>'

const itemTypeData = [{ id: 1, label: 'Type A' }, { id: 2, label: 'Type B' }]
const initialValues = {
  itemType: '',
  orgName: '',
  orgComA: 0,
  orgComB: 0,
  orgCode: '',
}
const generateFormData = Item => {
  const { itemTypeId, itemTypeName } = Item
  return {
    itemType: { id: itemTypeId, label: itemTypeName },
    ...Item,
  }
}
const handleUploadImage = props => {
  console.log(props)
}

export default ({ Item, isEditingForm, Insert, Delete, Update, goBack, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  return (
    <>
      <Formik
        initialValues={isEditingForm ? generateFormData(Item) : initialValues}
        enableReinitialize={true}
        validationSchema={ItemSchema}
        onSubmit={async (values, actions) => {
          setisSubmiting(true)

          if (isEditingForm && values._id) await Update(values)
          else if (!isEditingForm) await Insert(values)
          else alert(`Server refuse your request.`)

          setisSubmiting(false)
          goBack()
        }}
        render={props => (
          <form>
            <Field name="imageBase64" component={InputUploadFile} value={props.values.imageBase64} onChange={e => console.log(e)} />

            <Field
              label="ประเภทสินค้า"
              name="itemType"
              component={SelectItem}
              required
              data={itemTypeData}
              value={props.values.itemType ? props.values.itemType.label : ''}
              fieldread="label"
              onChange={e => props.setFieldValue('itemType', itemTypeData.find(v => v.label === e))}
            />

            <Field
              label="บาร์โค้ดสินค้า"
              type="text"
              name="itemCode"
              component={InputItem}
              required
              value={props.values.itemCode}
              onChange={props.handleChange}
            />
            <Field
              label="ชื่อสินค้า"
              type="text"
              name="itemName"
              component={InputItem}
              required
              value={props.values.itemName}
              onChange={props.handleChange}
            />
            <Field
              label="โรงงาน"
              type="text"
              name="itemFactory"
              component={InputItem}
              value={props.values.itemFactory}
              onChange={props.handleChange}
            />
            <Field label="สี/ลาย" type="text" name="itemColor" component={InputItem} value={props.values.itemColor} onChange={props.handleChange} />
            <Field label="ประเภทหนัง" type="text" name="itemSkin" component={InputItem} value={props.values.itemSkin} onChange={props.handleChange} />
            <Field
              label="ราคาต่อหน่วย"
              type="number"
              name="itemPrice"
              component={InputItem}
              required
              value={props.values.itemPrice}
              onChange={props.handleChange}
            />
            <Field
              label="หมายเหตุ"
              type="text"
              name="itemRemarks"
              component={InputItem}
              value={props.values.itemRemarks}
              onChange={props.handleChange}
            />

            <ActionBar
              isEditingForm={isEditingForm}
              onDelete={() => Delete(Item._id)}
              goBack={goBack}
              popupTitle={`ยืนยันการลบรายการสินค้านี้?`}
              onSubmit={props.handleSubmit}
              loading={isSubmiting}
            />
          </form>
        )}
      />
    </>
  )
}
