var     passportLocalMongoose   = require("passport-local-mongoose");
const   mongoose                = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);