const localStategy = require('passport-local').Strategy;
var db = require("../database");
var md5 = require('md5');

module.exports = function (passport) {
    console.log("Passport Function triggered");
    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (username, password, done) {
        db.get("select * from users where email = ?", [username], (err, row) => {
            if (err) {
                done(null, false)
            } else {
                console.log(row)
                if (md5(password) === row.password) {
                    done(null, row)
                } else {
                    done(null, false)
                }
            }
        })
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function (email, done) {
        db.get("select * from users where email = ?", [email], (err, row) => {
            if (err) {
                done(null, false)
            } else {
                done(null, row)
            }
        })
    });
}
