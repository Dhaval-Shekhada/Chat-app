'use strict';
var router = require('express').Router();
var db = require('../db');
var _registerRoutes = function (routes,methods){

		for(var key in routes){
			if(typeof routes[key]=== 'object' && routes[key] !== null && !(routes[key] instanceof Array)){

				_registerRoutes(routes[key], key);
			}else {
				// register the routes
				if(methods =='get'){
					router.get(key,routes[key]);
				}else if (methods === 'post'){
					router.post(key,routes[key]);
				}else {
					router.use(routes[key]);
				}
			}
		}
	}
var route = function(routes){
	_registerRoutes(routes);
	return router;
}

// find a asingle user based on a key

let findOne = profileID=>{
	return db.userModel.findOne({
		'profileId': profileID
	});
}

// creat a new user and return that instance
let createNewUser = profile => {
	return new Promise((resolve,reject)=>{
		let newChatUser = new db.userModel({
			profileId:profile.id,
			fullName:profile.displayName,
			profilePic:profile.photos[0].value || ''
		});
		newChatUser.save(error =>{
			if(error) {

				reject(error);
			}else{
				resolve(newChatUser);
			}
		});
	});
}

// this is ES6 promisified version of findById

let findById = id=>{
	return new Promise((resolve,reject) => {
		db.userModel.findById(id, (error,user)=>{
			if(error){
				reject(error);
			}else {
				resolve(user);
			}
		});
	});
}
module.exports = {
	route,
	findOne,
	createNewUser,
	findById
}
