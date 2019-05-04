import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import scss from '<styles>/main.scss'

export default ({
  label,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const isError = (touched[field.name] && errors[field.name]) || errors[field.name] ? true : false
  return (
    <FieldContainer>
      <LabelWrapper>{label}</LabelWrapper>
      <InputWrapper {...field} {...rest} isError={isError} />
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
const InputWrapper = styled(Input)`
  width: 100%;
  border-color: ${props => (props.isError ? 'red' : '#d9d9d9')};
  padding: 20px 15px;
`
