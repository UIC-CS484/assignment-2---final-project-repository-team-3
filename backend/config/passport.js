const localStategy = require('passport-local').Strategy;
let userList = require('../users.json');
const {use} = require("express/lib/router");

module.exports = function (passport) {
    console.log("Passport Function triggered");


    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (username, password, done) {
        if (userList[username]) {
            let user = userList[username];
            if (user.password == password) {
                console.log("pwmatch");
                done(null, user);
            } else {
                done(null, false);
            }
        } else {
            done(null, false);
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}