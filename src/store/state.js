import { create } from 'zustand';

export const useSearchStore = create((set, get) => ({
    search: '',
    filteredMovies:[],
    genre: '',
    ID:'',
    sendSearch: async (search) => {
        set(state => ({ search: search }));
        try {
            const response = await fetch(`/api/search?name=${search.search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const movies = await response.json();
            set(state => ({ filteredMovies: movies }));
        }
        catch (err) {
            console.error(err);
        }
    },
    sendGenre: async (genre) => {
        set(state => ({ genre: genre }));
        try {
            const response = await fetch(`/api/genre?type=${genre.genre}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const genreResponse = await response.json();
            set(state => ({ filteredMovies: genreResponse }));
        }
        catch (err) {
            console.error(err);
        }
    },
    sendFilteredContent: async (filteredMovies) => {
        set(state => ({ filteredMovies: filteredMovies }));
    },
}))