import { useState } from 'react'
import { Formik, Field } from 'formik'
import { GroupSchema } from '<helpers>/validate'
import { InputItem, SelectItem, ActionBar, SearchBar } from '<components>'
import { Collapse } from 'antd'

const Panel = Collapse.Panel

export default ({ Insert, ...rest }) => {
  const [isSubmiting, setisSubmiting] = useState(false)
  const [listItems, setlistItems] = useState([])

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
                  data={[]}
                  value={props.values.org ? props.values.org.label : ''}
                  fieldread="label"
                  onChange={e => props.setFieldValue('org', orgData.find(v => v.label === e))}
                />

                <Field
                  label="พนักงานขาย"
                  name="org"
                  component={SelectItem}
                  required
                  data={[]}
                  value={props.values.org ? props.values.org.label : ''}
                  fieldread="label"
                  onChange={e => props.setFieldValue('org', orgData.find(v => v.label === e))}
                />
              </Panel>
            </Collapse>

            <SearchBar placeholder="ค้นหาสินค้า" onSearch={e => console.log(e)} enterButton={true} size="large" />
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
