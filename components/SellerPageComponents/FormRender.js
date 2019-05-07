import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { SellerSchema } from '<helpers>/validate'
import { InputItem, ActionBar } from '<components>'

const initialValues = {
  sellerName: '',
  sellerCode: '',
  sellerCom: 0,
  sellerRemarks: '',
}

export default ({ Item, isEditingForm, Insert, Delete, Update, goBack, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  return (
    <>
      <Formik
        initialValues={isEditingForm ? Item : initialValues}
        enableReinitialize={true}
        validationSchema={SellerSchema}
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
            <Field
              label="ชื่อพนักงานขาย"
              type="text"
              name="sellerName"
              component={InputItem}
              required
              value={props.values.sellerName}
              fieldread="label"
              onChange={props.handleChange}
            />
            <Field
              label="รหัสพนักงานขาย"
              type="text"
              name="sellerCode"
              component={InputItem}
              required
              value={props.values.sellerCode}
              onChange={props.handleChange}
            />
            <Field
              label="ค่านํ้าพนักงานขาย"
              type="number"
              name="sellerCom"
              component={InputItem}
              required
              value={props.values.sellerCom}
              onChange={props.handleChange}
            />
            <Field
              label="หมายเหตุ"
              type="number"
              name="sellerRemarks"
              component={InputItem}
              value={props.values.sellerRemarks}
              onChange={props.handleChange}
            />

            <ActionBar
              isEditingForm={isEditingForm}
              onDelete={() => Delete(Item._id)}
              goBack={goBack}
              popupTitle={`ยืนยันการลบรายการพนักงานขายนี้?`}
              onSubmit={props.handleSubmit}
              loading={isSubmiting}
            />
          </form>
        )}
      />
    </>
  )
}
