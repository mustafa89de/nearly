const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const controller = require('./controller');  // imports /controller/index.js with all registered routes
const DBService = require("./services/DBService");
const Passport = require('./passport');
const PushService = require('./services/PushService');

app.use(express.json());

app.use('*', (req, res, next) => {
  if (req.hostname !== 'localhost' && !req.secure && req.get('x-forwarded-proto') !== 'https') {
    res.redirect("https://" + req.get('host') + req.url);
  } else {
    next();
  }
});

app.use('/api', controller); // Path chaining -> /api/...

app.use(express.static('dist'));

app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));


Passport.init();
PushService.init();
if (process.env.MODE !== 'TEST') {
  DBService.init();
  app.listen(PORT, () => {
    console.log(`Node app listening on port ${PORT}!`);
  });

}


module.exports = app;