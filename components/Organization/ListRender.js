import React from 'react'
import styled from 'styled-components'

export default ({ data, index, ...rest }) => {
  const src = data[index]['orgTypeId'] === 1 ? '/static/images/organization/china.png' : '/static/images/organization/russia.png'
  const text = data[index]['orgName']
  return (
    <ListView {...rest}>
      <Icon src={src} />
      <Text>{text} </Text>
    </ListView>
  )
}
const ListView = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  border-bottom: 1px solid black;
  padding: 10px;
  background: rgba(238, 238, 238, 0.5);

  :hover,
  :active {
    color: white;
    background: rgba(196, 196, 196, 0.7);
  }
`

const Icon = styled.img`
  width: 30px;
  height: 30px;
`

const Text = styled.label`
  padding-left: 10px;
  font-size: 20px;
`
