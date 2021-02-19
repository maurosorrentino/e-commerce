const supertest = require('supertest');
const app = require('../app');
const server = require('../app');

const request = supertest(app);

function post(url, body) {

    const httpRequest = request.post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:8090');
    return httpRequest;

}

describe('Login', () => {

    // this is needed because otherwise we will get an error saying that we are already listening to that port
    afterEach(async() => {

        await server.close();

    });


    it("shows an error and status code 404 if user cannot be found", async (done) => {

        const req = {

            body: {

                email: 'testing@testingSomeRandomWordsAAAALGTHBVDDHBC.com',
                password: '12345',

            }

        };

        const response = await post('/auth/login', req.body);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('There is no account into our database with this email: testing@testingSomeRandomWordsAAAALGTHBVDDHBC.com');
        done();

    });

    it("shows an error and status code of 401 if the password chosen doesn't match the one into the db", async (done) => {

        // there is an account into the db email: { 'test@test.com' password: '123456' } for testing purposes
        const req = {

            body: {

                email: 'test@test.com',
                password: '12345',

            }

        }

        const response = await post('/auth/login', req.body);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('invalid password, please try again');
        done()

    });

    it("logs the user in if all the inputs are correct", async () => {

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

    });
    
});