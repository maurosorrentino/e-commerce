const supertest = require('supertest');
const app = require('../app');
const server = require('../app');

const User = require('../models/user');

const request = supertest(app);

function put(url, body) {
    
    const httpRequest = request.put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:8090');
    return httpRequest;

}

describe('Signup errors', () => {

    // this is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach(async() => {

        server.close();

    });

    // there is an account with email: 'test@test.com' into the db for testing purposes
    it("shows an error and status code 409 if user already exists", async (done) => {

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

    });

    it("shows an error message and status code of 403 if passwords do not match", async (done) => {

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

    });

    it("shows an error message and status code 422 for invalid name (it cannot be empty))", async (done) => {

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

    });

    it("shows an error message and status code 422 for invalid email", async (done) => {

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

    });

});

describe('Signup success', () => {

    // 1st line is needed because if we do not cancel this user the 2nd time that we run the test it will fail (since I'm testing if a user is able to sign up)
    // 2nd line is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach(async () => {

        await User.findOneAndRemove({ email: 'test2@test.com' });
        await server.close();

    })
    
    it("shows a confirm message that user was created and status code 201 if all the inputs are fine", async (done) => {

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
        expect(response.body.message).toBe('user created, please log in');
        done();

    });
    
});