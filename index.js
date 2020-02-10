// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const dbInfo = req.body;

    if(dbInfo.name === undefined || dbInfo.bio === undefined){
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
    } else {
        db
            .insert(dbInfo)
            .then(created => {
                res.status(201).json(created);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' });
            })
    }
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
        })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db
        .findById(id)
        .then(db => {
           if(db === undefined){
               res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
           } else {
               res.status(200).json(db)
           }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
        })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));