const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// agenda is used for background jobs
const Agenda = require('agenda');

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const Item = require('./models/item');
const User = require('./models/user');
const ItemAvailableAgainUser = require('./models/ItemAvailableAgainUser');

const { transport } = require('./mail/mail');

// secrets in .env file
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB; 

const app = express();

// serving static files when in production
if(process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname + '/../frontend/out')));
  
    app.get('/', (req, res) =>

        res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'index.html'))

    );

    app.get('**', (req, res) =>

        res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out'))

    );

  } else {

    app.get('/', (req, res) => {

      res.send('API is running....')

    })
  }

// defining the db where the agenda will be saved (background job)
// DeprecationWarning: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
const agenda = new Agenda({

    db: { 
        
        address: MONGODB_URL,

        options: {

            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
    
        },
    
    },
    
});

// defining what the agenda should do (send emails to all the users that clicked "email me when available again")
agenda.define('item_available_again_users', async (job) => {

    // finding from db all the users that want to know if an item is back on the store
    const itemAvailableAgainUser = await ItemAvailableAgainUser.find();
    
    // mapping these users
    itemAvailableAgainUser.map(async user => {
    
        // finding the item id, email and item from this collection
        const itemId = user.itemId;
        const userEmail = user.userEmail;
        const item = await Item.findById(itemId);
    
        if(item.stock > 0) {
    
            const link = `https://e-commerce-my-shop/view-item/${itemId}`;
    
            // finding the user with the email that we found in this collection so that we can put the name into the email
            const user = await User.findOne({ email: userEmail });
    
            // sending email
            await transport.sendMail({
    
                from: 'sorrentino.mauro95@gmail.com',
                to: userEmail,
                subject: `Item ${item.title} Is Back On Our Shop!`,
                html: `
                        
                    <h1>Hi ${user.name}</h1>
        
                    <p>The Item ${item.title} Is Back Again On Our Shop</p>
        
                    <p>Please Click The Link Below In Order To Buy It</p>
        
                    <a href="${link}">Click Here To Buy The Item!</a>
                        
                `,
        
            });

            // finding the id of this collection with the itemId so that we can delete it in order to don't send an email every 5 seconds
            const findInfo = await ItemAvailableAgainUser.find({ itemId });

            const itemAvailableAgainUserId = findInfo.map(findId => {

                return findId._id;

            });

            // deleting it so that we do not send duplicate emails to the users
            await ItemAvailableAgainUser.findByIdAndRemove(itemAvailableAgainUserId);
    
        };
    
    });

});

// starting the agenda and telling the computer to do it every 5 seconds
(async function() {

    await agenda.start();
    await agenda.every("5 seconds", "item_available_again_users")

})();

// setting up the sessions into the db
const store = new MongoDBStore({

    uri: MONGODB_URL,
    collection: 'session',

});

// I am declaring the server like this instead of app.listen because otherwise the tests won't work (I'm using supertest and also exporting the app into another file didn't work so 
// I came up with this solution (closing the port after each test))
const server = http.createServer(app);

// without this line we are not able to store the cookie
app.use(cors({ origin: `https://e-commerce-my-shop`, credentials: true }));

// resave: false means that the session won't be saved in every requests but only if something will be changed in the session (using default true has been deprecated)
// saveUninitialized: false makes sure that the session won't be saved if nothing changes
app.use(

    session({

        resave: false,
        saveUninitialized: false,
        store,
        secret: process.env.SESSION_SECRET,

        cookie: {

            httpOnly: true,
            maxAge: 3600000 * 24, 
            secure: false,

        },

    })

);

// able to parse json data application/json into headers
app.use(bodyParser.json());

// parsing cookies so that we can verify the value
app.use(cookieParser());

// parsing the body 
app.use(bodyParser.urlencoded({ extended: true }));

// avoiding cors errors
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Origin', `https://e-commerce-my-shop`);

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

        server.listen(process.env.PORT);
        console.log('connected to db');

    })

    .catch(err => console.log('mongo error: ' + err));

module.exports = app;
module.exports = server;