require('dotenv').config();
const configure = require('./configure/config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressRequestMock = require('express-request-mock');

const server = require('../app');
const authController = require('../controllers/auth');
const User = require('../models/user');

describe('add to cart', () => {
    beforeEach(async (done) => {
        // without the following lines we will get errors like this one and others similar 
        // error: MongooseError: Operation `users.findOneAndDelete()` buffering timed out after 10000ms
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('some decoded token');
        done();
    });

    // this is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach(async (done) => {
        await server.close();
        done();
    });

    it('adds item in cart', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,
    
                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },
    
                params: {
                    itemId: '60925e8b1db4b6a6ebd2ad9e',
                }
            };
    
            // mocking the res
            const { res } = await expressRequestMock(authController.addToCart, decorators);

            // finding the user so that we can check his cart
            const user = await User.findById(decorators.session.user._id);
            const userCart = user.cart.items;
    
            expect(res.statusCode).toBe(200);

            // checking by length of objects
            expect(userCart.length).toBe(1);
            
            // checking by quantity of item
            userCart.map(item => {
                expect(item.quantity).toBe(1);
            })

            // these lines are needed so that we can empty the cart of the user so that every time we run the test it will pass instead of failing
            user.cart.items = [];
            await user.save();
            done();
        
        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});