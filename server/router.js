require('./services/passport');
const Authintication = require('./controllers/authintication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLoginAuth = passport.authenticate('local', {session: false});
module.exports = function(app) {
    app.get('/', requireAuth, function(req, res, next) {
        res.send({hi: 'there'});
    });
    app.post('/signup', Authintication.signup);
    app.post('/signin', requireLoginAuth, Authintication.login);
};