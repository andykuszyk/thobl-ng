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
var thoughtSchema = new mongoose.Schema({
    text: 'string',
    left: 'number',
    top: 'number',
    size: 'number',
    width: 'number',
    height: 'number',
    parentId: mongoose.Schema.Types.ObjectId,
});
var lineSchema = new mongoose.Schema({
    x1: 'number',
    x2: 'number',
    y1: 'number',
    y2: 'number',
    thought1Id: mongoose.Schema.Types.ObjectId,
    thought2Id: mongoose.Schema.Types.ObjectId,
});

module.exports = {
    user: function() {
       return mongoose.model('user', userSchema);
    },
    thought: function() {
        return mongoose.model('thought', thoughtSchema);
    },
    line: function() {
        return mongoose.model('line', lineSchema);
    },
    createThought: function(json) {
        // todo: return model from json here.
    },
    toThoughtJson: function(model) {
        // todo: return json from model here.
    },
};

