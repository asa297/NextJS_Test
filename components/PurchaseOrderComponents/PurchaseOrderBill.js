import React, { useRef } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import ReactToPrint from 'react-to-print'
import BillComponents from './BillComponents'

export default ({ item, Reset, ...rest }) => {
  const componentRef = useRef()
  return (
    <BillTemplateWrapper>
      <BillTemplateLabel> กดปุ่ม Print เพื่อพิมพ์ใบเสร็จรับเงิน หรือ กดปุ่ม Done เพื่อทำรายการขายใหม่</BillTemplateLabel>
      <ButtonContainer>
        <ReactToPrint
          trigger={() => (
            <ButtonWrapper icon="printer" color="#096dd9">
              Print
            </ButtonWrapper>
          )}
          content={() => componentRef.current}
        />
        <ButtonWrapper icon="file-done" color="#389e0d" onClick={() => Reset()}>
          Done
        </ButtonWrapper>
      </ButtonContainer>

      <div style={{ display: 'none' }}>
        <BillComponents ref={componentRef} item={item} />
      </div>
    </BillTemplateWrapper>
  )
}

const BillTemplateWrapper = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`

const ButtonWrapper = styled(Button)`
  background-color: ${props => props.color};
  color: white;

  margin: 0 5px;
`

const BillTemplateLabel = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`
