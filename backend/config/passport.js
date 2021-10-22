const localStategy = require('passport-local').Strategy;
const {use} = require("express/lib/router");

module.exports = function (passport) {
    console.log("Passport Function triggered");
    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (username, password, done) {
        let userList = JSON.parse(require('fs').readFileSync('users.json', 'utf-8'))
        if (userList[username]) {
            let user = userList[username];
            if (user.password === password) {
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
