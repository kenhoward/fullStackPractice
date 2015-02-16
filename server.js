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
var Session = require('express-session')
// end of 3.0

var port = 9001;

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
      return done(null, profile);
}));

App.get('/auth/google', Passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login'}));

App.get('/auth/google/callback', Passport.authenticate('google', {
	failureRedirect: '/auth/failure'
}, function(req, res) {
	res.redirect('/api/me')
}))
// end of 2.1

App.listen(port, function() {
	console.log('Now listening to ' + port);
})
// end of 1.0