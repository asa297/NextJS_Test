import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

export default ({ ...rest }) => {
  return <RangePicker size={'large'} {...rest} />
}
