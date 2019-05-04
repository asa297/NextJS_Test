import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { OrganizationSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar } from '<components>'

const orgTypeData = [{ id: 0, label: 'N/A' }, { id: 1, label: 'Russia' }, { id: 2, label: 'China' }]
const initialValues = {
  orgType: '',
  orgName: '',
  orgComA: 0,
  orgComB: 0,
  orgCode: '',
}
const generateFormData = Item => {
  const { orgTypeId, orgTypeName } = Item
  return {
    orgType: { id: orgTypeId, label: orgTypeName },
    ...Item,
  }
}

export default ({ Item, isEditingForm, Insert, Delete, Update, goBack, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  return (
    <>
      <Formik
        initialValues={isEditingForm ? generateFormData(Item) : initialValues}
        enableReinitialize={true}
        validationSchema={OrganizationSchema}
        onSubmit={async (values, actions) => {
          setisSubmiting(true)

          if (isEditingForm) await Update(values)
          else await Insert(values)

          setisSubmiting(false)
          goBack()
        }}
        render={props => (
          <form>
            <Field
              label="ประเภทบริษัท"
              name="orgType"
              component={SelectItem}
              data={orgTypeData}
              value={props.values.orgType ? props.values.orgType.label : ''}
              fieldread="label"
              onChange={e => props.setFieldValue('orgType', orgTypeData.find(v => v.label === e))}
            />

            <Field
              label="ชื่อบริษัท"
              type="text"
              name="orgName"
              component={InputItem}
              value={props.values.orgName}
              onChange={e => props.setFieldValue('orgName', e.target.value)}
            />
            <Field
              label="ค่าคอมมิชชั่นสินค้า A"
              type="number"
              name="orgComA"
              component={InputItem}
              value={props.values.orgComA}
              onChange={e => props.setFieldValue('orgComA', e.target.value)}
            />
            <Field
              label="ค่าคอมมิชชั่นสินค้า B"
              type="number"
              name="orgComB"
              component={InputItem}
              value={props.values.orgComB}
              onChange={e => props.setFieldValue('orgComB', e.target.value)}
            />
            <Field
              label="รหัสบริษัท"
              type="text"
              name="orgCode"
              component={InputItem}
              value={props.values.orgCode}
              onChange={e => props.setFieldValue('orgCode', e.target.value)}
            />

            <ActionBar
              isEditingForm={isEditingForm}
              onDelete={() => Delete(Item._id)}
              goBack={goBack}
              popupTitle={`Are you sure to delete this Oranization?`}
              onSubmit={props.handleSubmit}
              loading={isSubmiting}
            />
          </form>
        )}
      />
    </>
  )
}
