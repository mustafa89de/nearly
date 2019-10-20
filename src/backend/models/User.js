const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, // TODO: somehow unique doesn't work yet
    username: {type: String, required: true},
    password: {type: String, required: true, select: false}, // TODO: maybe hide it in JSON
    description: {type: String, required: false, default: null}
});

module.exports = mongoose.model('User', userSchema);