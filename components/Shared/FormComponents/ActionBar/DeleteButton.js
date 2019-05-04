import styled from 'styled-components'

import { Button, Popconfirm } from 'antd'

export default ({ ...rest }) => {
  return (
    <Popconfirm {...rest}>
      <DeleteButton icon="delete">Delete</DeleteButton>
    </Popconfirm>
  )
}

const DeleteButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: red !important;
  border-color: transparent !important;
  color: white !important;

  font-size: 16px;

  border-radius: 0px !important;
`
