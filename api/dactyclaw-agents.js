export default async function handler(req, res) {
    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/67c14caaad19ca34f80b24f1/latest';
    const JSONBIN_KEY = '$2a$10$jsDLVDSonos71rMkOkpSxu5Pll3LLRFr/VDhbh4ibbOPVFCwfkSjy';

    try {
        const response = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_KEY,
                'X-Bin-Meta': 'false'
            }
        });
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
        res.status(200).json({ record: data });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch agents' });
    }
}
