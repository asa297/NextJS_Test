import { Input } from 'antd'
import styled from 'styled-components'

export default ({ ...rest }) => {
  return (
    <Container>
      <Input.Search {...rest} />
    </Container>
  )
}

const Container = styled.div`
  @media (min-width: 0px) and (max-width: 1200px) {
    width: 100%;
  }
  width: 80%;
`
