export default async function handler(req, res) {
  const url = new URL('https://clawn.ch/api/tokens');
  
  // Forward query params (offset, limit, etc.)
  const { searchParams } = new URL(req.url, 'http://localhost');
  searchParams.forEach((val, key) => url.searchParams.set(key, val));

  try {
    const response = await fetch(url.toString(), {
      headers: { 'User-Agent': 'DECTYCLAW/2.2' }
    });
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch tokens' });
  }
}
