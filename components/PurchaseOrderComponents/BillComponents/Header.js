import React from 'react'
import moment from 'moment'

export default class index extends React.PureComponent {
  render() {
    const { orderId, RecordDate, RecordNameBy } = this.props.item
    return (
      <div style={{ display: 'flex' }}>
        <img
          style={{
            width: '65%',
            height: '85px',
            borderRadius: '0px 20px 20px 0px',
          }}
          src={'/static/images/po/header.png'}
          alt="des"
        />
        <div style={{ marginLeft: '5px', width: '35%', height: '85px', background: '#cccccc', borderRadius: '20px 0px 0px 20px', padding: '10px' }}>
          <div>Order ID : {orderId}</div>
          <div style={{ marginTop: '-3px' }}>Date : {moment(RecordDate).format('DD-MM-YYYY (HH:mm:ss)')}</div>
          <div style={{ marginTop: '-3px' }}>Cashier : {RecordNameBy}</div>
        </div>
      </div>
    )
  }
}
