const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post ('./login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId:  'bf14bfb9cc244a3f99e7d027b077a331',
      clientSecret:  '3c53d32b3b9e48dc87f2ac3ceafd2de4'
    })
})

