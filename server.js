

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const pipedApiEndpoints = [
    "https://pipedapi.adminforge.de",
    "https://pipedapi.reallyaweso.me",
    "https://api.piped.private.coffee",
    "https://api.piped.privacydev.net",
    "https://pipedapi.drgns.space",
    "https://pipedapi.darkness.services",
    "https://piped-api.lunar.icu",
    "https://pipedapi.r4fo.com",
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.leptons.xyz",
    "https://api.piped.yt",
    "https://pipedapi.phoenixthrush.com",
    "https://piped-api.codespace.cz",
    "https://pipedapi.ducks.party",
    "https://pipedapi-libre.kavin.rocks",
    "https://pipedapi.ngn.tf",
    "https://pipedapi.smnz.de",
    "https://pipedapi.nosebs.ru",
    "https://piapi.ggtyler.dev"
];

app.post('/getVideoInfo', async (req, res) => {
    const videoId = req.body.videoId;

    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required' });
    }

    const requests = pipedApiEndpoints.map(api => axios.get(`${api}/streams/${videoId}`, { timeout: 5000 }));

    try {
        const responses = await Promise.any(requests);

        if (responses.status === 200) {
            return res.json(responses.data);
        } else {
            return res.status(responses.status).json({ error: 'API returned an error', details: responses.data });
        }
    } catch (error) {
        console.error('Error making requests:', error.message);
        return res.status(500).json({ error: 'All API endpoints failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
