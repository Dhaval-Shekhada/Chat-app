'use strict';
var h = require('../helper');
var passport = require('passport');

module.exports = function(){
	var routes = {
		'get' : {
			'/': function(req,res,next){
				res.render('login');
			},
			'/rooms': function(req,res,next){
				res.render('rooms',{
					user : req.user
				});
			},

			'/chat':(req,res,next)=>{
				res.render('chatroom');
			},
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook',{
				successRedirect:'/rooms',
				failureRedirect:'/'
			})


	},
		'post':{

		},
		'NA': function(req,res,next){
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}

}

	return h.route(routes);

}
