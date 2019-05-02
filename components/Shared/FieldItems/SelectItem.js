import React from 'react'
import styled from 'styled-components'
import { TextField, MenuItem } from '@material-ui/core'
import scss from '<styles>/main.scss'

export default ({
  data,
  fieldread,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const isError = (touched[field.name] && errors[field.name]) || errors[field.name] ? true : false

  return (
    <FieldContainer>
      <TextFieldWrapper select {...field} {...rest} variant="outlined" error={isError}>
        {data.map(option => (
          <MenuItem key={option.id} value={option[fieldread]}>
            {option[fieldread]}
          </MenuItem>
        ))}
      </TextFieldWrapper>
      <div className={scss.field_error}>{(touched[field.name] && errors[field.name]) || errors[field.name]}</div>
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  padding-bottom: 5px;
`
const TextFieldWrapper = styled(TextField)`
  width: 100%;
`
