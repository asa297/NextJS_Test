import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase'
import { Icon } from 'antd'
import { default as Action } from '<actions>'

export default role => Component => {
  return connect(
    null,
    { StoreAuth: Action.TestAction },
  )(
    class withAuthFirebase extends React.PureComponent {
      state = {
        user: undefined,
      }
      static async getInitialProps(args) {
        const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args))
        return { ...pageProps }
      }

      componentDidMount() {
        const { StoreAuth } = this.props
        auth.onAuthStateChanged(user => {
          if (user) {
            StoreAuth(user)
            this.setState({ user })
          }
        })
      }

      renderProtectedPage() {
        const { user } = this.state
        const isServer = typeof window === 'undefined'

        if (isServer || (!isServer && !user)) {
          return <Icon type="loading" />
        } else {
          if (user) {
            return <Component {...this.props} />
          }
        }
      }

      render() {
        return this.renderProtectedPage()
      }
    },
  )
}
