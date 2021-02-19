const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http')

const User = require('./models/user');
const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');

const MONGODB_URL = 'mongodb+srv://mauro:Gliuccellivolano95!@cluster0.kyrqs.mongodb.net/shop';

const app = express();

// I am declaring the server like this instead of app.listen because otherwise the tests won't work
const server = http.createServer(app);

// able to parse json data application/json into headers
app.use(bodyParser.json());

// avoiding cors errors
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();

});

// auth routes
app.use('/auth', authRoutes);

// authorization middleware
app.use(auth);

// error middleware
app.use((error, req, res, next) => {

    console.log('error middleware: ' + error);

    const message = error.message;
    const status = error.statusCode || 500;
    const data = error.data;

    res.status(status).json({ message, data });

});

// connecting to db
// DeprecationWarning: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    .then(() => {

        server.listen(8090);

    })

    .catch(err => console.log('mongo error: ' + err));

module.exports = app;
module.exports = server;