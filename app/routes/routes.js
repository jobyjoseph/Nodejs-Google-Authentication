var passport = require('passport');

// import controllers
var home = require('../controllers/home');
var user = require('../controllers/user');

// Routes setup
// =============================================
module.exports = function(app) {

	// href of google login link
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
	// callback url given to google
  	app.get('/callback', 
		passport.authenticate('google', { failureRedirect: '/' }),
		function(req, res) {
	  		// Successful authentication, redirect to user.
	  		res.redirect('/user');
		});

	// Page showing login link
	app.get('/', home.index);
	
	// logged in page
	app.get('/user', user.index);
};