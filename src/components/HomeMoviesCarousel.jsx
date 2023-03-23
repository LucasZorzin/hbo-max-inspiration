import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Router from 'next/router';
import { useSearchStore } from '@/store/state';

const HomeMoviesCarousel = ({ movies, type }) => {
    const sendFilteredContent = useSearchStore((state) => state.sendFilteredContent);
    const [spaceBetween, setSpaceBetween] = useState(10);

    useEffect(() => {
        AOS.init({
            once: true, disable: 'mobile',
        });

        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 768) {
                setSpaceBetween(50);
            } else {
                setSpaceBetween(10);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    return (
        <div className='mt-5'>
            {(() => {
                switch (type) {
                    case 'HBOOriginals':
                        return (
                            <>
                                <span className="slider-title-movie">
                                    <svg className='me-3' fill='white' width="30px" height="30px" version="1.0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(0 48) scale(.1 -.1)">
                                            <path d="m47 392c-14-15-17-40-17-129 0-150-10-143 212-143 218 0 208-7 208 147 0 150 10 143-212 143-157 0-177-2-191-18zm368-127v-110h-175-175l-3 99c-1 55 0 106 2 113 4 11 41 13 178 11l173-3v-110z" />
                                            <path d="m200 265c0-30 2-55 5-55 16 0 95 46 95 55s-79 55-95 55c-3 0-5-25-5-55z" />
                                            <path d="m140 75c0-12 18-15 100-15s100 3 100 15-18 15-100 15-100-3-100-15z" />
                                        </g>
                                    </svg>
                                    Only on HBO Max
                                </span>
                            </>
                        );
                    case 'trendingNow':
                        return (
                            <>
                                <span className="slider-title-movie">
                                    <svg className='me-2' version="1.0" xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                            fill="white" stroke="none">
                                            <path d="M380 455 c0 -11 12 -15 50 -15 60 0 59 -3 -19 -90 l-49 -54 -44 48
                                            -44 49 -82 -99 c-76 -91 -95 -124 -73 -124 5 0 42 41 82 90 l74 90 39 -45 c21
                                            -25 43 -45 50 -45 7 0 39 33 72 72 l59 73 3 -35 c4 -40 19 -61 30 -43 4 6 5
                                            41 4 77 l-4 66 -74 0 c-59 0 -74 -3 -74 -15z"/>
                                        </g>
                                    </svg>
                                    Trends Now
                                </span>
                            </>
                        );
                    case 'popular':
                        return (
                            <>
                                <span className="slider-title-movie">
                                    <svg className='me-2' fill='white' width="35px" height="35px" version="1.0" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(0 32) scale(.1 -.1)">
                                            <path d="m103 263c24-28 22-40-18-84-21-23-35-49-35-64 0-34 42-75 77-75 21 0 24 3 15 12-17 17-15 39 3 31 9-3 24 2 34 11 25 22 34 7 16-27-17-34 0-37 38-7 32 25 43 76 27 124-13 42-71 80-135 92-39 7-40 6-22-13zm82-27c51-22 81-95 55-136-7-11-11-8-20 15-11 29-26 45-44 45-4 0-5-7-2-16 4-9 1-23-5-31-10-11-15-11-30 3-18 16-19 15-25-14-7-36-19-41-34-13-16 31-12 46 25 84 19 20 35 45 35 57 0 24 1 24 45 6z" />
                                        </g>
                                    </svg>
                                    Popular
                                </span>
                            </>
                        );
                    default:
                        return null;
                }
            })()}
            <Swiper
                spaceBetween={spaceBetween}
                navigation={true}
                centeredSlides={false}
                centerInsufficientSlides={true}
                modules={[Navigation]}
                className="mySwiper mySwiper--home"
                breakpoints={{
                    1: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    992: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    1440: {
                        slidesPerView: 7,
                        slidesPerGroup: 7,
                    },
                    1700: {
                        slidesPerView: 8,
                        slidesPerGroup: 8,
                    },
                }}
            >
                {movies[type]?.map((movie, index) => (
                    movie.poster_path !== null ?
                        <SwiperSlide className="swiper-slide" key={movie.id}>
                            <div data-aos='fade-up' data-aos-delay={`${(index + 1) * 100}`} className='movies-slider-container'>
                                <div className='movies-slider'>
                                    <div className='movies-slider-icons'>
                                        <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : movie.original_title !== undefined ? 'movie' : movie.name !== undefined ? 'tv' : 'movie'}&play=true`) }} className='play' />
                                        <button onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : movie.original_title !== undefined ? 'movie' : movie.name !== undefined ? 'tv' : 'movie'}`) }} className='info' />
                                    </div>
                                    <img onClick={() => { Router.push(`/content/${movie.id}?name=${movie.name !== undefined ? movie.name : movie.title}&type=${movie.media_type !== undefined ? movie.media_type : movie.original_title !== undefined ? 'movie' : movie.name !== undefined ? 'tv' : 'movie'}`) }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name !== undefined ? movie.name : movie.title} width={180} height={270} />
                                </div>
                            </div>
                        </SwiperSlide>
                        :
                        null
                ))}
            </Swiper>
        </div>
    )
}
export default HomeMoviesCarousel;