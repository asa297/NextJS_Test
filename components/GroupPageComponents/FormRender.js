import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { GroupSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar } from '<components>'

const initialValues = {
  org: '',
  groupCode: '',
  groupStickerNumber: '',
  guideName: '',
  groupRemarks: '',
}
const generateFormData = Item => {
  const { orgId, orgName, orgCode } = Item
  return {
    org: { _id: orgId, label: `${orgName} (${orgCode})` },
    ...Item,
  }
}
const generateOrgSelectData = data => {
  return data.map(v => ({
    id: v._id,
    label: `${v.orgName} (${v.orgCode})`,
    ...v,
  }))
}

export default ({ Item, isEditingForm, Insert, Delete, Update, goBack, orgList, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  const orgData = generateOrgSelectData(orgList)
  return (
    <>
      <Formik
        initialValues={isEditingForm ? generateFormData(Item) : initialValues}
        enableReinitialize={true}
        validationSchema={GroupSchema}
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
              label="บริษัท"
              name="org"
              component={SelectItem}
              required
              data={orgData}
              value={props.values.org ? props.values.org.label : ''}
              fieldread="label"
              onChange={e => props.setFieldValue('org', orgData.find(v => v.label === e))}
            />

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
            <Field label="ชื่อไกด์" type="text" name="guideName" component={InputItem} required value={props.values.guideName} onChange={props.handleChange} />
            <Field
              label="หมายเหตุ"
              type="text"
              name="groupRemarks"
              component={InputItem}
              value={props.values.groupRemarks}
              onChange={props.handleChange}
            />

            <ActionBar
              isEditingForm={isEditingForm}
              onDelete={() => Delete(Item._id)}
              goBack={goBack}
              popupTitle={`ยืนยันการลบรายการกรุ๊ปนี้?`}
              onSubmit={props.handleSubmit}
              loading={isSubmiting}
            />
          </form>
        )}
      />
    </>
  )
}
