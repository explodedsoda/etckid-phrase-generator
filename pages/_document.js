// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render () {
    return (
      <Html>
        <Head>
          <style>
            <link href='https://fonts.googleapis.com/css?family=Open+Sans&display=swap' rel='preload' as='font' type='font/woff2' crossOrigin='anonymous' />
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
