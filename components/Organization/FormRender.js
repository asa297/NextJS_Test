import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { OrganizationSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, ModalLoading } from '<components>'
import Router from 'next/router'

const orgTypeData = [{ id: 0, label: 'Russia' }, { id: 1, label: 'China' }]
export default ({ Item, insert, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  return (
    <>
      <Formik
        initialValues={{
          org_type: '',
          org_name: '',
          org_comA: 0,
          org_comB: 0,
          org_code: '',
        }}
        enableReinitialize={true}
        validationSchema={OrganizationSchema}
        onSubmit={async (values, actions) => {
          setisSubmiting(true)
          console.log(values)
        }}
        render={props => (
          <form>
            <Field
              label="ประเภทบริษัท"
              name="org_type"
              component={SelectItem}
              data={orgTypeData}
              value={props.values.org_type ? props.values.org_type.label : ''}
              fieldread="label"
              onChange={e => props.setFieldValue('org_type', orgTypeData.find(v => v.label === e.target.value))}
            />

            <Field
              label="ชื่อบริษัท"
              type="text"
              name="org_name"
              component={InputItem}
              value={props.values.org_name}
              onChange={e => props.setFieldValue('org_name', e.target.value)}
            />
            <Field
              label="ค่าคอมมิชชั่นสินค้า A"
              type="number"
              name="org_comA"
              component={InputItem}
              value={props.values.org_comA}
              onChange={e => props.setFieldValue('org_comA', e.target.value)}
            />
            <Field
              label="ค่าคอมมิชชั่นสินค้า B"
              type="number"
              name="org_comB"
              component={InputItem}
              value={props.values.org_comB}
              onChange={e => props.setFieldValue('org_comB', e.target.value)}
            />
            <Field
              label="รหัสบริษัท"
              type="text"
              name="org_code"
              component={InputItem}
              value={props.values.org_code}
              onChange={e => props.setFieldValue('org_code', e.target.value)}
            />

            <ActionBar onBack={() => Router.push({ pathname: '/org' })} onSubmit={props.handleSubmit} loading={isSubmiting} />
          </form>
        )}
      />
      <ModalLoading loading={isSubmiting} text={'Loading...'} />
    </>
  )
}
