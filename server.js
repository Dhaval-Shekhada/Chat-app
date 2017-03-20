'use strict';
const http2 = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');
const app = express();
const chatApp = require('./app');
const passport = require('passport');
const bodyParser = require('body-parser');

//var port = process.env.PORT || 1000;
// var options = {
// 	key: fs.readFileSync('./server_certificates/server-private-key.pem'),
// 	cert: fs.readFileSync('./server_certificates/server-certificate.pem')
// };
app.set('port', process.env.PORT || 1000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

 app.use(bodyParser(url));


app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatApp.router);


var server = http2.createServer(app);

server.listen(app.get('port'), () => {
    console.log("app is running on ", app.get('port'));
});
