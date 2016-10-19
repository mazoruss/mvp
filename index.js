var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 5000)

mongoose.connect('mongodb://localhost/data/db');

// app.use(cors());
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  money: Number
});

var User = mongoose.model('users', UserSchema);

// app.post('/login', function(req, res) {
// 	console.log(req.body.username, req.body.password);
// 	User.create({username: req.body.username,
// 								password: req.body.password, 
// 								money: 999999}, function(err, data) {
// 									console.log('DATA IS: ', err, data);
// 									res.redirect('/');
// 								});
// })

app.post('/', function(req, res) {
	User.findOne({username: req.body.username}).exec(function(err, data) {
		if (req.body.action === 'changeMoney') {
			data.money = req.body.money;
			data.save(function(err, data) {
				res.status(200).json(data);
			})
		} else {
			res.status(200).json(data);
		}
	})
})

app.listen(app.get('port'));
console.log('listening');


module.exports = app;