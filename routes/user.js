var router = require('express').Router();
var User = require('../models/user.js');

router.get('/signup', function(req, res, next){
  res.render('accounts/signup');
});

router.post('/signup', function(req, res, next) {
  var user = new User();
  
  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  
  //findOne is a mongoose method
  User.findOne({ email: req.body.email }, function(existingUser) {
      if (existingUser) {
          console.log(req.body.email + " already exists!");
          return res.redirect('/signup');
      } else {
          user.save(function(err, user) {
            if (err) return next(err);
            res.json('Successfully created a new user!');
          });
      }
  });
});

module.exports = router;