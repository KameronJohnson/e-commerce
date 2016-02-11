var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

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
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
//Express can parse JSON data now
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err) {
  if (err) throw err;
  console.log("Silly Server is running on Port 3000");
});