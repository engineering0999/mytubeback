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
    "https://api.piped.privacydev.net",
    "https://pipedapi.reallyaweso.me",
    "https://pipedapi.adminforge.de",
    "https://pipedapi.kavin.rocks",
    "https://pipedapi-libre.kavin.rocks",
    "https://pipedapi.r4fo.com",
    "https://pipedapi.smnz.de",
    "https://pipedapi.nosebs.ru",
    "https://piped-api.lunar.icu",
    "https://pipedapi.leptons.xyz",
    "https://pipedapi.darkness.services",
    "https://pipedapi.phoenixthrush.com",
    "https://piped-api.codespace.cz",
    "https://pipedapi.ducks.party",
    "https://pipedapi.ngn.tf",
    "https://pipedapi.drgns.space",
    "https://piapi.ggtyler.dev"
];

app.post('/getVideoInfo', async (req, res) => {
    const videoId = req.body.videoId;

    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required' });
    }

    const requests = pipedApiEndpoints.map(api => axios.get(`${api}/streams/${videoId}`));

    try {
        const responses = await Promise.allSettled(requests);

        for (const response of responses) {
            if (response.status === 'fulfilled' && response.value.status === 200) {
                return res.json(response.value.data);
            }
        }

        return res.status(500).json({ error: 'All API endpoints failed' });
    } catch (error) {
        console.error('Error making requests:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
