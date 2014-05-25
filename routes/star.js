var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.get('/', function(req, res) {
    res.send('Error Url');
});

router.post('/', function(req, res) {
    var access_toekn = req.body.accessToken;
    var repo = req.body.repo;
    if (access_toekn && repo) {
        unirest.put('https://api.github.com/user/starred/' + repo + '?access_token=' + access_toekn)
            .header({
                'Accept': 'application/json',
                'User-Agent': 'All-Star'
            })
            .end(function(resp) {
                if (resp.status === 204) {
                    console.log('OK');
                    res.send('204');
                } else {
                    res.send('500');
                }
            });
    } else {
        console.log('error');
    }
});

module.exports = router;
