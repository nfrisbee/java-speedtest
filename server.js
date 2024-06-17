const express = require('express');
const ping = require('ping');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/ping', async (req, res) => {
    const { userIP, ipAddresses } = req.body;
    if (!userIP || !ipAddresses) {
        return res.status(400).json({ error: 'User IP address and IP addresses to ping are required' });
    }

    try {
        const results = [];
        for (const ip of ipAddresses) {
            const response = await ping.promise.probe(ip, { timeout: 10 });
            results.push(response);
        }
        res.json({
            userIP,
            results
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ping IP addresses' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});