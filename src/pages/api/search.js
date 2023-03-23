const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const movie = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${req.query.name}&language=en-US&include_adult=false&with_networks=49`);
  if (!movie.ok) {
    console.error(movie.statusText);
    return res.status(500).json({ error: 'API error' });
  }

  const tv = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${req.query.name}&language=en-US&include_adult=false&with_networks=49`);
  if (!tv.ok) {
    return res.status(500).json({ error: 'API error' });
  }

  const moviesJSON = await movie.json();
  const tvJSON = await tv.json();

  return res.status(200).json([...moviesJSON.results, ...tvJSON.results])
}
