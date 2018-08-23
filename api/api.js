const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('893216655393-43s8tkkak2nj01r9anm958hharqib468.apps.googleusercontent.com');

async function verifyToken(token) {
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '893216655393-43s8tkkak2nj01r9anm958hharqib468.apps.googleusercontent.com'
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        return userId;
    } catch(err) {
        console.log('An error occured trying to authenticate the user with google: ' + err);
        return null;
    }
};

app.use(async function (req, res, next) {
    var id = await verifyToken(req.get('Authorization'));
    if(id == null) {
        return res.status(401).send();
    }
    next();
});

app.use(bodyParser.json());

app.use(express.static('dist/thoughtspace'));

var port = process.argv[2];
app.listen(port, () => console.log('Thobl running on port ' + port));
