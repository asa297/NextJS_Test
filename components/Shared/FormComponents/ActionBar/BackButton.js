import React from 'react'
import styled from 'styled-components'

import { Button } from 'antd'

export default ({ classes, loading, ...rest }) => {
  return (
    <SubmitButton icon="left" {...rest}>
      Back
    </SubmitButton>
  )
}

const SubmitButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: red !important;
  border-color: transparent;
  color: white !important;

  font-size: 16px;

  border-radius: 0px !important;
`
