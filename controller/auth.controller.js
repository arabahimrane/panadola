const { singup, signin } = require('../database/mongodb/request.mongodb');
const { createJwtToken } = require('../config/jwt.config')
const User = require('../database/model/user.model');
const MessageAndStatus = require('./messageAndStatus.controller');

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

exports.signin = async (req, res) => {
    var formData = req.body;
    if (validateEmail(formData.email)) {
        if (formData.email && formData.password) {
            signin(formData).then((user) => {
                if (user == null) {
                    res.redirect("/dashboard/signin?message=" + MessageAndStatus.USER_INCORECT.message)
                }
                else {
                    var token = createJwtToken(user.id);
                    req.session.token = token;
                    res.redirect('/dashboard');   
                }

            });
        } else res.redirect("/dashboard/signin?message=" + MessageAndStatus.EMPTYFIELDS);
    } else res.redirect("/dashboard/signin?message=" + MessageAndStatus.EMAIL_FORMAT_NOT_ACCEPTABLE);
}

exports.singup = async (req, res) => {
    var formData = req.body;
    if (validateEmail(formData.email)) {
        if (formData.email && formData.lastName && formData.firstName && formData.password) {
            try {
                singup(formData);
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        //do somthing
    }
}

exports.getpassword = async (req, res) => {
    var formData = req.body;
    if (validateEmail(formData.email)) {

    }
}