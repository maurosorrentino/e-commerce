const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {

        // getting auth header
        const authHeader = req.get('x-access-token') || req.get('Authorization');

        // if auth header not present we won't autheticate
        if(!authHeader) {

            req.isAuth = false;
            return next();

        }

        // getting the token from the client side
        const token = authHeader.split(' ')[1];
        let decodedToken;

        // checking if token is valid
        decodedToken = jwt.verify(token, 'SomeSuperSecretIntoNode');

        // if we get an error we won't autheticate
    } catch (err) {

        req.isAuth = false;
        return next();

    }

    // if token is undefined we won't autheticate
    if (!decodedToken) {

        req.isAuth = false;
        return next();

    }

    // if we pass all these steps we will autheticate
    // extract userId from token so that is available in every req
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();

}; 