const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    if (req.query.type === 'movies') {
        const movie = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_networks=49`);
        if (!movie.ok) {
            console.error(movie.statusText);
            return res.status(500).json({ error: 'API error' });
        }
        const moviesJSON = await movie.json();
        return res.status(200).json(moviesJSON.results);
    }

    else if (req.query.type === 'series') {
        const serie = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_networks=49`);
        if (!serie.ok) {
            console.error(serie.statusText);
            return res.status(500).json({ error: 'API error' });
        }
        const tvJSON = await serie.json();
        return res.status(200).json(tvJSON.results);
    }

    else {
        return res.status(500).json({ error: 'Error' });
    }
}
