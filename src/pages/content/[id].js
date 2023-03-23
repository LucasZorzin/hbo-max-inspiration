import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Header from '@/components/Header';
import Background from '@/components/Background';
import ContentScreen from '@/screens/ContentScreen';

export default function Content() {
    const router = useRouter();
    const { id, name, type } = router.query;
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(undefined);

    const findContentByID = async () => {
        try {
            const response = await fetch(`/api/findByID?id=${id}&type=${type}&name=${name}`)
            const dataContent = await response.json();
            setContent(dataContent);
        }
        catch (error) {
            console.error('API Error', error);
        }
    }

    useEffect(() => {
        findContentByID();
        setLoading(false);
    }, [])

    return (
        <>
            <Head>
                <title>{name ? `${name?.charAt(0).toUpperCase() + name?.slice(1)} •` : ''} HBO Max Inspiration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <Background />
            <ContentScreen {...{ loading, content }} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { id, name, type } = context.query;
    return {
        props: { id, name, type },
    };
}