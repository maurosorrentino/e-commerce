const User = require('../models/user');
const Item = require('../models/item');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup controller
exports.signup = async (req, res, next) => {

    try {
    
        // getting inputs of user
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const name = req.body.name;

        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        
        if(!email.match(emailRegex)) {

            res.status(422).json({ message: 'Invalid email' });

        }

        // checking if there is already an user with the same email
        const userExists = await User.findOne({ email });

        // if user already exists we throw an error
        if(userExists) {

            res.status(409).json({ message: `user ${email} already exists` });

        }

        // checking if the user wrote the password requested (double check so that we do not need to send a "change password" email)
        if(password !== confirmPassword) {

            res.status(403).json({ message: 'passwords do not match' });

        }

        if(name.length === 0) {

            res.status(422).json({ message: 'please enter your name' });

        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating user
        const user = new User({

            name,
            email,
            password: hashedPassword,
            isAdmin: false,

            cart: {

                items: []

            }

        });

        // saving user and sending a response
        const savedUser = await user.save();

        res.status(201).json({ message: 'user created', userId: savedUser._id.toString() });

    } catch (err) {

        console.log(err);

    }

};

// login controller
exports.login = async (req, res, next) => {

    try { 

        // getting inputs of the user
        const email = req.body.email;
        const password = req.body.password;

        // finding the account with the email provided
        const user = await User.findOne({ email });

        // if there is no account we throw an error
        if(!user) {

            res.status(404).json({ message: `There is no account into our database with this email: ${email}` });

        }

        // checking if the password matchees the one that we have into our database
        const isEqual = await bcrypt.compare(password, user.password);

        // if passwords do not match we throw an error
        if(!isEqual) {

            res.status(401).json({ message: 'invalid password, please try again' });

        }

        const userId = user._id.toString();

        const token = jwt.sign({

            email,
            userId,

        }, 'someSuperSecretIntoNode', { expiresIn: '24h' }); // remember to change it!!!

        // if password and email matches we will authenticate
        await User.findById(userId)

            .then(() => {
        
                req.session.isAuth = true;
                req.session.user = user;
                res.cookie('XSRF-TOKEN', token, { maxAge: 3600000 * 24, httpOnly: true, path: '/' }); // remember to change it!!!!
                
                // saving the session
                req.session.save(err => next(err));

            })

            .catch(err => next(err));

        res.status(200).json({ message: 'successful login' });

    } catch (err) {

        console.log(err);

    }

};

exports.createItem = async (req, res, next) => {

    try {

        // if user is not logged in we throw an error
        if(!req.session.isAuth) {

            res.status(401).json({ message: 'You cannot take this action, please login' });

        }

        // getting inputs of user
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const image = req.body.image; //.path.replace("\\", "/");
        // console.log(image)

        // getting the id of the user so that we can assign it to the item
        const userId = req.session.user._id;
 
        // if title is less than 3 characters we throw an error
        if(title.length < 3) {

            res.status(422).json({ message: 'Title needs to be at least 3 characters' });

        };

        // if description is less than 5 characters we throw an error
        if(description.length < 5) {

            res.status(422).json({ message: 'Description needs to be at least 5 characters' });

        };

        // if price is equal or less than 0 we throw an error
        if(price <= 0) {

            res.status(422).json({ message: 'Price cannot be less or equal to 0' });

        };
 
        if(!image) {
            
            return res.status(404).json({ message: 'you need to upload an image' });

        };  
 
        // if we pass all these steps (so there is no error) we create the item
        const item = new Item({

            title,
            description,
            price,
            image,
            userId,

        });

        // saving the file
        const itemSave = await item.save();

        res.status(200).json({ message: 'item was created', item: itemSave });


    } catch (err) {

        console.log(err);

    }

};