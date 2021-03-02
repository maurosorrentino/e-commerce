const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const busboy = require('connect-busboy');
const fs = require('fs');
const path = require('path');

const User = require('./models/user');
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

// handling image uploads with multer (declaring storage folder and file name)
/* const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'images/');

    },

    filename: (req, file, cb) => {

        cb(null, uuidv4() + "-" + file.originalname)

    }

});

// handling images with multer (filtering the images so that we accept certain types of images)
const fileFilter = (req, file, cb) => {

    // if images is one of these formats we store it into images folder otherwise we won't
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {

        cb(null, true);

    } else {

        cb(null, false);

    }

}; */

/* // finishing handling images with multer
app.use(multer({ storage, fileFilter }).single('image'));
 */

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
            maxAge: 3600000 * 24, // remember to change it!!!
            secure: false,

        }

    })

);

// any request that goes to /images so that we do not need to write the whole path when uploading the image
// app.use('/images', express.static(path.join(__dirname, 'images')));

// handling images upload
/* http.createServer((req, res) => {

    if(req.url === 'auth/sell') {

        const form = new formidable.IncomingForm();
        form.maxFieldsSize = 10 * 1024 * 1024; // maximum image size 10 mb

        form.parse(req, function (err, fields, files) {

            const oldPath = files.image.path;
            const newPath = 'C:/Users/sorre/OneDrive/Desktop/projects/e-commerce/backend/images' + files.image.name;

            fs.rename(oldPath, newPath, function (err) {

                if(err) {

                    res.status(404).json({ message: `image could not be upload. error: ${err}` });

                };

                res.setHeader('Content-Type', 'application/json');
                res.json({ fields, files, });

            });

        });

        return;

    } 

}); */

// able to parse json data application/json into headers
app.use(bodyParser.json());

// parsing the body (this line is needed for the sessions to work)
app.use(bodyParser.urlencoded({ extended: true }));

// handling images upload
app.use(busboy());

app.put('/auth/sell', function (req, res) {

    let fstream;

    req.pipe(req.busboy);

    req.busboy.on('image', function (fieldname, file, filename) {

        console.log('Uploading' + filename);
        fstream = fs.createWriteStream(__dirname + '/images/' + filename);

        file.pipe(fstream);

        fstream.on('close', function () {

            console.log('file uploaded');

        });

    });

});

// finding the user and if we do not find it we go to the next middleware
app.use((req, res, next) => {

    if(!req.session.user) {

        return next();

    }

    User.findById(req.session.user._id)

        .then(user => {

            if(!user) {

                next();

            }
            
            req.user = user;
            next();

        })

        .catch(err => {

            next(err);

        })

});

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