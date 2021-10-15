var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
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
        var randomValue = Math.random() * 123;
        let user = {
            id: randomValue,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        let i = fs.readFile('users.json', (err, data) => {
            var temp = JSON.parse(data)
            temp[user.email] = user
            fs.writeFile("users.json", JSON.stringify(temp, null, 2), err => {
                res.send("success")
            });
        })
    } else {
        res.send({"error": "Password not strong enough"})
    }
})

module.exports = router;
