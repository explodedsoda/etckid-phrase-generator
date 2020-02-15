import React, { useEffect } from 'react'
import Head from 'next/head'
import DrumfillGenerator from '../components/text-generator'
import NameDisplay from '../components/name-display'
const Home = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    function gtag () {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'UA-151665371-1', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title
    })
  }, [])
  return (
    <div>
      <Head>
        <title>ETCerati Request Generator</title>
        <script async src='https://www.googletagmanager.com/gtag/js?id=UA-151665371-1'></script>
      </Head>
      <h1 className='title'>ETCerati Request Generator</h1>
      <div>
        <h3>Generate Text</h3>
        <DrumfillGenerator />
      </div>
      <style jsx>{`
        :global(body) {
          background-color: #333;
          color: #ddd;
          font-family: Open Sans, Avenir Next, Avenir, Helvetica, sans-serif;
          height: 100vh;
          margin: 2rem;
          text-align: center;
        }
        :global(::selection) {
          background: #9146FF;
          color: #000;
        }
        :global(::-moz-selection) {
          background: #9146FF;
          color: #000;
        }
        :global(button) {
          background-color: #333;
          border: 1px solid #ddd;
          color: #ddd;
          margin-top: 1rem;
          padding: 1rem;
          text-transform: uppercase;
        }
        :global(input) {
          margin-left: 0.5rem;
        }
        .title {
          margin: 0;
          width: 100%;
          line-height: 1.15;
        }
        .title {
          text-align: center;
        }
      `}
      </style>
    </div>
  )
}
export default Home
