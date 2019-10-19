const mongoose = require('mongoose');
const dbModels = require("./models");
const bcrypt = require('bcrypt');

var userController = (()=>{

    let createUser = function(username, email, password, description, callback){
        bcrypt.hash(password, 10,function (err, hash) {
            if (err) throw err;
            let newUser = {username: username,email: email, password: hash};
            if (description) newUser['description'] = description;
            new dbModels.user(newUser).save((err)=>{
                if (err) throw err;
                callback();
            })
        })
    }

    return {
        createUser: createUser
    }
})();

var Controller = module.exports =  {
    userController: userController
}