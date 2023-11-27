const MessageAndStatus = require('../../../controller/messageAndStatus.controller');
const UsersData = require('../../model/user.model');
const { createStore } = require('./dashboard.resquest');



exports.singup = async (formData) => {

    try {
        const hashedPassword = await UsersData.hashPassword(formData.password);
        const newUser = new UsersData({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            password: hashedPassword
        });
        
        const user = await newUser.save();
        await createStore(user._id);
        return this.signin(formData);
    } catch (e) {
        return MessageAndStatus.USER_AL_REDY_EXIST;
    }
} 

exports.signin = async (formData) => {
    var user = await this.findEmail(formData.email);

    if (user) {
        const valid = await user.comparePassword(formData.password);
        if (valid) {
            return user;
        } else {
            return null;
        }
    } else {
        return null;
    }

}

exports.findEmail = (email) => {
    return UsersData.findOne({ email: email });
};