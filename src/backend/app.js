const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 8080;
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

const controller = require('./controller');  // imports /controller/index.js with all registered routes
const DBService = require("./services/DBService");
const Passport = require('./passport');

app.use(express.json());

app.use('/api', controller); // Path chaining -> /api/...

app.use(express.static('dist'));

app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));

app.use('*', (req, res) => {
  res.redirect("https://" + req.headers.host + req.url);
});

Passport.init();
if (process.env.MODE !== 'TEST') {
  DBService.init();
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Node app listening on port ${PORT}!`);
  });

}


module.exports = app;