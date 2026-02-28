export default async function handler(req, res) {
    const BIN_ID = '69a2ff58d0ea881f40e21084';
    const API_KEY = '$2a$10$52cNICm.70qXCx0qkKBG5erLYGg1HMceR1gT4OOPOe5uzCiAJShOG';
    const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

    try {
        const response = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': API_KEY,
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
