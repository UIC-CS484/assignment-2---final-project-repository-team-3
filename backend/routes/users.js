var axios = require('axios')
var express = require('express');
var router = express.Router();
var fs = require('fs');
let passport = require('passport');
var db = require("../database");
var md5 = require('md5');
const {get} = require("superagent/lib/client");
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

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
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        db.run(`INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?, ?)`, [user.firstName, user.lastName, user.email, md5(user.password)], (err, result) => {
            if (err) {
                res.status(400).json({"error": err.message})
            } else {
                res.render('login')
            }
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
        failureRedirect: '/users/login'
    })(req, res, next);
});

router.get('/page', async function (req, res, next) {
    let userData = req.user;

    var pokeData = await P.getPokemonsList();
    pokeData = pokeData.results;
    console.log(pokeData);
    res.render('userpage', {userData, pokeData})
});

router.post('/favorite', async (req, res, next) => {
    let user = req.user;
    var pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.body.pokemon_id}/`)
    var data = pokemon.data.types.map(i => i.type.name)
    data.unshift(req.body.pokemon_id)
    data.unshift(user.id)
    // var data = pokemon.data.types.map(i => i.type.name).unshift(req.body.pokemon_id).unshift(user.id)
    db.run(`INSERT INTO favorites (user_id, pokemon_id, type_a, type_b) VALUES(?,?,?,?)`, data, (err, result) => {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json({
                "message": "success",
                "pokemon": pokemon.data.name
            })
        }
    })
})

router.get('/favorites', (req, res, next) => {
    let user = req.user;
    db.all("SELECT * FROM favorites WHERE user_id = ?", [user.id], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.render('favoritePage', {user, rows})
        }
    })
})

router.delete('/favorites', (req, res, next) => {
    let user = req.user;
    db.run("DELETE FROM favorites WHERE user_id = ? AND pokemon_id = ?", [user.id, req.body.pokemon_id], (err, result) => {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json({
                "message": "success"
            })
        }
    })
})

module.exports = router;
