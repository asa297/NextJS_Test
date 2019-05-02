import React from 'react'
import styled from 'styled-components'

import { Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

export default ({ classes, loading, ...rest }) => {
  return (
    <SubmitButton variant="contained" {...rest}>
      <ArrowBack style={{ marginRight: '10px' }} /> Back
    </SubmitButton>
  )
}

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: red !important;
  color: white !important;

  border-radius: 0px !important;
`
