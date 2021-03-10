const supertest = require('supertest');
const app = require('../app');
const server = require('../app');

const request = supertest(app);

function put(url, body) {

    const httpRequest = request.put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:8090');
    return httpRequest;

}

describe('create item', () => {

    afterEach((done) => {

        await server.close();
        done();

    })

    // validation: { title.length >= 3, description.length >= 5, price > 0, image required }
    it('creates an item if all the inputs are correct', async (done) => {

        const req = {

            body: {

                title: 'test',
                description: 'testing',
                image: 'fake image',
                price: 10,

            }

        };

        const response = await put('auth/sell', req.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('item was created');
        done();

    });
    
});