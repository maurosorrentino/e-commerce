const User = require('../models/user');
const Item = require('../models/item');
const Order = require('../models/order');

require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// signup controller
exports.signup = async (req, res) => {

    try {
    
        // getting inputs of user
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const name = req.body.name;

        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        
        // checking if email is valid with regex
        if(!email.match(emailRegex)) {

            return res.status(422).json({ message: 'Invalid email' });

        }

        // checking if there is already an user with the same email
        const userExists = await User.findOne({ email });

        // if user already exists we throw an error
        if(userExists) {

            return res.status(409).json({ message: `user ${email} already exists` });

        }

        // checking if the name is empty
        if(name.length === 0) {

            return res.status(422).json({ message: 'please enter your name' });

        }

        // checking if password is too short
        if(password.length < 5) {

            return res.status(422).json({ message: 'password needs to be at least 5 characters' });

        }

        // checking if the user wrote the password requested (double check so that we do not need to send a "change password" email)
        if(password !== confirmPassword) {

            return res.status(403).json({ message: 'passwords do not match' });

        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating user with hashed password into the db
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

        return res.status(201).json({ message: 'user created, please click on "my shop" above and log in', user: savedUser });

    } catch (err) {

        console.log(err);
        
        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

    }

};

// login controller
exports.login = async (req, res) => {

    try { 

        // getting inputs of the user
        const email = req.body.email;
        const password = req.body.password;

        // finding the account with the email provided
        const user = await User.findOne({ email });

        // if there is no account we throw an error
        if(!user) {

            return res.status(404).json({ message: `There is no account into our database with this email: ${email}` });

        }

        // checking if the password matches the one that we have into our database
        const isEqual = await bcrypt.compare(password, user.password);

        // if passwords do not match we throw an error
        if(!isEqual) {

            return res.status(401).json({ message: 'invalid password, please try again' });

        }

        const userId = user._id.toString();

        // signing a token
        const token = jwt.sign({

            email,
            userId,

        }, process.env.TOKEN_SECRET, { expiresIn: '8760h' }); // remember to change it!!!

        // for navigation on the client side (I use the httpOnly false cookie for authentication)
        const weakToken = jwt.sign({}, process.env.WEAK_TOKEN_SECRET, { expiresIn: '8760h' }); // change it!!!

        // if password and email matches we will authenticate by creating a session and storing the tokens into the cookies
        await User.findById(userId)

            .then(() => {
        
                // assigning into the session isAuth for auth purposes and all the info of the user
                req.session.isAuth = true;
                req.session.user = user;

                // token into cookie
                res.cookie('token', token, { maxAge: 3600000 * 24 * 365, httpOnly: true, path: '/' }); // remember to change it!!!!
                
                // navigation on the client side
                res.cookie('authCookie', weakToken, {maxAge: 3600000 * 24 * 365, httpOnly: false, path: '/' }); // change it!!!

                // saving the session
                req.session.save(err => console.log(err));

            })

            .catch(err => console.log(err));

        return res.status(200).json({ message: 'Successful Login, You Are Being Redirected To Our Shop' });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

    }

};

exports.createItem = async (req, res) => {

    try {

        // if user has no session we throw an error
        if(!req.session.isAuth) {

            return res.status(401).json({ message: 'You cannot take this action, please login' });

        }

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);

        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // getting inputs of user
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const image = req.body.image;

        // getting the id of the user so that we can assign it to the item
        const userId = req.session.user._id;
 
        // if title is less than 3 characters we throw an error
        if(title.length < 3) {

            return res.status(422).json({ message: 'Title needs to be at least 3 characters' });

        };

        // if price is equal or less than 0 we throw an error
        if(price <= 0) {

            return res.status(422).json({ message: 'Price cannot be less or equal than 0' });

        };
 
        // if there is no image we throw an error
        if(!image) {
            
            return res.status(404).json({ message: 'you need to upload an image' });

        };  

        // if description is less than 5 characters we throw an error
        if(description.length < 5) {

            return res.status(422).json({ message: 'Description needs to be at least 5 characters' });

        };
 
        // if we pass all these steps (so there is no error) we create the item into the db
        const item = new Item({

            title,
            description,
            price,
            image,
            userId,

        });

        // saving the item and sending res
        const itemSave = await item.save();

        return res.status(200).json({ message: `item ${title} was created`, item: itemSave });


    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;
            console.log(err);

        }

    }

};

