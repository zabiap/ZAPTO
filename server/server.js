const express = require('express');
const connectDB = require('./db/db');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = 'my_secret_key';

const port = process.env.PORT || 8080;

const todo = require('./routes/todo_route');

const users = require('./routes/user_routes');

const app = express();

const cookieParser = require("cookie-parser");

connectDB();

app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.use('/todo', todo);

app.use('/users', users);

app.get('/users/api/checkToken', function (req, res, next) {
    console.log('Cookies: ', req.cookies.token);

    const token = req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    }
    else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                console.log("User Authenticated");
                res.sendStatus(200);
                next();
            }
        });
    }
});

app.get('/users/api/clearCookie', function (req, res) {
    res.clearCookie('token').clearCookie('user').sendStatus(200);
});

app.listen(port, () => console.log(`Server running on port ${port}`));