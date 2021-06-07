require('dotenv').config();

exports.isAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        return res.status(401).json({ message: 'You cannot take this action, please login' });
    }
}