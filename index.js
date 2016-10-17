var express = require('express');
// var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 5000)

app.use(express.static(path.join(__dirname, '/client')));
// app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('hi');
})

app.listen(app.get('port'));
console.log('listening');


module.exports = app;