import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import scss from '<styles>/main.scss'

const Option = Select.Option

export default ({
  label,
  data,
  fieldread,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? true : false
  return (
    <FieldContainer>
      <LabelWrapper>{label}</LabelWrapper>

      <SelectWrapper
        {...field}
        {...rest}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {data.map(option => (
          <Option key={option.id} value={option[fieldread]}>
            {option[fieldread]}
          </Option>
        ))}
      </SelectWrapper>
      <div className={scss.field_error}>{(touched[field.name] && errors[field.name]) || errors[field.name]}</div>
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  padding-bottom: 10px;
`
const LabelWrapper = styled.label`
  font-size: 16px;
`
const SelectWrapper = styled(Select)`
  width: 100%;
  border-color: ${props => (props.isError ? 'red' : '#d9d9d9')};

  .ant-select-selection__rendered {
    line-height: 42px;
  }
  .ant-select-selection--single {
    height: 42px;
  }
`
