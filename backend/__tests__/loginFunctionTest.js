const superagent = require('superagent');

const agent = superagent.agent();

exports.login = function (request, done) {
    request
        .post('/auth/api/login')
        .send({ email: 'test@test.com', password: '123456' })
        .end(function (err, res) {
            if(err) {
                throw err;
            }
            agent.saveCookies(res);
            done(agent);
        });
};