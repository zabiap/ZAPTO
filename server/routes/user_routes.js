const secret = 'my_secret_key';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../models/user');


// TEST
router.get('/api/test', (req, res) => res.send('User route testing!'));

// GET ALL
router.get('/api', (req, res) => {
    users.find()
        .then(backendUsers => res.json(backendUsers))
        .catch(err => res.status(404).json({ error: 'No Users found' }));
});

// ADD NEW USER
router.post('/api', (req, res) => {
    users.create(req.body)
        .then(backendUsers => res.json({ msg: 'User added successfully' }))
        .catch(err => res.status(400).json({ error: err }));
});

// DELETE USER
router.delete('/api/:id', (req, res) => {
    users.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Userdeleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a book' }));
});

// SIGN IN AUTHENTICATE
router.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;
    users.findOne({ username }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { username };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    const user = username;
                    res.cookie('token', token, { httpOnly: true })
                        .cookie('user', username )
                        .sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;