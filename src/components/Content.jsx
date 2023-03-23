import React, { useEffect, useState } from "react";
import { movieGenres, serieGenres } from "@/utils/genres";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Player from "./ModalPlayer";

const Content = ({ content }) => {
    const router = useRouter();
    const [modalSelect, setModalSelect] = useState(false);
    const trailer = content?.videos?.results?.find(obj => obj.type.toLowerCase().includes("trailer"));

    const genreNames = content?.genre_ids?.map(genreId => {
        const genreMovies = movieGenres?.find(g => g.id === genreId);
        const genreSeries = serieGenres?.find(g => g.id === genreId);
        return genreMovies ? `${genreMovies.name} | ` : genreSeries ? `${genreSeries.name} | ` : 'Unknown |';
    })
    if (genreNames !== undefined) { genreNames[genreNames?.length - 1] = genreNames[genreNames?.length - 1]?.replace("|", ""); }

    const genreNamesAfterReload = content?.genres?.map(genreId => {
        const genreMovies = movieGenres?.find(g => g.id === genreId?.id);
        const genreSeries = serieGenres?.find(g => g.id === genreId?.id);
        return genreMovies ? `${genreMovies.name} | ` : genreSeries ? `${genreSeries.name} | ` : 'Unknown |';
    });
    if (genreNamesAfterReload !== undefined) { genreNamesAfterReload[genreNamesAfterReload?.length - 1] = genreNamesAfterReload[genreNamesAfterReload?.length - 1]?.replace("|", ""); }

    useEffect(() => {
        if (router?.asPath?.includes('play=true') === true) {
            setModalSelect(true)
        }
    }, []);

    return (
        <>
            {content !== undefined ?
                <>
                    <span className='back' onClick={() => history.back()}>
                        <svg className='me-2' width="6" height="10" viewBox="0 0 6 10" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M0.226826 4.13752L4.28564 0.214945C4.48139 0.025762 4.79343 0.0310873 4.98259 0.226839L5.4401 0.700232C5.62896 0.89565 5.62401 1.20706 5.42904 1.39638L2.2121 4.51999L5.32058 7.75154C5.50898 7.9474 5.50329 8.2588 5.30788 8.44766L4.83448 8.90516C4.63873 9.09434 4.32669 9.08902 4.13753 8.89327L0.214931 4.8345C0.0257689 4.63874 0.0310943 4.32671 0.226826 4.13752Z"></path></svg>
                        VOLVER
                    </span>
                    <div className="content">
                        <div className="content__background">
                            <div className='carousel-layer' />
                            <img src={content?.backdrop_path !== null ? `https://image.tmdb.org/t/p/w1280/${content?.backdrop_path}` : `https://image.tmdb.org/t/p/w1280/${content?.poster_path}`} />
                            <div className="content__text">
                                <h3>{content?.name !== undefined ? content?.name : content?.title}</h3>

                                <h4>{genreNamesAfterReload !== undefined ? genreNamesAfterReload?.map((genreName, index) => <span key={index}>{genreName}</span>) : genreNames?.map((genreName, index) => <span key={index}>{genreName}</span>)}</h4>

                                {content?.vote_average ?
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="84" viewBox="0 0 82 84" fill="none">
                                            <path d="M73.2228 11.4872C75.6269 10.853 77.7147 13.2507 76.756 15.5447L67.5937 37.469C67.2134 38.3792 67.3047 39.4182 67.8381 40.248L80.6936 60.2473C82.0377 62.3385 80.4013 65.0633 77.9238 64.8594L54.2482 62.9103C53.2637 62.8292 52.3024 63.238 51.6778 64.0033L36.658 82.4066C35.0857 84.3331 31.9868 83.6202 31.4144 81.2003L25.944 58.0747C25.7166 57.1136 25.0307 56.3259 24.11 55.9686L1.95624 47.3702C-0.36195 46.4705 -0.641954 43.303 1.48244 42.0105L21.7762 29.6639C22.6201 29.1505 23.1572 28.2545 23.2123 27.2683L24.5372 3.54955C24.6758 1.06753 27.5998 -0.17866 29.4863 1.44027L47.528 16.9236C48.2766 17.566 49.2931 17.7994 50.2469 17.5478L73.2228 11.4872Z" fill="url(#paint0_linear_431_2)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_431_2" x1="79.0995" y1="9.93704" x2="14.5512" y2="66.1436" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#984BED" />
                                                    <stop offset="1" stopColor="#5551C1" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        {content.vote_average.toFixed(1)}
                                    </span>
                                    :
                                    null
                                }

                                {
                                    (content?.videos?.results?.length > 0 && trailer) ?
                                        <button onClick={() => setModalSelect(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                            Watch Now
                                        </button>
                                        : null
                                }

                                <h6>{content?.overview ? 'Synopsis' : ''}</h6>
                                <p>{content?.overview}</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
                :
                null
            }

            {/* PLAYER */}
            <Player show={modalSelect} onHide={() => setModalSelect(false)} trailer={(content?.videos?.results?.length > 0 && trailer) ? trailer : undefined} />
        </>
    );
}

export default Content;