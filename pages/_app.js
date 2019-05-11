import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'

import NProgress from 'nprogress'

import { Header, MenuSlider } from '<components>'
import { Auth } from '<services>'

import '../styles/main.scss'

import MediaQuery from 'react-responsive'

import styled from 'styled-components'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
        <MasterLayout>
          <MediaQuery query="(min-device-width: 1366px)">
            <MenuSlider {...pageProps} auth={auth} />
          </MediaQuery>
          <ContentLayout>
            <Provider store={reduxStore}>
              <Component {...pageProps} auth={auth} />
            </Provider>
          </ContentLayout>
        </MasterLayout>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)

const MasterLayout = styled.div`
  display: flex;
  background-color: #f0f2f5;
  @media (max-width: 600px) {
    height: calc(100vh - 56px);
  }

  height: calc(100vh - 64px);
`

const ContentLayout = styled.div`
  width: calc(100% - 200px);
`
