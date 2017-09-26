// This file is the starting point for node.js to run

// Include Express
// =============================================
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var config = require('./config');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:8080/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});


var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// EJS setup
// =============================================
// Setting folder where ejs files reside
app.set('views', './app/views');
// Set ejs as template engine
app.set('view engine', 'ejs');

// Routes setup
// =============================================
// Set route files
require('./app/routes/routes.js')(app);

// Set static files folder. All static files like css, js and images are placed
// in "public" folder
app.use(express.static('./public'));

// Start and Listen to incoming request
// =============================================
// Listening to port 3000 when server.js is started
app.listen(8080);
console.log('Server running at http://localhost:8080/');