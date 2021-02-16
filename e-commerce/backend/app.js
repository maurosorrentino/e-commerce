const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');
const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');

const app = express();

const MONGODB_URL = 'mongodb+srv://mauro:Gliuccellivolano95!@cluster0.kyrqs.mongodb.net/shop';

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

// setting up database
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        
        app.listen(8090);

    })

    .catch(err => console.log("mongodb error: " + err));