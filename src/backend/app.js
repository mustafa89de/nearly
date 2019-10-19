const path = require('path');
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dbController = require('./db/controller');
const bcrypt = require('bcrypt');


// database preperation
let dbUsername = 'app_be';
let dbPassword= 'app_be';

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@mi-project-mongo-gfwbf.mongodb.net/miprojekt?retryWrites=true&w=majority`, {useNewUrlParser: true,  useUnifiedTopology: true })
let db = mongoose.connection;

db.once('open', () => {
    console.log('Verbindung mit MongoDB erfolgreich hergestellt');
});

db.on('error', function(err){
    console.log('err')
});

// end of dateabase prepartation

app.get('/api/hello', function (req, res) {
    res.json({ message: 'Hello Bean, Jonas, Mustafa and Tom!' });
});

// Endpoint for testing purposes only
app.use('/api/test', function(req, res){
    dbController.userController.createUser("testuser", "testmail@test.de", "123456", undefined,()=>{
        res.send('Neuer User wurde angelegt!');
    })
})
// End of testing Endpoint

app.use(express.static('dist'));
app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));



app.listen(PORT, function () {
    console.log(`Node app listening on port ${PORT}!`);
});