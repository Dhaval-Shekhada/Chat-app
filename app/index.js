'use strict';
require('./auth')();
module.exports = {
	router: require('./Routes')(),
	session:require('./session')
}
