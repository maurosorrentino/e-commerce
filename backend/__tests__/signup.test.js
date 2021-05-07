const supertest = require('supertest');
const mongoose = require('mongoose');
const serverDestroy = require('server-destroy');

const app = require('../app');
const server = require('../app');

const User = require('../models/user');

const request = supertest(app);

require('dotenv').config();

function put(url, body) {
    
    const httpRequest = request.put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', process.env.LOCALHOST_BE);
    return httpRequest;

};

describe('Signup errors', () => {

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

    // there is an account with email: 'test@test.com' into the db for testing purposes
    it("shows an error and status code 409 if user already exists", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test@test.com',
                    name: 'test',
                    password: '123456',
                    confirmPassword: '123456',
    
                }
    
            };
    
            const response = await put('/auth/signup', req.body);
    
            expect(response.status).toBe(409);
            expect(response.body.message).toBe('user test@test.com already exists');
            done(); 

        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("shows an error message and status code of 422 if passwords.length < 5", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test2@test.com',
                    name: 'test',
                    password: '1234',
                    confirmPassword: '1234',
    
                }
    
            };
    
            const response = await put('/auth/signup', req.body);
    
            expect(response.status).toEqual(422);
            expect(response.body.message).toEqual('password needs to be at least 5 characters');
            done();

        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("shows an error message and status code of 403 if passwords do not match", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test2@test.com',
                    name: 'test',
                    password: '123456',
                    confirmPassword: '12345',
    
                }
    
            };
    
            const response = await put('/auth/signup', req.body);
    
            expect(response.status).toEqual(403);
            expect(response.body.message).toEqual('passwords do not match');
            done();

        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("shows an error message and status code 422 for invalid name (it cannot be empty)", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test2@test.com',
                    name: '',
                    password: '12345',
                    confirmPassword: '12345',
    
                }
    
            }
    
            const response = await put("/auth/signup", req.body);
    
            expect(response.status).toBe(422);
            expect(response.body.message).toBe('please enter your name');
            done();

        } catch (err) {

            console.log(err);
            done();

        }

    });

    it("shows an error message and status code 422 for invalid email", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test',
                    name: 'test',
                    password: '12345',
                    confirmPassword: '12345',
    
                }
    
            };
    
            const response = await put('/auth/signup', req.body);
    
            expect(response.status).toBe(422);
            expect(response.body.message).toEqual('Invalid email');
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

describe('Signup success', () => {

    // without the following lines we will get errors like this one and others similar 
    // error: MongooseError: Operation `users.findOneAndDelete()` buffering timed out after 10000ms
    beforeEach( async (done) => {

        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        done();

    });

    // 1st line is needed because if we do not cancel this user the 2nd time that we run the test it will fail (since I'm testing if a user is able to sign up)
    // 2nd line is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach( async (done) => {

        await User.findOneAndDelete({ email: 'test2@test.com' });
        await server.close();
        done();

    })
    
    it("shows a confirm message that user was created and status code 201 if all the inputs are fine", async (done) => {

        try {

            const req = {

                body: {
    
                    email: 'test2@test.com',
                    name: 'test',
                    password: '12345',
                    confirmPassword: '12345',
    
                }
    
            }
    
            const response = await put('/auth/signup', req.body);
    
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('user created, you are being redirected to the login page');
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