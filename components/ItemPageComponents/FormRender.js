import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import { ItemSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, InputUploadFile } from '<components>'
import { getBase64Image, convertObjectFormToFormData } from '<helpers>/utils'
import { message } from 'antd'

const itemTypeData = [{ id: 1, label: 'Type A' }, { id: 2, label: 'Type B' }]
const initialValues = {
  imageUrl: '',
  itemPrice: 0,
}
const generateFormData = Item => {
  const { itemTypeId, itemTypeName } = Item
  return {
    itemType: { id: itemTypeId, label: itemTypeName },
    ...Item,
  }
}

export default ({ Item, isEditingForm, Insert, Delete, Update, goBack, onConvertImage, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)

  const handleUploadImage = (file, props) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt1M = file.size / 1024 / 1024 < 1

    if (!isJPG) {
      message.error('JPG file Only!')
      return
    }
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!')
      return
    }

    onConvertImage(true)
    getBase64Image(file, base64Img => {
      props.setFieldValue('imageUrl', base64Img)
      props.setFieldValue('file', file)
      onConvertImage(false)
    })
  }

  return (
    <>
      <Formik
        initialValues={isEditingForm ? generateFormData(Item) : initialValues}
        enableReinitialize={true}
        validationSchema={ItemSchema}
        onSubmit={async (values, actions) => {
          setisSubmiting(true)
          let valueWrapper = { ...values }
          valueWrapper.imageUrl = ''
          valueWrapper.file = null

          let data = new FormData()
          data.append('file', values.file)
          data.append('bodyForm', JSON.stringify(valueWrapper))

          if (isEditingForm && valueWrapper._id) await Update(data)
          else if (!isEditingForm) await Insert(data)
          else alert(`Server refuse your request.`)
          setisSubmiting(false)
          goBack()
        }}
        render={props => (
          <form>
            <UploadWrapper>
              <Field name="imageUrl" component={InputUploadFile} value={props.values.imageUrl} beforeUpload={e => handleUploadImage(e, props)} />
            </UploadWrapper>
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

const UploadWrapper = styled.div`
  @media (max-width: 992px) {
    height: 250px;
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 350px;
  }
  margin: auto;
  width: 50%;
  height: 400px;
`
