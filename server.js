var express = require('express');
var morgan = require('morgan');

var app = express();

//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res) {
  var name = "Daddy";
  res.json("My name is " + name);
});

app.get('/test', function(req, res) {
  res.json('Who is your daddy and what does he do?');
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(err) {
  if (err) throw err;
  console.log("Silly Server is running on Port 3000");
});