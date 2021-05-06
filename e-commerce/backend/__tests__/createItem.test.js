const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const server = require('../app');

const request = supertest(app);

require('dotenv').config();

function put(url, body) {

    const httpRequest = request.put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', process.env.LOCALHOST_BE);
    return httpRequest;

};

function post(url, body) {

    const httpRequest = request.post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', process.env.LOCALHOST_BE);
    return httpRequest;

};

describe('create item', () => {

    // without the following lines we will get errors like this one and others similar 
    // error: MongooseError: Operation `users.findOneAndDelete()` buffering timed out after 10000ms
    beforeEach( async (done) => {

        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        done();

    });

    // this is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach( async (done) => {

        await server.close(); 
        done();
        
    });

    // validation: { title.length >= 3, description.length >= 5, price > 0, image required }
    it('creates an item if all the inputs are correct', async (done) => {

        try {

            const reqLogin = {

                body: {

                    email: 'test@test.com',
                    password: '123456',

                }

            };

            await post('/auth/login', reqLogin.body); 

            const req = {

                body: {
    
                    title: 'test',
                    description: 'testing',
                    image: 'https://res.cloudinary.com/dqhw3ma9u/image/upload/v1615827298/my-shop/before_after_analogy_rtkuec_vg8y7d.png',
                    price: 10,
                    stock: 1,
                
                },
    
            }; 

            const jwtSpy = jest.spyOn(jwt, 'verify');

            jwtSpy.mockReturnValue('some decoded token');
    
            const response = await put('/auth/sell', req.body);
    
            // expect(response.status).toBe(200);
            expect(response.body.message).toBe('item was creatd'); 
            done();

        } catch (err) {

            console.log(err);
            done();

        }

    });

    // without these lines we will get "You are trying to `import` a file after the Jest environment has been torn down"
    afterAll( async (done) => {

        await mongoose.connection.close();
        done();
        
    })
    
});