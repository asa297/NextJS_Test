import React from 'react'
export default Component => {
  return class withAuth extends React.PureComponent {
    render() {
      return <Component {...this.props} />
    }
  }
}
