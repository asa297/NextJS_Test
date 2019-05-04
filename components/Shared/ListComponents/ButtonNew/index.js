import styled from 'styled-components'
import { Button } from 'antd'

export default ({ hide, ...rest }) => {
  return (
    <Container hide={hide}>
      <ButtonWrapper icon="plus" {...rest} />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: ${props => (props.hide ? 'none' : 'block')};
`

const ButtonWrapper = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  color: white;
  font-size: 26px;
  background-color: #73d13d;
  border-color: white;

  :hover,
  :active,
  :focus {
    color: white;
    background-color: #73d13d;
    border-color: white;
  }
`
