import React from 'react'
import { connect } from 'react-redux'
import { auth, firebase } from '../../firebase'
import { Icon } from 'antd'
import { default as Action } from '<actions>'

var db = firebase.firestore()
export default role => Component => {
  return connect(
    null,
    { StoreAuth: Action.TestAction },
  )(
    class withAuthFirebase extends React.PureComponent {
      state = {
        user: undefined,
        user_role: undefined,
      }
      static async getInitialProps(args) {
        const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args))
        return { ...pageProps }
      }

      componentDidMount() {
        const { StoreAuth } = this.props
        auth.onAuthStateChanged(user => {
          if (user) {
            db.collection('user_list')
              .where('uid', '==', user.uid)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  const { role } = doc.data()
                  StoreAuth(user, role)
                  this.setState({ user, user_role: role })
                })
              })
          }
        })
      }

      renderProtectedPage() {
        const { user, user_role } = this.state
        const isServer = typeof window === 'undefined'
        const hasAuthorized = role.find(value => value === user_role)

        if (isServer || (!isServer && !user)) {
          return <Icon type="loading" />
        } else {
          if (user && hasAuthorized) {
            return <Component {...this.props} />
          } else {
            return <>You don't have Authorized</>
          }
        }
      }

      render() {
        return this.renderProtectedPage()
      }
    },
  )
}
