// load local strategy
var LocalStrategy = require('passport-local').Strategy;

// load User model
var User = require('../app/models/user.js');

module.exports = function(passport) {
    // passport setup

    // serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    /* LOCAL STRATEGIES, LOGIN AND SIGNUP */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // passing the whole request to the callback function
    }, function(req, username, password, done) {
        // User.findOne wouldnt execute until data is sent back
       User.findOne({'local.username': username}, (err, user) => {
            if(err){
                return done(err);
            }
            // if the user already exists, send a flash message
            if(user){
                return done(null, false, req.flash('signupMessage', 'That username is taken.'));
            } else {
                // if there is no user with the username, create new one
                var newUser = new User();

                // set the user's local credentials
                newUser.local.username = username;
                newUser.local.password = newUser.generatePassword(password); // hash the password

                // save the user to the database
                newUser.save((err) => {
                    if(err){
                        throw err;
                    }
                    return done(null, newUser);
                })
            }
       });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({'local.username': username}, (err, user) => {
            if(err){
                return done(err);
            }
            // if no user is found
            if(!user){
                return done(null, false, req.flash('loginMessage', 'User not found.'));
            }
            // if password is wrong
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong password'));
            }
            return done(null, user);
        });
    }));
};