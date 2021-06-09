require('dotenv').config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressRequestMock = require('express-request-mock');

const server = require('../app');

const authController = require('../controllers/auth');
const Item = require('../models/item');

describe('create item', () => {
    // without the following lines we will get errors like this one and others similar 
    // error: MongooseError: Operation `users.findOneAndDelete()` buffering timed out after 10000ms
    beforeEach(async (done) => {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

        // these lines are needed in order to mock the verify token function
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('some decoded token');
        done();
    });

    // this is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach(async (done) => {
        await server.close(); 
        done();
    });

    // validation: { title.length >= 3, description.length >= 5, price > 0, image required, price > 0, stock > 0 }
    it('creates an item if all the inputs are correct', async (done) => {
        try {
            const decorators = { 
                session: { 
                    isAuth: true,

                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },

                body: {
                    title: 'test',
                    description: 'testing',
                    image: 'fake image path',
                    price: 10,
                    stock: 1,
                }
            };

            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(200);

            // these lines are needed so that we can delete the item created after that the test passes
            const item = await Item.findOne({ image: 'fake image path' });
            const itemId = item._id;
            await Item.findByIdAndDelete(itemId);
            done();

        } catch (err) {
            console.log(err);
            done(err);
        }
    });
    // validation: { title.length >= 3, description.length >= 5, price > 0, image required, price > 0, stock > 0 }
    it('gives a status code of 422 if title validation fails', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,

                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },

                body: {
                    title: '',
                    description: 'testing',
                    image: 'fake image path',
                    price: 10,
                    stock: 1,
                }
            };

            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(422);
            done();

        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    it('gives a status code of 422 if description validation fails', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,
    
                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },
    
                body: {
                    title: 'test',
                    description: '',
                    image: 'fake image path',
                    price: 10,
                    stock: 1,
                }                
            }
    
            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(422);
            done();
            
        } catch(err) {
            console.log(err);
            done(err);
        };        
    });

    it('gives a status code of 404 if image is not found', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,

                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },

                body: {
                    title: 'test',
                    description: 'testing',
                    image: undefined,
                    price: 10,
                    stock: 1,
                }
            };

            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(404);
            done();

        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    it('gives a status code of 422 if price validation fails', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,

                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },

                body: {
                    title: 'test',
                    description: 'testing',
                    image: 'fake image path',
                    price: 0,
                    stock: 1,
                }
            };

            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(422);
            done();

        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    it('gives status code of 422 if stock validation fails', async (done) => {
        try {
            const decorators = {
                session: {
                    isAuth: true,
                    
                    user: {
                        _id: '6086e277592392136aeb1979',
                    }
                },

                body: {
                    title: 'test',
                    description: 'testing',
                    image: 'fake image path',
                    price: 10,
                    stock: 0,
                }
            };

            const { res } = await expressRequestMock(authController.createItem, decorators);
            expect(res.statusCode).toBe(422);
            done();

        } catch (err) {
            console.log(err);
            done(err);
        }
    })

    // without these lines we will get "You are trying to `import` a file after the Jest environment has been torn down"
    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    })
});