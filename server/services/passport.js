const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localStrategyOptions =  {
    usernameField: 'email'
};

const LocalLogin = new LocalStrategy(localStrategyOptions, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
        if (err) {return done(err)}

        if (!user) {
            console.log('there is no user');
            return done(null, false);
        }

        console.log('login password',password);

        user.comparePassword(password, function(err, isMatch) {
            if (err) {return done(err)}
            console.log('isMatch', isMatch);
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        })

    })
});

//Create jwt strategy
const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtStrategyOptions, function(payload, done){

    User.findById(payload.sub, function(err, user) {
        if(err) {return done(err, false)}

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

passport.use(jwtLogin);
passport.use(LocalLogin);