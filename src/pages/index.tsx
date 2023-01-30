import { type NextPage } from 'next';
import Head from 'next/head';

import DrumfillGenerator from '../components/fillGenerator.jsx';

const Home: NextPage = () => {
  return (
    <div className="flexColumn">
      <Head>
        <title>ETCerati Request Generator</title>
      </Head>
      <h1 className="title">ETCerati Request Generator</h1>
      <div className="marginTop">
        <a href="https://twitch.tv/etckid" target="_blank" rel="noopener noreferrer">
          twitch.tv/etckid
        </a>
      </div>
      <h3>Generate Text</h3>
      <DrumfillGenerator />
    </div>
  );
};

export default Home;
