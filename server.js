const express = require('express');
const ping = require('ping');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/ping', async (req, res) => {
    const { ip } = req.body;
    if (!ip) {
        return res.status(400).json({ error: 'IP address is required' });
    }

    try {
        const response1 = await ping.promise.probe(ip, { timeout: 10 });
        const response2 = await ping.promise.probe(ip, { timeout: 10 });
        res.json({
            ip,
            results: [response1, response2]
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ping IP address' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});