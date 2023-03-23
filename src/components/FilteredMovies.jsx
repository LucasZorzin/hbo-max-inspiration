import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSearchStore } from '@/store/state';

const FilteredMovies = ({ filteredMovies }) => {
    const sendFilteredContent = useSearchStore((state) => state.sendFilteredContent);
    const router = useRouter();
    const [showRelatedSearches, setShowRelatedSearches] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRelatedSearches(true);
        }, 4000);
        return () => { clearTimeout(timer); setShowRelatedSearches(false) };
    }, [filteredMovies]);

    return (
        <div className={filteredMovies?.length > 0 ? 'grid-movies-container' : 'center'}>
            {filteredMovies?.length > 0 ?
                filteredMovies?.map((movie, index) => (
                    movie.poster_path !== null ?
                        <div key={movie.id}>
                            <div className='movies-slider-container'>
                                <div className='movies-slider'>
                                    <div className='movies-slider-icons'>
                                        <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : router?.asPath?.includes('series') ? 'tv' : 'movie'}&play=true`); sendFilteredContent({ filteredMovies: movie }) }} className='play' />
                                        <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : router?.asPath?.includes('series') ? 'tv' : 'movie'}`); sendFilteredContent({ filteredMovies: movie }) }} className='info' />
                                    </div>
                                    <img onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : router?.asPath?.includes('series') ? 'tv' : 'movie'}`); sendFilteredContent({ filteredMovies: movie }) }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name !== undefined ? movie.name : movie.title} width={180} height={270} />
                                </div>
                            </div>
                        </div>
                        :
                        null
                ))
                :
                <span className='no-related-searches'>
                    {
                        (showRelatedSearches && filteredMovies?.length === 0) ?
                            'No related searches have been found 😔'
                            :
                            <div class="lds-dual-ring"></div>
                    }
                </span>
            }
        </div>
    );
}

export default FilteredMovies;