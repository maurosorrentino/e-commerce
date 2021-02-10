const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolver = require('./src/graphql/resolvers'); */

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

    /* // graphql does not accept options method
    if(req.method === 'OPTIONS') {

        return res.sendStatus(200);

    } */

    next();

});

app.use('/auth', authRoutes);

// authorization middleware
app.use(auth);

// creating express server that runs graphql api
/* app.use(

    '/graphql',
    graphqlHTTP({

        schema: graphqlSchema,
        rootValue: graphqlResolver,

        // this allows us to go into http://localhost:8080/graphql and have the tool in there
        graphiql: true,

        // customize errors
        customFormatErrorFn(err) {

            if(!err.originalError) {

                return err;

            }

            const data = err.originalError.data;
            const message = err.message || 'an error occured';
            const code = err.originalError.code || 500;

            return { message, data, status: code };

        }

    })

);  */

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

        User.findOne()

            .then(user => {

                if(!user) {

                    const user = new User({

                        name: 'mauro',
                        email: 'test@test.com',
                        password: 'tester',
                        isAdmin: true,
                        
                        cart: {

                            items: [],

                        } 

                    });

                    user.save();

                }

            })

            app.listen(8080);

    })

    .catch(err => console.log("mongodb error: " + err));