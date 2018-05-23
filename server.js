var express = require('express');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// get configuration urls of database
var configDB = require('./config/database.js');

// init the app
var app = express();

// connecting to mlab
mongoose.connect(configDB.url);
var db = mongoose.connection;
var Shop = require('./app/models/shop.js');
var User = require('./app/models/user.js');

db.on('open', () => {
    console.log('Connected to database hosted on mlab');
});


// app setup
app.use(morgan('dev')); // log every request on console
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // json parsing if needed

app.use(cookieParser());
// express-session: creates a session middleware with options
app.use(session({
    secret: 'MyOwnSecret',
    resave: true,
    saveUninitialized: true
}));

// flash messages
app.use(flash());

// passport requiremets
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./app/routes.js')(app, passport);
// configs
require('./config/passport.js')(passport);

// template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname , '/public')));

var server = app.listen(port, () => {
    console.log('Listening to port 3000.');
});