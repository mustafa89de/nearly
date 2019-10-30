const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWT_SECRET  = process.env.JWT_SECRET;
const User = require('./models/User');
const UserService = require('./services/UserService');
const ExtractJWT = require('passport-jwt').ExtractJwt;


//jwt authentication
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'), //where token comes from
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //Find the user specified in token
        const user = User.findById(payload.sub);

        //If user doesn't exist return false, no error
        if (!user) {
            return done(null, false);
        }

        //Else, return user
        done(null, user);

    } catch (err) {
        done(err, false);
    }
}));


