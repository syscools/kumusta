/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var ws = require('nodejs-websocket');

var server = ws.createServer(function (conn) {
    console.log("new connection");
    
    conn.on("text",function (str) {
        console.log("got " + str);

        function broadcast(server, msg) {
            server.connections.forEach(function (conn) {
                conn.sendText(msg);
            }); 
        }

        broadcast(server,str.toUpperCase() + "!");
    });

    conn.on("close",function (code,reason) {
        console.log("connection close");
    });

}).listen(appEnv.port);

console.log("listening on " + appEnv.port);

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry

/*
 
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

*/
