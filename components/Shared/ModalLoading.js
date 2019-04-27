import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

export default ({ loading = false, text }) => {
  return (
    <ModalContainer loading={loading}>
      <CenterScreenContainer>
        <MainContainer>
          <CircularProgressWrapper />
          <ModalLabel> {text}</ModalLabel>
        </MainContainer>
      </CenterScreenContainer>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;

  background-color: rgba(96, 96, 96, 0.5);
  z-index: 999;

  position: absolute;
  top: 0;

  display: ${props => (props.loading ? 'block' : 'none')};
`
const CenterScreenContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  position: absolute;
  top: 45%;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CircularProgressWrapper = styled(CircularProgress)`
  .MuiCircularProgress-svg-86 {
    color: rgba(52, 152, 219, 1);
  }
`

const ModalLabel = styled.label`
  padding-top: 10px;
  font-size: 16px;
`
