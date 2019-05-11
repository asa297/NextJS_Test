import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import scss from '<styles>/main.scss'

export default ({
  label,
  required,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0

  return (
    <FieldContainer>
      <TextWrapper>
        {label}
        {required && <LabelRed>*</LabelRed>}
      </TextWrapper>
      <InputWrapper {...field} {...rest} error={error} />
      <div className={scss.field_error}>{(touched[field.name] && errors[field.name]) || errors[field.name]}</div>
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  padding-bottom: 10px;
`
const TextWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`
const InputWrapper = styled(Input)`
  width: 100%;
  border-color: ${props => (props.error ? 'red' : '#d9d9d9')};
  padding: 20px 15px;
`
const LabelRed = styled.label`
  color: red;
`
