const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8091;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const server = http.createServer((req, res) => {
    // Handle Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    const reqUrl = url.parse(req.url, true);

    // Proxy specifically for clawn.ch api
    if (reqUrl.pathname.startsWith('/api/')) {
        const targetUrl = 'https://clawn.ch' + req.url;
        
        console.log(`Proxying request to: ${targetUrl}`);

        https.get(targetUrl, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, {
                ...proxyRes.headers,
                ...corsHeaders
            });
            proxyRes.pipe(res);
        }).on('error', (err) => {
            console.error(`Proxy error: ${err.message}`);
            res.writeHead(500, corsHeaders);
            res.end(JSON.stringify({ error: err.message }));
        });
    } else {
        res.writeHead(404, corsHeaders);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`CORS Proxy running on http://localhost:${PORT}`);
    console.log(`Example: http://localhost:${PORT}/api/count`);
});
