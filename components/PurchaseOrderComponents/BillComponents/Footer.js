import React from 'react'
import numeral from 'numeral'

export default class Footer extends React.PureComponent {
  paymentMethod(data) {
    const { credit, grandTotal } = data
    let paymentMethod = 'Cash'
    if (credit > 0 && grandTotal === 0) {
      paymentMethod = 'Credit'
    } else if (credit > 0 && grandTotal !== 0) {
      paymentMethod = 'Cash && Credit'
    }

    return paymentMethod
  }

  render() {
    const {
      item: { group, seller, receiveCash, changeCash },
    } = this.props

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '3px',
        }}
      >
        <div style={{ display: 'flex', width: '90%' }}>
          <div
            style={{
              width: '70%',
              height: '65px',
              background: '#cccccc',
              borderWidth: '2px 0px 2px 0px',
              borderStyle: 'solid',
              borderColor: 'white',
              borderRadius: '15px 0px 0px 15px',
              fontSize: '13px',
              paddingLeft: '20px',
            }}
          >
            <div>
              <b>รหัสกรุ๊ป / GroupId : </b>
              {group.groupCode}
            </div>
            <div>
              <b>รหัสพนักงานขาย / Service Rep ID : </b>
              {seller.sellerCode}
            </div>
            <div>
              <b>ชำระโดย / Payment Method : </b>
              {this.paymentMethod(this.props.item)}
            </div>
          </div>
          <div
            style={{
              width: '15%',
              height: '65px',
              background: '#cccccc',
            }}
          >
            <div
              style={{
                height: '50%',
                borderWidth: '2px 0px 2px 2px',
                borderStyle: 'solid',
                borderColor: 'white',
                fontSize: '13px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              <font>รับมา</font>
              <font style={{ marginTop: '-8px' }}>Amount Paid</font>
            </div>
            <div
              style={{
                height: '50%',
                borderWidth: '0px 0px 2px 2px',
                borderStyle: 'solid',
                borderColor: 'white',
                fontSize: '13px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              <font>เงินทอน</font>
              <font style={{ marginTop: '-8px' }}>Change</font>
            </div>
          </div>
          <div
            style={{
              width: '15%',
              height: '65px',
              background: '#cccccc',
            }}
          >
            <div
              style={{
                height: '50%',
                borderWidth: '2px 0px 2px 2px',
                borderStyle: 'solid',
                borderColor: 'white',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '5px',
              }}
            >
              {numeral(receiveCash).format('0,0.00')} ฿
            </div>
            <div
              style={{
                height: '50%',
                borderWidth: '0px 0px 2px 2px',
                borderStyle: 'solid',
                borderColor: 'white',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '5px',
              }}
            >
              {numeral(changeCash).format('0,0.00')} ฿
            </div>
          </div>
        </div>
      </div>
    )
  }
}
