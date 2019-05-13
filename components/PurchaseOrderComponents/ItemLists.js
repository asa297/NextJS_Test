import styled, { css } from 'styled-components'
import { Button, Input } from 'antd'

export default ({ listItems, onClick, onChange, ...rest }) => {
  return (
    <ItemContainer>
      <ColumnContainer>
        <ActionColumnStyle />
        <ItemColumnStyle header>สินค้า</ItemColumnStyle>
        <UnitPriceColumnStyle header>ราคาต่อหน่วย</UnitPriceColumnStyle>
        <QtyColumnStyle header>จำนวน</QtyColumnStyle>
        <TotalColumnStyle header>ยอดรวม</TotalColumnStyle>
      </ColumnContainer>
      <ListContainer>
        {listItems.map(v => {
          return (
            <ListCard key={v._id}>
              <ActionDataContainer>
                <IconContainer>
                  <ButtonWrapper type="primary" icon="plus" color="green" onClick={() => onClick(v._id, 'PLUS')} />
                </IconContainer>
                <IconContainer>
                  <ButtonWrapper type="primary" icon="minus" color="red" onClick={() => onClick(v._id, 'MINUS')} />
                </IconContainer>
              </ActionDataContainer>
              <ItemColumnStyle>
                {v.itemCode} ({v.itemName})
              </ItemColumnStyle>
              <UnitPriceColumnStyle>{500}</UnitPriceColumnStyle>
              <QtyColumnStyle>
                <Input value={v._qty} onChange={e => onChange(v._id, e)} />
              </QtyColumnStyle>

              <TotalColumnStyle>50000</TotalColumnStyle>
            </ListCard>
          )
        })}
      </ListContainer>
    </ItemContainer>
  )
}

const ItemContainer = styled.div``

const ColumnContainer = styled.div`
  display: flex;
  padding: 10px 0;
`

const ListCard = styled.div`
  background: rgba(220, 250, 250, 0.65);
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;
  padding: 10px 0;
`

const ListContainer = styled.div``

const ActionColumnStyle = styled.div`
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (min-width: 1366px) {
    width: 5%;
  }
  width: 10%;
  padding: 0 5px;
`

const ActionDataContainer = styled(ActionColumnStyle)`
  display: flex;
`

const ItemColumnStyle = styled.div`
  @media (max-width: 600px) {
    width: 30%;
  }

  width: 50%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const UnitPriceColumnStyle = styled.div`
  @media (max-width: 600px) {
    width: 15%;
  }

  width: 10%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const QtyColumnStyle = styled.div`
  @media (max-width: 600px) {
    width: 20%;
  }

  width: 15%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const TotalColumnStyle = styled.div`
  @media (max-width: 600px) {
    width: 15%;
  }
  width: 10%;

  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.header && 'font-weight : bold;'}
`

const IconContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonWrapper = styled(Button)`
  background-color: ${props => props.color};
  border: none;

  :hover,
  :focus,
  :active {
    background-color: ${props => props.color};
    border: none;
  }
`
