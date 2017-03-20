'use strict';
var passport = require("passport");
var config = require("../config");
var FacebookStrategy = require("passport-facebook").Strategy;
var h = require('../helper');
module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        h.findById(id).then(function(user) {
            done(null, user)
        }).catch(function(error) {
            console.log('Error when deserializing the user');
        });
    });
    var authProcessor = function(accessToken, refreshToken, profile, done) {
        //find a user in the local db using profile.id
        //if the user is found, return the user data using the done()
        //if the user is not found, create one in the local db and return
        h.findOne(profile.id)
            .then(function(result) {
                if (result) {
                    done(null, result);
                } else {
                    //create a new user and return
                    h.createNewUser(profile).then(function(newChatUser) {
                        done(null, newChatUser)
                    }).catch(function(error) {
                        console.log('Error when Creating new user');
                    });
                }
            });
    }
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}
