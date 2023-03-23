import React from 'react';
import FilteredMovies from '@/components/FilteredMovies.jsx';
import Footer from '@/components/Footer';
import Background from '@/components/Background';

const SearchLoader = ({ loading }) => {
    return (
        <>
            {
                loading === true ?
                    <div id="loader" className="d-flex justify-content-center">
                        <div class="loader-container">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}

const SearchScreen = ({ loading, filteredMovies, name }) => {
    return (
        <>
            <SearchLoader loading={loading} />
            {
                loading === false ?
                    <>
                        <div className='searches-related'>
                            <svg style={filteredMovies?.length === 0 ? { display: 'none' } : { display: 'initial' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search me-2 me-lg-3 mt-lg-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            <p style={filteredMovies?.length === 0 ? { position: 'absolute', top: '30vh' } : null} className='text-white related'>{filteredMovies?.length > 0 ? `Searches related to:  ${name}` : ``}</p>
                        </div>
                        <div className='min-height-search'>
                            <FilteredMovies filteredMovies={filteredMovies} />
                        </div>
                        <Footer />
                    </>
                    :
                    <Background />
            }
        </>
    )
}

export default SearchScreen;