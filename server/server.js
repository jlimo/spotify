const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());

aapp.post ('./login', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId:  'bf14bfb9cc244a3f99e7d027b077a331',
      clientSecret:  '3c53d32b3b9e48dc87f2ac3ceafd2de4',
       refreshToken,
    })

    spotifyApi.refreshAccessToken()
    .then((data) => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    }).catch(() => {
      res.sendStatus(400)
    })
})
    app.post ('./login', (req, res) => {
        const code = req.body.code
        const spotifyApi = new spotifyWebApi({
          redirectUri: 'http://localhost:3000',
          clientId:  '162a5fdfd17f4bce92ffe132f4aecdec',
          clientSecret:  'e264e238fed14a93a35cb29ecdc184ad',
           refreshToken
        })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)

