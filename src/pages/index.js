import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import HomeScreen from '@/screens/HomeScreen';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>HBO Max Inspiration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <HomeScreen movies={props} />
    </>
  )
}

export async function getServerSideProps() {
  const BASE_URL = process.env.BASE_URL;
  const API_KEY = process.env.API_KEY;

  try {
    const [
      trendingNow,
      HBOOriginalsTV,
      HBOOriginalsMovies,
      popular,
    ] = await Promise.all([
      fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&with_networks=49`).then((res) => res.json()),
      fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_networks=49`).then((res) => res.json()),
      fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_networks=49`).then((res) => res.json()),
      fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&with_networks=49`).then((res) => res.json())
    ])

    return {
      props: {
        trendingNow: trendingNow.results,
        HBOOriginals: [...HBOOriginalsTV.results.slice(0, 10), ...HBOOriginalsMovies.results.slice(0, 10)],
        popular: popular.results
      },
    }
  }
  catch (error) {
    console.error('API Error', error);
    return {
      props: {},
    };
  }
}
