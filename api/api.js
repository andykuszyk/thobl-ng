const config = require('./config');
const mongo = require('./mongo');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('893216655393-43s8tkkak2nj01r9anm958hharqib468.apps.googleusercontent.com');

config.validate();

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

app.use('/api/*', async function (req, res, next) {
    var id = await verifyToken(req.get('Authorization'));
    req.id = id;
    if(id == null) {
        return res.status(401).send();
    }
    next();
});

app.post('/api/users', function(req, res) {
    let id = req.id;
    mongo.user().findOne({ id: id }, function (err, user) {
        if(user == null) {
            console.log('No user found for idToken, so creating a new one');
            var user = new mongo.user()({ id: id, created: Date.now(), lastLogin: Date.now() });
            user.save(function (err, u) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send();
                }
            });
        } else {
            user.lastLogin = Date.now();
            user.save(function (err, u) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send();
                }
            });
        }
    });
});

app.post('/api/thoughts', function(req, res) {
    mongo.thought().findById(req._id, function(error, thought) {
        if(thought == null) {
            console.log('Createing a new thought');
            let thought = mongo.createThought(req);
            thought.save(function(err, t) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send(toThoughtJson(t));
                }
            });
        } else {
            res.status(405).send('Thought already exists for that id, use PUT instead');
        }
    });
});

app.use(bodyParser.json());

app.use(express.static('dist/thoughtspace'));

app.listen(config.port(), () => console.log('Thobl running on port ' + config.port()));
