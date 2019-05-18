import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'

export default ({ itemList }) => {
  const RunNumberColumn = (
    <div
      style={{
        width: '8%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 0px 2px 2px',
        textAlign: 'center',
      }}
    >
      {_.map(itemList, ({ _id }, index) => {
        return (
          <div key={_id} style={{ fontSize: '13px' }}>
            {index + 1}
          </div>
        )
      })}
    </div>
  )

  const ItemCodeColumn = (
    <div
      style={{
        width: '20%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 0px 2px 2px',
        textAlign: 'center',
      }}
    >
      {_.map(itemList, ({ itemCode, _id }) => {
        return (
          <div key={_id} style={{ marginLeft: '5px', fontSize: '13px' }}>
            {itemCode}
          </div>
        )
      })}
    </div>
  )

  const ItemNameColumn = (
    <div
      style={{
        width: '32%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 0px 2px 2px',
        textAlign: 'left',
      }}
    >
      {_.map(itemList, ({ itemName, item_color, _id }) => {
        return (
          <div key={_id} style={{ marginLeft: '5px', fontSize: '13px' }}>
            {itemName} {item_color ? ' ' + item_color : null}
          </div>
        )
      })}
    </div>
  )

  const QTYCoulmn = (
    <div
      style={{
        width: '10%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 0px 2px 2px',
        textAlign: 'center',
      }}
    >
      {_.map(itemList, ({ _id, _qty }) => {
        return (
          <div key={_id} style={{ fontSize: '13px' }}>
            {_qty}
          </div>
        )
      })}
    </div>
  )

  const UnitPriceColumn = (
    <div
      style={{
        width: '15%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 0px 2px 2px',
        textAlign: 'right',
      }}
    >
      {_.map(itemList, ({ itemPrice, _id }) => {
        return (
          <div
            key={_id}
            style={{
              marginRight: '5px',
              fontSize: '13px',
            }}
          >
            {numeral(itemPrice).format('0,0.00')} ฿
          </div>
        )
      })}
    </div>
  )

  const TotalColumn = (
    <div
      style={{
        width: '15%',
        height: '250px',
        borderStyle: 'solid',
        borderWidth: '2px 2px 2px 2px',
        textAlign: 'right',
      }}
    >
      {_.map(itemList, ({ itemPrice, _qty, _id }) => {
        return (
          <div
            key={_id}
            style={{
              marginRight: '5px',
              fontSize: '13px',
            }}
          >
            {numeral(itemPrice * _qty).format('0,0.00')} ฿
          </div>
        )
      })}
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      {RunNumberColumn}
      {ItemCodeColumn}
      {ItemNameColumn}
      {QTYCoulmn}
      {UnitPriceColumn}
      {TotalColumn}
    </div>
  )
}
