const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWT_SECRET  = process.env.JWT_SECRET;
const User = require('./models/User');
const UserService = require('./services/UserService');
const ExtractJWT = require('passport-jwt').ExtractJwt;


//jwt authentication

class Passport {
    async init() {
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJWT.fromHeader('authorization'), //where token comes from
            secretOrKey: JWT_SECRET
        }, async (payload, done) => {
            try {
                //Find the user specified in token
                const user = await User.findById(payload.sub);

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

//local strategy (email & pw authentication)
        passport.use(new LocalStrategy({
            usernameField: 'email'
        }, async (email, password, done) => {
            try {

                //Find user given email
                const user = await User.findOne({email});

                //If not, handle
                if (!user) {
                    done(null, false);
                }

                //Check if PW is correct
                const isMatch = await UserService.compareHashed(password, user.password);

                //If not, handle
                if(!isMatch){
                    return done(null, false);
                }

                //Else return user
                done(null, user);

            } catch (err) {
                done(err, false);
            }
        }));
    }
}

module.exports = new Passport();
