const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const fetchData = async (type) => {
        try {
            const content = await fetch(`${BASE_URL}/${type}/${req.query.id}?api_key=${API_KEY}&append_to_response=videos&with_networks=49`);
            if (!content.ok) {
                return res.status(500).json({ error: "API Error" });
            }
            const contentJSON = await content.json();
            return res.status(200).json(contentJSON);
        }
        catch (error) {
            return res.status(500).json({ error: error }).end();
        }
    }

    switch (req.query.type) {
        case 'movie': return fetchData('movie');
        case 'tv': return fetchData('tv');
        default: return res.status(400).json({ error: "Invalid request" });
    }
}
