import React from 'react'
import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'
import { Save } from '@material-ui/icons'

export default ({ loading, ...rest }) => {
  return (
    <SubmitButton variant="contained" disabled={loading} {...rest}>
      {loading && <CircularProgress size={18} color="inherit" />}
      {!loading && (
        <>
          <Save style={{ marginRight: '10px' }} /> Submit
        </>
      )}
    </SubmitButton>
  )
}

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: #009688 !important;
  color: white !important;

  border-radius: 0px !important;
`