exports.logout = (req, res) => {

    try {
        
        // deleting session
        req.session.destroy();

        // deleting cookies with tokens and cookie session
        res.status(200).clearCookie('connect.sid');
        res.status(200).clearCookie('token');
        res.status(200).clearCookie('authCookie');

        // redirecting to login page
        return res.status(200).redirect('/auth/login');

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }
        
    }

};

exports.addToCart = async (req, res) => {

    try {

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);
        
        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // no session no add to cart
        if(!req.session.isAuth) {

            res.status(401).json();

        }

        // getting the user id from the session so that we can find this user
        const userId = req.session.user._id;

        // finding the user
        const user = await User.findById(userId);

        // getting the product id so that we can use it in order to find it
        const itemId = req.params.itemId;

        // finding the item
        const item = await Item.findById(itemId);
                
        // just declaring the cart into a variable for better readability
        const cart = user.cart.items;

        // declaring the quantity to 1 as default
        let quantity = 1;

        // finding the index of the item present into the cart by comparing the ids of the items so that if we have -1 it means that the item is not into the cart
        const itemIndex = cart.findIndex(i => {

            // 1st id is the item id present into the cart and the 2nd the id of the item that is "clicked"
            return i.itemId.toString() === item._id.toString();

        });

        // so if item is present into the cart
        if(itemIndex >= 0) {

            // adding 1 to the quantity of that item
            const itemQuantity = cart[itemIndex].quantity + 1;

            // declaring new quantity and saving the user data
            cart[itemIndex].quantity = itemQuantity;
            return await user.save();

        } else {

            // if item is not into the cart we push a new one
            await cart.push({

                itemId: item._id,
                title: item.title,
                price: item.price,
                quantity,

            });

            await user.save();

        } 

        res.status(200).json();
        
    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.cartPage = async (req, res) => {

    try {

        // if user has no session we throw an error (it will appear )
        if(!req.session.isAuth) {

            return res.status(401).json();

        }

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);

        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // getting the id of the user from the session and finding the user
        const userId = req.session.user._id;
        const user = await User.findById(userId);

        // getting the user email so that we can pass it on the stripe component on the client side
        const email = user.email;

        // declaring the items into a variable for better readability
        const items = user.cart.items;

        // we will push all the prices of all items (price * quantity) into this empty array and then add them into a single amount
        const amount = [];

        // mapping the items so that we can push the prices (price * quantity) of every items into the empty array
        items.map(item => {

            const price = item.price * item.quantity;
            amount.push(price);

        });

        // declaring the reducer so that we can use the reduce function
        const reducer = (a, b) => a + b;

        // declaring the total with the reduce function (so we add the total of every item)
        const total = amount.reduce(reducer, 0);

        // saving the total into the db
        user.cart.total = total;
        await user.save();

        return res.status(200).json({ message: 'fetched items', items, email, total });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.removeFromCart = async (req, res) => {

    try {

        // no session no remove from cart
        if(!req.session.isAuth) {

            res.status(401).json();

        }

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);
        
        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // getting user id and finding the user
        const userId = req.session.user._id;
        const user = await User.findById(userId);

        // declaring items into cart into a variable for better readability
        const cart = user.cart.items;

        // getting item id and finding the item
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);

        // getting the index of the item so that we can find it into the cart
        const itemIndex = cart.findIndex(i => {

            return i.itemId.toString() === item._id.toString();

        });

        // if item exists into cart we remove 1 from the quantity
        if(itemIndex >= 0) {

            const newQuantity = cart[itemIndex].quantity - 1;
            cart[itemIndex].quantity = newQuantity;

            // item quantity in a variable for better readability
            const itemQuantity = cart[itemIndex].quantity;

            // once the quantity goes down of 1 we redirect to the same page so that the user can actually see the changes
            res.status(200).redirect('/auth/cart');

            // if quantity goes to 0 we remove the item from the cart by filtering with the ids
            if(itemQuantity === 0) {

                // here we are telling the computer to return all the items apart of the one that we want to remove
                const updatedCart = cart.filter(i => {

                    return i.itemId.toString() !== item._id.toString();

                });

                // updating the cart with "new" items and saving the user data
                user.cart.items = updatedCart;
                return await user.save();

            }

            return await user.save();

        }

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.myItems = async (req, res) => {

    try {

        // getting the id of the user so that we can find all the items that were created by this user
        const userId = req.session.user._id;
        const items = await Item.find({ userId });

        return res.status(200).json({ message: 'fetched items', items });
        
        
    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.editItem = async (req, res) => {

    try {

        // if user has no session we throw an error
        if(!req.session.isAuth) {

            return res.status(401).json({ message: 'You cannot take this action, please login' });

        }

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);

        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // getting inputs of the user
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const image = req.body.image;

        // getting item id and finding it
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);

        // if title is less than 3 characters we throw an error
        if(title.length < 3) {

            return res.status(422).json({ message: 'Title needs to be at least 3 characters' });

        };

        // if price is equal or less than 0 we throw an error
        if(price <= 0) {

            return res.status(422).json({ message: 'Price cannot be less or equal than 0' });

        };

        // if description is less than 5 characters we throw an error
        if(description.length < 5) {

            return res.status(422).json({ message: 'Description needs to be at least 5 characters' });

        };

        // updating the item, saving it and sending a response 
        item.title = title;
        item.description = description;
        item.price = price;
        item.image = image;

        await item.save();

        return res.status(200).json({ message: `Item ${item.title} Was Edited` });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.removeItem = async (req, res) => {

    try {

        // if user has no session we throw an error
        if(!req.session.isAuth) {

            return res.status(401).json({ message: 'You cannot take this action, please login' });

        }

        // verifying token from httpOnly true cookie
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET);

        // verifying weak token (httpOnly: false)
        const weakToken = req.cookies.authCookie;
        jwt.verify(weakToken, process.env.WEAK_TOKEN_SECRET);

        // getting the id of the item, finding it, deleting it and sending a res with 200 status code
        const itemId = req.params.itemId;
        await Item.findByIdAndDelete(itemId);
        return res.status(200).json();

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.checkout = async (req, res) => {

    try {

        // finding userId so that we can find the user and get the items that there are into the cart + the email so that the user doesn't have to write it manually
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        const email = user.email;
        const cart = user.cart.items;

        const session = await stripe.checkout.sessions.create({

            customer_email: email,

            payment_method_types: ['card'],

            shipping_address_collection: {

                allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 
                    'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 
                    'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 
                    'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 
                    'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 
                    'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 
                    'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 
                    'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 
                    'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 
                    'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ'],

            },

            line_items: [

                {

                    price_data: {

                        currency: 'eur',
                        
                        product_data: {

                            name: `You Are Buying: ${cart.map(item => {

                                return item.title;

                            })}`,

                        },

                        unit_amount: user.cart.total.toFixed(2) * 100,

                    },

                    quantity: 1,

                },

            ],

            mode: 'payment',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/auth/success',
            cancel_url: 'http://localhost:3000/auth/cancel',

        });

        res.json({ id: session.id });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};

exports.success = async (req, res) => {

    try {

        // finding the user and sending the name into the success page 
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        const userName = user.name;

        // saving total into order model into db
        const total = user.cart.total;

        const items = user.cart.items.map(item => {

            return ({

                title: item.title,
                price: item.price,
                quantity: item.quantity,
                itemId: item.itemId,

            })

        })

        // creating order
        const order = new Order({

            items,
            total,
            userId,

        });

        await order.save();

        // empty user cart 
        user.cart.items = [];
        await user.save();

        return res.status(200).json({ message: 'success', userName });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

}

exports.orders = async (req, res) => {

    try {

        // finding the user id so that we can fetch all the orders with the given id
        const userId = req.session.user._id;
        const orders = await Order.find({ userId });

        return res.status(200).json({ message: 'fetched orders', orders });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

}