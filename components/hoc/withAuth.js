import React from 'react'
export default Component => {
  return class withAuth extends React.PureComponent {
    static async getInitialProps(args) {
      const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args))

      return { ...pageProps }
    }

    renderProtectedPage() {
      const { isAuthenticated } = this.props.auth

      if (isAuthenticated) {
        return <Component {...this.props} />
      } else {
        return (
          <>
            <div>This is Sccret Page</div>
          </>
        )
      }
    }

    render() {
      return this.renderProtectedPage()
    }
  }
}
