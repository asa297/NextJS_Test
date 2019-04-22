import React from 'react'

const namespace = 'http://localhost:3000'

export default role => Component => {
  return class withAuth extends React.PureComponent {
    static async getInitialProps(args) {
      const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args))

      return { ...pageProps }
    }

    renderProtectedPage() {
      const { isAuthenticated, user } = this.props.auth
      const userRole = user && user[`${namespace}/role`]

      let isAuthorized = false

      if (role) {
        if (userRole && role.find(value => value === userRole)) {
          isAuthorized = true
        }
      } else {
        isAuthorized = true
      }

      if (!isAuthenticated) {
        return <div>This Page have to isAuthenticated</div>
      } else if (!isAuthorized) {
        return <div>The Authorized is invalid</div>
      } else {
        return <Component {...this.props} />
      }
    }

    render() {
      return this.renderProtectedPage()
    }
  }
}
