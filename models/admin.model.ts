export {};
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: 50
    },
    password: {
      type: String,
      maxlength: 8
    },
    dateRegistered: {
      type: Date,
      maxlength: 60
    },
})

// Called before save method on the model
// Turns admin entered password into a hash value, with salt
AdminSchema.pre('save', function(this: any, next: any,){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var admin = this;
  if (!admin.isModified('password')) return next();

  bcrypt.genSalt(10, (err: Error, salt: any) => {
    if (err) return next(err);

    bcrypt.hash(admin.password, salt, (err: any, hash: any) => {
      if (err) return next(err);
      if(hash) {
        admin.password = hash;
        this.password = admin.password;
        console.log('Password Hashed');
        console.log(admin.password);
        return next();
      }
    })
  })
  })

AdminSchema.methods.comparePassword = function(candidatePassword: any, cb: (err: Error | null, isMatch: boolean) => void) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    if (err) return cb(null, isMatch);
    cb(null, isMatch);
  })
}


//custom method to generate authToken
AdminSchema.methods.generateAuthToken = function() {
  //get the private key from the config file -> environment variable
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); 
  return token;
}

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;