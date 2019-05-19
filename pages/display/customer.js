import React from 'react'
import { CustomerDisplayConponents } from '<components>'

import io from 'socket.io-client'

// import background from './background.png'
// import logo from './logo.png'
// import textbar from './textbar.png'
// import thanks from './thanks.png'

export default class index extends React.PureComponent {
  state = {
    socket: undefined,
  }

  static async getInitialProps(ctx) {
    const host = process.env.HOST_URL

    return { host, noHeader: true }
  }

  componentDidMount() {
    const { host, auth } = this.props

    const socket = io(host, {
      transports: ['websocket'],
      query: {
        userSocket: auth.user.name,
      },
    })

    socket.emit('joinroom')

    this.setState({ socket })
  }

  render() {
    return <CustomerDisplayConponents />
  }
}
