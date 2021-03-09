const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const MONGODB_URL = 'mongodb+srv://mauro:Gliuccellivolano95!@cluster0.kyrqs.mongodb.net/shop';

const app = express();

// setting up the sessions into the db
const store = new MongoDBStore({

    uri: MONGODB_URL,
    collection: 'session',

});

// I am declaring the server like this instead of app.listen because otherwise the tests won't work (I'm using supertest and also exporting the app into another file didn't work so 
// I came up with this solution (closing the port after each test))
const server = http.createServer(app);

// without this line we are not able to store the cookie
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// resave: false means that the session won't be saved in every requests but only if something will be changed in the session (using default true has been deprecated)
// saveUninitialized: false makes sure that the session won't be saved if nothing changes
app.use(

    session({

        resave: false,
        saveUninitialized: false,
        store,
        secret: 'SomeSuperSecretIntoNode',

        cookie: {

            httpOnly: true,
            maxAge: 3600000 * 24 * 365, // remember to change it!!!
            secure: false,

        }

    })

);

// able to parse json data application/json into headers
app.use(bodyParser.json());

// parsing the body 
app.use(bodyParser.urlencoded({ extended: true }));

// avoiding cors errors
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    next();

});

// shop routes
app.use(shopRoutes);
 
// auth routes
app.use('/auth', authRoutes);

// connecting to db
// DeprecationWarning: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    .then(() => {

        server.listen(8090);

    })

    .catch(err => console.log('mongo error: ' + err));

module.exports = app;
module.exports = server;