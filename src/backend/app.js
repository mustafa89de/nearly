const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const controller = require('./controller');  // imports /controller/index.js with all registered routes
const DBService = require("./services/DBService");
const Passport = require('./passport');

app.use(express.json());

app.use('*', (req, res) => {
  if (!req.secure) {
    console.log('Perform HTTPS redirect for: ' + req.headers.host + req.url);
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.use('/api', controller); // Path chaining -> /api/...

app.use(express.static('dist'));

app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));

Passport.init();
if (process.env.MODE !== 'TEST') {
  DBService.init();
  app.listen(PORT, () => {
    console.log(`Node app listening on port ${PORT}!`);
  });

}


module.exports = app;