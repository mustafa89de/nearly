const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const controller = require('./controller');  // imports /controller/index.js with all registered routes
const DBService = require("./services/DBService");

DBService.init();

app.use('/api', controller); // Path chaining -> /api/...

app.use(express.static('dist'));
app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));

app.listen(PORT, function () {
    console.log(`Node app listening on port ${PORT}!`);
});