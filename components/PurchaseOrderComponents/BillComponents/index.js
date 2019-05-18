import React from 'react'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Thanks from './Thanks'

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
