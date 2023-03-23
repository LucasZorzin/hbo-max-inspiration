import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Background from '@/components/Background';
import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <Head>
                <title>404 • HBO Max Inspiration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <Background />
            <div className='center not-found'>
                <span className='text-white' >404: This page could not be found.</span>
                <Link href='/'>Back to home</Link>
            </div>
        </>
    )
}