const mongoose = require('mongoose');
const config = require('./config');

var mongoUser = config.mongoUser();
var mongoPassword = config.mongoPassword();
mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@ds119160.mlab.com:19160/thobl`);
var userSchema = new mongoose.Schema({
    id: { type: 'string', index: true },
    created: 'date',
    lastLogin: 'date'
});

module.exports = {
    user: function() {
       return mongoose.model('user', userSchema);
    },
};

