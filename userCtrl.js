// 1.0 - Getting all of this from the browser for local host
var User = require('./../models/user'); // links with userModel.js
// end 1.0
// 1.0.1 - npm install 'q'
var Q = require('q');
// end 1.0.1

module.exports = {
	updateOrCreate: function(user) { // user will come from the google authentication
		// 1.0.2
		var deferred = Q.defer();
		// end of 1.0.2
		User.find({ googleId: user.id }, function(results) { //googleId comes from the userModel
			if(results) { // if there is a user, take that info and update the below information
				// all from what the browser shows
				User.update({ _id: results._id }, {
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
					// 1.0.3 
				}, function(err, results) {
					if(err) {
						return deferred.reject(err);
					} else {
						deferred.resolve(results)
					}
				})
				// 1.0.4
			} else { // absolutely no results
				User.update({
					googleId: user.name,
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(err, results) {
					if(err) {
						return deferred.reject(err);
					} else {
						deferred.resolve(results)
					}
				})
				// end 1.0.4				
			}
		})
		return deferred.promise
		// end 1.0.3

	},
	getUser: function(id) {
		var deferred = Q.defer();
		User.findOne({ googleId: id }, function(err, results) {
			if(err) {
				deferred.reject(err);
			}
		})
	}
}