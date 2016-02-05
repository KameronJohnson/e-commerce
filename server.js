var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://daddy:gussy05@ds043694.mongolab.com:43694/e-commerce', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the DB");
  }
});

//Middleware
app.use(morgan('dev'));
//Express can parse JSON data now
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-user', function(req, res, next) {
  var user = new User();
  
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  
  user.save(function(err) {
    if (err) return next(err);
    res.json('Successfully created a new user!');
  })
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err) {
  if (err) throw err;
  console.log("Silly Server is running on Port 3000");
});