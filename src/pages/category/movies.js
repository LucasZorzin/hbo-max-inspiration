import React from 'react';
import CategoryScreen from '@/screens/CategoryScreen';
import useLoadingAndSendGenre from '@/hooks/useLoadingAndSendGenre';
import Head from 'next/head';
import Footer from '@/components/Footer';

export default function Movies() {
    const category = 'movies';
    const { loading, filteredMovies } = useLoadingAndSendGenre(category);

    return (
        <>
            <Head>
                <title>Movies • HBO Max Inspiration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <CategoryScreen {...{ loading, filteredMovies }} title={'Movies'} />
        </>
    )
}