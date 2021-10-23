var express = require('express');
var router = express.Router();
var fs = require('fs');
let passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

// Register User Listing
router.post('/register', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    if (strongPassword.test(password)) {
        'use strict';
        const randomValue = Math.random() * 123;
        let user = {
            id: randomValue,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        fs.readFile('users.json', (err, data) => {
            let temp = JSON.parse(data)
            temp[user.email] = user
            fs.writeFile("users.json", JSON.stringify(temp, null, 2), err => {
                res.render('login');
            });
        })
    } else {
        res.status(400)
        res.send({"error": "Password not strong enough"})
    }
})

router.get('/login', function (req, res, next) {
    res.render('login');
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/page',
        failureRedirect: '/'
    })(req, res, next);
});

router.get('/page', function (req, res, next) {
    let userData = req.user;
    res.render('userpage', {userData})
});

module.exports = router;
