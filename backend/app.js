const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const session = require("express-session");
const passport = require("passport");

const app = express();

require('./config/passport')(passport);

const sessionCfg = {
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
