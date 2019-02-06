var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var auth = require('./routes/auth');
var dashboard = require('./routes/dashboard');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



//setup db
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://mongodb:27017/dashboard', { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', auth);
app.use('/api/widget', dashboard);


app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
