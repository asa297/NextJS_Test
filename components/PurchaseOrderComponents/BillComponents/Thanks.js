import React from 'react'

export default class Thanks extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end' }}>
          <font style={{ fontSize: '16px', fontWeight: 'bold' }}>Thank you for visiting us!</font>
        </div>
      </div>
    )
  }
}