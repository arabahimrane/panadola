const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator"); 

const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: true, required: true, unique: true },
    password: { type: String },
    verifier: { type: Boolean, default: false },
})


userSchema.plugin(uniqueValidator);

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const UsersData = mongoose.model("users", userSchema);



module.exports = UsersData;
