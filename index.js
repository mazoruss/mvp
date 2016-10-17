var express = require('express');
// var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../client')));
// app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('hi');
})

app.listen(5000);
console.log('listening on port 5000');


module.exports = app;