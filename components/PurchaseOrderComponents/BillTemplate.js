import React from 'react'

import Header from './BillComponents/Header'
import Content from './BillComponents/Content'
import Footer from './BillComponents/Footer'
import Thanks from './BillComponents/Thanks'

export default class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div style={{ fontFamily: 'Kanit ' }}>
        <div>
          <Header {...this.props} />
          <Content {...this.props} copy="##ORIGINAL##" />
          <Footer {...this.props} />
          <Thanks />
        </div>

        <hr style={{ borderTop: 'dashed 1px' }} />
        <div>
          <Header {...this.props} />
          <Content {...this.props} copy="##COPY##" />
          <Footer {...this.props} />
          <Thanks />
        </div>
      </div>
    )
  }
}
