export default async function handler(req, res) {
    // Always append prices=1, sort=hot, and limit=10 to the request
    const url = new URL('https://clawn.ch/api/tokens?prices=1&sort=hot&limit=10');

    // Forward any other query params
    const { searchParams } = new URL(req.url, 'http://localhost');
    searchParams.forEach((val, key) => {
        if (key !== 'prices' && key !== 'sort' && key !== 'limit') {
            url.searchParams.set(key, val);
        }
    });

    try {
        const response = await fetch(url.toString(), {
            headers: { 'User-Agent': 'DECTYCLAW/2.2' }
        });
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch top tokens' });
    }
}
