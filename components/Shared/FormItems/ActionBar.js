import React from 'react'
import styled from 'styled-components'
import { SubmitButton, BackButton } from '<components>'

export default ({ onBack, onSubmit, ...rest }) => {
  return (
    <ActionBarContainer>
      <BackButton onClick={() => onBack()} />
      <SubmitButton onClick={() => onSubmit()} {...rest} />
    </ActionBarContainer>
  )
}

const ActionBarContainer = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  z-index: 999;
`
