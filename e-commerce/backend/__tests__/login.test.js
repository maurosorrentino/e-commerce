const supertest = require('supertest');
const mongoose = require('mongoose');
const serverDestroy = require('server-destroy');

const app = require('../app');
const server = require('../app');

const request = supertest(app);

function post(url, body) {

    const httpRequest = request.post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:8090');
    return httpRequest;

};

describe('Login', () => {

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


    it("shows an error and status code 404 if user cannot be found", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'testing@testingSomeRandomWordsAAAAL8767845378907646GTHBVDDHBC.com',
                    password: '12345',
    
                }
    
            };
    
            const response = await post('/auth/login', req.body);
    
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('There is no account into our database with this email: ' + req.body.email);
            done();

        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("shows an error and status code of 401 if the password chosen doesn't match the one into the db", async (done) => {

        try {

            // there is an account into the db { email: 'test@test.com' password: '123456' } for testing purposes
            const req = {

                body: {

                    email: 'test@test.com',
                    password: '12345',

                }

            }

            const response = await post('/auth/login', req.body);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('invalid password, please try again');
            done();
            
        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("logs the user in if all the inputs are correct", async (done) => {

        try {

            // there is an account into the db { email: 'test@test.com' password: '123456' } for testing purposes
            const req = {

                body: {

                    email: 'test@test.com',
                    password: '123456',

                }

            };

            const response = await post('/auth/login', req.body);

            expect(response.status).toBe(200);
            expect(response.body.message).toEqual('successful login');
            done();
            
        } catch (err) {

            console.log(err);
            done();
            
        }

    });

    // without these lines we will get "You are trying to `import` a file after the Jest environment has been torn down"
    afterAll( async () => {

        await mongoose.connection.close();
        
    })
    
});