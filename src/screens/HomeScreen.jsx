import Background from '@/components/Background';
import HomeCarousel from '@/components/HomeCarousel';
import Loader from '@/components/Loader';
import HomeMoviesCarousel from '@/components/HomeMoviesCarousel';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const HomeScreen = ({ movies }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 800);
    }, []);

    return (
        <>
            <Loader loading={loading} />
            <Background />
            <HomeCarousel movies={movies} />
            {
                loading === false &&
                <div style={{marginBottom: '50px'}}>
                    {Object.keys(movies)?.map((key, index) => (
                        <HomeMoviesCarousel movies={movies} type={key} key={index} />
                    ))}
                </div>
            }
        <Footer />
        </>
    )
}

export default HomeScreen;