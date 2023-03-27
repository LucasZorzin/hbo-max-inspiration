import React from 'react';
import { Carousel } from 'react-bootstrap';
import Router from 'next/router';
import { useSearchStore } from '@/store/state';

const HomeCarousel = ({ movies }) => {
    const sendFilteredContent = useSearchStore((state) => state.sendFilteredContent);
    const moviesAndSeries = [...movies?.HBOOriginals?.slice(0, 3), ...movies?.HBOOriginals?.slice(10, 12)];

    return (
        <div className='carousel-container'>
            <Carousel pause={false} controls={false}>

                {moviesAndSeries?.map((movie, index) => (
                    <Carousel.Item key={index}>
                        <div className='carousel-layer' />
                        <div className='carousel-data'>
                            <span>Vote Average: <span className='ms-2'>★ {movie.vote_average.toFixed(1)}</span> </span>
                            <h3>{movie.name !== undefined ? movie.name : movie.title}</h3>
                            <p>{movie.overview}</p>
                            <div className='d-flex'>
                                <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : movie.original_title !== undefined ? 'movie' : movie.name !== undefined ? 'tv' : 'movie'}&play=true`); sendFilteredContent({ filteredMovies: movie }) }} type='button' className='watch'>
                                    <svg style={{ marginLeft: '-5px', marginBottom: '1px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-play-fill me-1" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>
                                    Watch
                                </button>
                                <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : movie.original_title !== undefined ? 'movie' : movie.name !== undefined ? 'tv' : 'movie'}`); sendFilteredContent({ filteredMovies: movie }) }} type='button' className='more-info'>
                                    <svg style={{ marginLeft: '-5px', marginBottom: '1px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-plus me-1" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                    More info
                                </button>
                            </div>
                        </div>
                        <img
                            className="d-block w-100"
                            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                            alt={movie.id}
                        />
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}

export default HomeCarousel;