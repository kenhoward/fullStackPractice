//6.0 - Getting all of this from the browser for local host
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema ({
	name: {type: String, required: true},
	googleId: {type: Number, required: true, unique: true},
	plusLink: {type: String, required: true, unique: true},
	picture: {type: String, required: true, unique: true},
	gender: {type: String, enum: ['male', 'female', 'undecided'], required: true},
	cart: [{type: String}], // for our products
	address: {
		line1: {type: String},
		line2: {type: String},
		city: {type: String},
		state: {type: String},
		country: {type: String},
		zip: {type: String}
	}
})

module.exports = Mongoose.model('User', userSchema); // passing in userSchema