import styled from 'styled-components'
import { Button, Input } from 'antd'

export default ({ listItems, onClick, onChange, ...rest }) => {
  return (
    <ItemContainer>
      <ColumnContainer>
        <ActionColumn />
        <ItemColumn>Item Code : (Item Name)</ItemColumn>
        <QtyColumn>Quality</QtyColumn>
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
              <ItemDataContainer>{v.itemCode}</ItemDataContainer>

              <QtyDataContainer>
                <Input value={v._qty} onChange={e => onChange(v._id, e)} />
              </QtyDataContainer>
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
  justify-content: space-around;
  padding: 10px 0;
`

const ListContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`

const ActionColumn = styled.div`
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (min-width: 1366px) {
    width: 5%;
  }

  width: 10%;
  color: black;
  font-weight: bold;
`

const ActionDataContainer = styled.div`
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (min-width: 1366px) {
    width: 5%;
  }

  width: 10%;
  display: flex;
`

const ItemColumn = styled.div`
  @media (max-width: 600px) {
    width: 55%;
  }

  width: 60%;
  color: black;
  font-weight: bold;
`

const ItemDataContainer = styled.div`
  @media (max-width: 600px) {
    width: 55%;
  }

  width: 60%;
`

const QtyColumn = styled.div`
  @media (max-width: 600px) {
    width: 15%;
  }
  @media (min-width: 1366px) {
    width: 30%;
  }

  width: 25%;
  color: black;
  font-weight: bold;
`

const QtyDataContainer = styled.div`
  @media (max-width: 600px) {
    width: 15%;
  }
  @media (min-width: 1366px) {
    width: 30%;
  }
  width: 25%;
`

const ListCard = styled.div`
  background: rgba(220, 250, 250, 0.65);
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;

  padding: 10px 0;
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
