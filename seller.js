const http = require('http');
const url = require('url');

// ==================== CONFIG =====================
const YOUR_API_KEYS = ["GOKU"];
const TARGET_API = "https://upiinfo.great-site.net/api.php";
// =================================================

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const parsedUrl = url.parse(req.url, true);
    const { upi, key, api_key } = parsedUrl.query;

    // Parameter check
    if (!upi) {
        return res.end(JSON.stringify({ 
            error: 'Missing upi parameter',
            usage: '?upi=gauravyadav349@axl&key=GOKU'
        }));
    }

    // API key check
    const userKey = key || api_key;
    if (userKey && !YOUR_API_KEYS.includes(userKey)) {
        return res.end(JSON.stringify({ error: 'Invalid API key' }));
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`${TARGET_API}?key=suryanshXtoxic&upi=${encodeURIComponent(upi)}&i=1`);

        if (!response.ok) {
            throw new Error(`API failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Enhance response
        const finalData = {
            ...data,
            credit_by: "goku",
            developer: "@gokuuuu_1",
            powered_by: "Goku UPI Info API"
        };

        res.end(JSON.stringify(finalData));

    } catch (error) {
        res.end(JSON.stringify({
            error: 'Request failed',
            details: error.message,
            credit_by: "goku"
        }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Splexxo UPI Info API running on port ${PORT}`);
});