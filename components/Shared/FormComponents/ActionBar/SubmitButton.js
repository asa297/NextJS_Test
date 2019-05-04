import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

export default ({ loading, ...rest }) => {
  return (
    <SubmitButton disabled={loading} {...rest}>
      {!loading && <>Submit</>}
    </SubmitButton>
  )
}

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: #009688 !important;
  color: white !important;

  border-radius: 0px !important;
`
