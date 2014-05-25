var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.post('/', function(req, res) {
    unirest.post('https://github.com/login/oauth/access_token')
        .headers({
            'Accept': 'application/json'
        })
        .send({
            'client_id': '#Your client id',
            'client_secret': '#Your client secret',
            code: req.body.code
        })
        .end(function(response) {
            if (response.body.access_token) {
                res.send(response.body.access_token);
            }
        });
});

module.exports = router;
