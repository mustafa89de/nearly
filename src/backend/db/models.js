const mongoose = require('mongoose');

// Collection Schemas
let userSchema = mongoose.Schema({
    username : {type: String, required: true},
    email : {type: String, requried: true},
    password: {type: String, required: true,},
    description: {type: String, required: false, default: "keine Beschreibung vorhanden"},
    creationDate : { type: Date, required: true, default: Date.now()}
});

let Models = module.exports = {
    user: mongoose.model('User', userSchema)
};