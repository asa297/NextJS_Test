import React from 'react'
import styled from 'styled-components'

export default ({ data, index, keyData, ...rest }) => <ListView {...rest}>{data[index][keyData]}</ListView>

const ListView = styled.div`
  cursor: pointer;
  border-bottom: 1px solid black;
  padding: 10px;

  :hover {
    color: white;
    background: rgba(196, 196, 196, 0.7);
  }
`
