const express = require('express');
const ping = require('ping');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'HelpdeskDistributionList@1800contacts.com', //need to store credentials more securely
        pass: //need email password
    }
});


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
        const mailOptions = {
            from: 'nfrisbee@seekwell.com', // Replace with what "from" email we want
            to: 'helpdeskdistributionlist@1800contacts.com',
            subject: 'Ping Test Results for New Hire',
            text: `Ping results for user IP ${userIP}:\n\n${JSON.stringify(results, null, 2)}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            }
            console.log('Email sent:', info.response);
            res.json({ userIP, results });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ping IP addresses' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});