import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSearchStore } from '@/store/state';
import { useRouter } from 'next/router'
import Header from '@/components/Header';
import Background from '@/components/Background';
import SearchScreen from '@/screens/SearchScreen';

export default function Search() {
    const router = useRouter();
    const { name } = router.query;
    const filteredMovies = useSearchStore((state) => state.filteredMovies);
    const sendSearch = useSearchStore((state) => state.sendSearch);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (name !== undefined) {
            sendSearch({ search: name });
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [name]);

    return (
        <>
            <Head>
                <title>{name ? `${name?.charAt(0).toUpperCase() + name?.slice(1)} •` : ''} HBO Max Inspiration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <Background />
            <span className='back' onClick={() => history.back()}>
                <svg className='me-2' width="6" height="10" viewBox="0 0 6 10" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M0.226826 4.13752L4.28564 0.214945C4.48139 0.025762 4.79343 0.0310873 4.98259 0.226839L5.4401 0.700232C5.62896 0.89565 5.62401 1.20706 5.42904 1.39638L2.2121 4.51999L5.32058 7.75154C5.50898 7.9474 5.50329 8.2588 5.30788 8.44766L4.83448 8.90516C4.63873 9.09434 4.32669 9.08902 4.13753 8.89327L0.214931 4.8345C0.0257689 4.63874 0.0310943 4.32671 0.226826 4.13752Z"></path></svg>
                VOLVER
            </span>
            <SearchScreen loading={loading} filteredMovies={filteredMovies} name={name} />
        </>
    )
}