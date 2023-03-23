import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Background from '@/components/Background';
import FilteredMovies from '@/components/FilteredMovies.jsx';
import { movieGenres, serieGenres } from '@/utils/genres';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import Footer from '@/components/Footer';

const GenreButtons = ({ genre, setNewFilteredMovies, setActiveBtn, activeBtn, filteredMovies }) => {
    return (
        <button
            className={activeBtn === genre.id ? 'btn-genre btn-genre--active' : 'btn-genre'}
            onClick={() => {
                setActiveBtn(genre.id);
                setNewFilteredMovies(filteredMovies?.filter(movie => movie.genre_ids.includes(genre.id)));
            }}
            key={genre.id}>{genre.name}
        </button>
    );
}

export default function CategoryScreen({ loading, filteredMovies, title }) {
    const router = useRouter();
    const [newFilteredMovies, setNewFilteredMovies] = useState(filteredMovies);
    const [activeBtn, setActiveBtn] = useState(0);

    useEffect(() => {
        setNewFilteredMovies(filteredMovies);
    }, [filteredMovies])

    return (
        <>
            <Header />
            <Background />
            {
                loading === false ?
                    <>
                        <div className='searches-related'>
                            <svg className='me-3 mt-1' fill='white' width="30px" height="30px" version="1.0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 48) scale(.1 -.1)">
                                    <path d="m47 392c-14-15-17-40-17-129 0-150-10-143 212-143 218 0 208-7 208 147 0 150 10 143-212 143-157 0-177-2-191-18zm368-127v-110h-175-175l-3 99c-1 55 0 106 2 113 4 11 41 13 178 11l173-3v-110z" />
                                    <path d="m200 265c0-30 2-55 5-55 16 0 95 46 95 55s-79 55-95 55c-3 0-5-25-5-55z" />
                                    <path d="m140 75c0-12 18-15 100-15s100 3 100 15-18 15-100 15-100-3-100-15z" />
                                </g>
                            </svg>
                            <p className='text-white'>{title}</p>
                        </div>

                        <Swiper
                            spaceBetween={20}
                            centeredSlides={false}
                            loop={false}
                            navigation={false}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                // pauseOnMouseEnter: true,
                            }}
                            speed={500}
                            modules={[Navigation, Autoplay]}
                            centerInsufficientSlides={false}
                            className="mySwiper mySwiper--category"
                            breakpoints={{
                                1: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                992: {
                                    slidesPerView: 5,
                                },
                                1440: {
                                    slidesPerView: 7,
                                },
                                1700: {
                                    slidesPerView: 7,
                                },
                            }}
                        >
                            <SwiperSlide>
                                <button className={activeBtn === 0 ? 'btn-genre btn-genre--active' : 'btn-genre'} onClick={() => { setNewFilteredMovies(filteredMovies); setActiveBtn(0) }}>All</button>
                            </SwiperSlide>
                            {
                                router?.asPath?.includes('movies') === true ?
                                    movieGenres?.map((genre) => (
                                        <SwiperSlide className="swiper-slide" key={genre.id}>
                                            <GenreButtons {...{ genre, filteredMovies, setNewFilteredMovies, setActiveBtn, activeBtn }} />
                                        </SwiperSlide>
                                    ))
                                    :
                                    router?.asPath?.includes('series') === true ?
                                        serieGenres?.map((genre) => (
                                            <SwiperSlide className="swiper-slide" key={genre.id}>
                                                <GenreButtons {...{ genre, filteredMovies, setNewFilteredMovies, setActiveBtn, activeBtn }} />
                                            </SwiperSlide>
                                        ))
                                        : null
                            }
                        </Swiper>

                        <FilteredMovies filteredMovies={newFilteredMovies} />
                        <Footer />
                    </>
                    :
                    null
            }
        </>
    )
}