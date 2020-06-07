const express = require('express');
const router = express.Router();

// Load TODO model
const Todo = require('../models/todoSchema');

// TEST CONNECTION
router.get('/test', (req, res) => res.send('Route testing!'));

// GET ALL TODO Items
router.get('/', (req, res) => {
    Todo.find()
        .then(todo => res.json(todo))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// GET USER-SPECIFIC TODOS
router.get('/:user', (req, res) => {
    Todo.find({ user_id: req.params.user })
        .then(todo => res.json(todo))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
})

// GET ID SPECIFIC TODOS
router.get('/api/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
})

// GET ARCHIVED TODOS SPECIFIC TO USER
router.get('/archived/:user', (req, res) => {
    Todo.find({ status: {$eq: false}, $and: [{ user_id: req.params.user }] })
        .then(todo => res.json(todo))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
})

// GET LABEL SPECIFIC TODOS
router.get('/filter/:user/:label', (req, res) => {
    Todo.find({ label: req.params.label, $and: [{ user_id: req.params.user }] })
        .then(todo => res.json(todo))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
})

//ADD NEW TODO ITEM
router.post('/', (req, res) => {
    Todo.create(req.body)
        .then(todo => res.json({ msg: 'TODO added successfully' }))
        .catch(err => res.status(400).json({ error: err }));
});

//UPDATE TODO ITEM
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then(todo => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: err })
        );
});

//DELETE TODO ITEM
router.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body)
        .then(todo => res.json({ mgs: 'Todo item deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'Item does not exist' }));
});

module.exports = router;