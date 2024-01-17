const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  assignedCabId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Cab',
    default:null
  }  
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);