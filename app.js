var express = require('express');
var morgan = require('morgan')
var app = express();
const port = 3000;
var users = [
    {id:1, name:'alice'},
    {id:2, name:'bek'},
    {id:3, name:'chris'},
];

app.use(morgan('dev'))

app.get('/users', function(req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, function() {
    console.log(`connected ${port} port !`);
});

module.exports = app