import React from 'react'
import styled from 'styled-components'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export default ({ hide, ...rest }) => {
  return (
    <Container hide={hide}>
      <FabWrapper {...rest}>
        <Add />
      </FabWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;

  display: ${props => (props.hide ? 'none' : 'block')};
`

const FabWrapper = styled(Fab)`
  background-color: #4caf50 !important;
  color: white !important;
`
