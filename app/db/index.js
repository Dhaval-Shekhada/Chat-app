'use strict';
var config = require('../config');
var Mongoose = require('mongoose').connect(config.dbURI);
//log an error if the connection fails
Mongoose.connection.on('error',function(error){
	console.log("MongoDB Error: ", error);
});

//create schema tha defines the structure of storing user data.
var chatUser = new Mongoose.Schema({
	profileId: String,
	fullName: String,
	profilePic: String
});
// Turn schema into usable model.
var userModel = Mongoose.model('chatUser', chatUser);
module.exports = {
	Mongoose ,
	userModel
}
