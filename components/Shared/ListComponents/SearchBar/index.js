import { Input } from 'antd'
import styled from 'styled-components'
const Search = Input.Search

export default ({ ...rest }) => {
  return <InputWrapper {...rest} />
}

const InputWrapper = styled(Search)`
  height: 40px;
`
