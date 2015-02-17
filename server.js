// install npm init
// install express
// install body parser

// 1.0
var Express = require('express');
var App = Express();
var BodyParser = require('body-parser')
// 2.0
var Passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
// end of 2.0
// 3.0
var Session = require('express-session');
// end of 3.0
// 5.0
var Mongoose = require('mongoose');
// end 5.0

var port = 9001;

// Middleware ========================================================================================================

// 4.0
Passport.serializeUser(function(user, done) {
	console.log('Serializing: ', user);
	done(null, user);
})

Passport.deserializeUser(function(obj, done) {
	// 6.0
	userCtrl.getUser(obj.id).then(function(results) {
		done(null, results);
	}, function(err) {
		// INPUT HERE
	})
	console.log('Deserializing: ', obj);
	// part of 4.0 that was moved when I did 6.0
	// done(null, obj);
})
// end 4.0

// 7.0
App.use(Express.static(__dirname + '/public'));
// 3.0.1
App.use(BodyParser.json());
App.use(Session({secret: 'sdfkjaksdfjdDFJk#2dkfj'}));
App.use(Passport.initialize());
App.use(Passport.session());
// end 3.0.1

// 2.1
// NOTE THE SLIGHT CHANGES
Passport.use(new GoogleStrategy({
    clientID: '857129244827-akuml77rbau1aina8v0tdhn4vpvue6hj.apps.googleusercontent.com',
    clientSecret: 'vjNsn-M-OYhGUNN9N2lUeG4g',
    callbackURL: "http://localhost:9001/auth/google/callback"
  },function(token, tokenSecret, profile, done) {
  	// 5.0
  	userCtrl.updateOrCreate(profile).then(function(results) { // *** takes this from the userCtrl ***
  		return done(null, profile);
  	}, function(err) {
  		done(err, profile);
  	})
  	// end 5.0	
}));



// Authentication ====================================================================================================

App.get('/auth/google', Passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login'}));

App.get('/auth/google/callback', Passport.authenticate('google', {
	failureRedirect: '/auth/failure'
}, function(req, res) {
	res.redirect('/api/me')
}))
// end of 2.1

// 8.0
App.get('/auth/logout', function(req, res) {
	req.logout();
	res.status(200).json(req.user) // or .send('success')
})

// 4.0.1
App.get('/api/me', function(req, res) {
	return res.json(req.user);
})
// end 4.0.1




// Conecctions ========================================================================================================

// 5.0.2
Mongoose.connect(mongoURI, function() {
	console.log('Connected to MongoDB at ' + mongoURI)
})

App.listen(port, function() {
	console.log('Now listening to ' + port);
})
// end of 1.0