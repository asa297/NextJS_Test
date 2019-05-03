import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" type="image/x-icon" href="/static/logo/shopping.ico" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          {/* <link rel="stylesheet" type="text/css" href="/static/react-virtualzed.css" /> */}
        </Head>
        <body style={{ margin: '0px', overflowX: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
