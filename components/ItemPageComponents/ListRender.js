import React from 'react'
import styled from 'styled-components'
import momemt from 'moment'
import { List, Avatar } from 'antd'

export default ({ data, index, onClick, isScrolling, isVisible, ...rest }) => {
  const src = '/static/images/item/item.png'
  const text = `${data[index]['orgName']} (${data[index]['orgCode']})`
  const des = `Last Modify : ${momemt(data[index]['LastModifyDate']).format('DD-MM-YYYY (HH:MM)')}`
  return (
    <ListView onClick={() => onClick(data[index])} {...rest}>
      <ListItemMeta avatar={<Avatar src={src} />} title={<Text>{text}</Text>} description={des} />
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
