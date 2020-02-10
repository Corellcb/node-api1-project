// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' });
        })
})

server.post('api/users', (req, res) => {
    const dbInfo = req.body;

    db
        .insert(dbInfo)
        .then(db => {
            res.status(201).json(db);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' });
        })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));