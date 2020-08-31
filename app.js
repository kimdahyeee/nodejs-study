var express = require('express');
var morgan = require('morgan')
var app = express();
var user = require('./api/user')
const port = 3000;

app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', user);

app.listen(port, function () {
    console.log(`connected ${port} port !`);
});

module.exports = app