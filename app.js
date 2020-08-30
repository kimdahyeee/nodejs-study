var express = require('express');
var morgan = require('morgan')
var app = express();
const port = 3000;
var users = [
    { id: 1, name: 'alice' },
    { id: 2, name: 'bek' },
    { id: 3, name: 'chris' },
];

app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/users', function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
})

app.get('/user/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user);
})

app.delete('/user/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    users = users.filter((user) => user.id !== id);

    res.status(204).end();
})

app.post('/users', function (req, res) {
    const name = req.body.name;

    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length
    if (isConflict) return res.status(409).end();

    const id = Date.now();
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`connected ${port} port !`);
});

module.exports = app