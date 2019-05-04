import React from 'react'
import styled from 'styled-components'

import { Button } from 'antd'

export default ({ classes, loading, ...rest }) => {
  return <SubmitButton {...rest}>Back</SubmitButton>
}

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: red !important;
  color: white !important;

  border-radius: 0px !important;
`
