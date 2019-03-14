const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function userForToken(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.login = function(req, res, next) {
    res.send({token: userForToken(req.user)});
}

exports.signup = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send('You must provide email and password');
    }

    // check if user exist in DB
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err)}

        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) { return next(err)}

            return res.json({token: userForToken(user)});
        })
    });


}