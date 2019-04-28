import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'

import NProgress from 'nprogress'
import { Router } from '<routes>'

import { Header } from '<components>'
import { Auth } from '<services>'

import '../styles/main.scss'
import 'react-table/react-table.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    const user = process.browser ? await Auth.clientAuth() : await Auth.serverAuth(ctx.req)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const auth = { user, isAuthenticated: !!user }
    return { pageProps, auth }
  }
  render() {
    const { Component, pageProps, reduxStore, auth } = this.props
    return (
      <Container>
        <Head>
          <title>Giornie</title>
        </Head>
        <Header {...pageProps} auth={auth} />
        <Provider store={reduxStore}>
          <Component {...pageProps} auth={auth} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
