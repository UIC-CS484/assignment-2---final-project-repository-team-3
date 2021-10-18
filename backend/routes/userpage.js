var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let userData = req.user;
    res.render('userpage', {userData})
});

module.exports = router;
