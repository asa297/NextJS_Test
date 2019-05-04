import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

export default ({ loading, ...rest }) => {
  return (
    <SubmitButton icon={loading ? 'loading' : 'save'} disabled={loading} {...rest}>
      {!loading ? 'Submit' : 'Submitting'}
    </SubmitButton>
  )
}

const SubmitButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: #009688 !important;
  border-color: transparent !important;
  color: white !important;

  font-size: 16px;

  border-radius: 0px !important;
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  .ant-btn[disabled] {
    border-color: transparent;
  }
`
