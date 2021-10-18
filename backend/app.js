var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var loginHandlerRouter = require('./routes/loginHandler');
var loginSuccRouter = require('./routes/userpage');

const {log} = require("debug");
var session = require("express-session");
const passport = require("passport");

var app = express();

require('./config/passport')(passport);

var sessionCfg = {
    resave: true,
    cookie: {secure: true},
    saveUninitialized: true,
    secret: 'secret'
}

sessionCfg.cookie.secure = false;

app.use(session(sessionCfg));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/loginHandler',loginHandlerRouter);
app.use('/userpage', loginSuccRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
