import React from 'react'
import styled from 'styled-components'
import momemt from 'moment'
import { List, Avatar } from 'antd'

export default ({ data, index, onClick, isScrolling, isVisible, ...rest }) => {
  const src = data[index]['orgTypeId'] === 2 ? '/static/images/organization/china.png' : '/static/images/organization/russia.png'
  const text = `${data[index]['orgName']} (${data[index]['orgCode']})`
  const des = data[index]['LastModifyDate']
  return (
    <ListView onClick={() => onClick(data[index])} {...rest}>
      <ListItemMeta avatar={<Avatar src={src} />} title={<Text>{text}</Text>} description={momemt(des).format('DD-MM-YYYY')} />
    </ListView>
  )
}
const ListView = styled(List.Item)`
  height: 100%;
  display: flex;
  align-items: center;

  cursor: pointer;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px;

  :hover,
  :active {
    color: white;
    background: rgba(196, 196, 196, 0.7);
  }
`
const ListItemMeta = styled(List.Item.Meta)`
  align-items: center;
`
const Text = styled.label`
  font-size: 20px;
`
