const path = require('path');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/api/hello', function (req, res) {
    res.json({ message: 'Hello Bean, Jonas, Mustafa and Tom!' });
});

app.use(express.static('dist'));
app.use('*', express.static(path.join(__dirname, '/../../dist/index.html')));

app.listen(PORT, function () {
    console.log(`Node app listening on port ${PORT}!`);
});