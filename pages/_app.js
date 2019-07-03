import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'

import NProgress from 'nprogress'
import Router from 'next/router'

import { Header } from '<components>'

import '../styles/main.scss'

import '../firebase'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <title>Giornie</title>
        </Head>

        <Provider store={reduxStore}>
          <>
            <Header {...pageProps} />
            <Component {...pageProps} />
          </>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
