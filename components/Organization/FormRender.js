import React from 'react'
import { Formik, Field } from 'formik'
import { OrganizationSchema } from '<helpers>/validate'
import { InputItem, SubmitButton } from '<components>'

export default ({ Item, closeForm, ...rest }) => {
  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validationSchema={OrganizationSchema}
        onSubmit={async (values, actions) => {}}
        render={props => (
          <form>
            <Field
              label="Organization Name (ชื่อบริษัท)"
              type="text"
              name="org_name"
              component={InputItem}
              value={props.values.org_name}
              onChange={e => props.setFieldValue('org_name', e.target.value)}
            />
            <Field
              label="Organization Comission A (ค่าคอมมิชชั่นสินค้า A)"
              type="number"
              name="org_comA"
              component={InputItem}
              value={props.values.org_comA}
              onChange={e => props.setFieldValue('org_comA', e.target.value)}
            />
            <Field
              label="Organization Comission B (ค่าคอมมิชชั่นสินค้า B)"
              type="number"
              name="org_comB"
              component={InputItem}
              value={props.values.org_comB}
              onChange={e => props.setFieldValue('org_comB', e.target.value)}
            />
            <Field
              label="Organization Code (รหัสบริษัท)"
              type="text"
              name="org_code"
              component={InputItem}
              value={props.values.org_code}
              onChange={e => props.setFieldValue('org_code', e.target.value)}
            />

            <SubmitButton />
          </form>
        )}
      />
    </>
  )
}
