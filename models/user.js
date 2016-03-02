var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

// The user schema attributes
var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String,
    profile: {
        name: { type: String, default: ''},
        picture: { type: String, default: ''}
    },
    
    address: String,
    history: [{
        date: Date,
        paid: { type: Number, default: 0},
        // item: { type: Schema.Types.ObjectID, ref: ''}
    }]
});

// Hash the password before saving to db
//pre is a built in mongoose method, 'before save'
UserSchema.pre('save', function(next) {
    var user = this;
    //if not modified return the next callback function
    if (!user.isModified('password')) return next();
    //if yes... salt!
    //10 characters of random data = salt
    bcrypt.genSalt(10, function(err, salt){
        //if an error, return callback with error
        if (err) return next(err);
        //null is the "progress" | could be console.log('')
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);
            
            //hash is that data that's going to be produced ie. 123jsdfjkk
            user.password = hash;
            next();
        });
    });
});

//Compare passwords
UserSchema.methods.comparePassword = function(password) {
    //this.password is referring to the one in the db
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.gravatar = function(size) {
    if (!this.size) size = 200;
    if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

module.exports = mongoose.model('User', UserSchema);