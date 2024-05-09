const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
require('dotenv').config();


app.get('/get-user-info', async (req, res) => {
    const code = req.query.code;
    const scope = "academy-records%20chinese-name";
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        const tokenResponse = await axios.post('https://portal.ncu.edu.tw/oauth2/token', `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&scope=${scope}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${clientID}: ${clientSecret}`).toString('base64'),
                'Accept': 'application/json',
            }
        })
        console.log(tokenResponse)

        console.log("token:" + tokenResponse.data.access_token)

        const userInfoResponse = await axios.get('https://portal.ncu.edu.tw/apis/oauth/v1/info', {
            headers: {
                'Authorization': `Bearer ${tokenResponse.data.access_token}`
            }
        });

        const jsonString = JSON.stringify(userInfoResponse.data);
        console.log("user info:" + jsonString)

        res.json(userInfoResponse.data);


    } catch (error) {
        console.log(error)
        if (error.response) {
            return res.status(error.response.status).json({ error: error.message });
        } else if (error.request) {
            return res.status(500).json({ error: 'No response from server' });
        } else {
            return res.status(500).json({ error: 'Error setting up request' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
