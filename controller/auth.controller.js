const { singup, signin } = require('../database/mongodb/request/auth.request');
const { createJwtToken, expiredJwtTest } = require('../config/jwt.config');
const { cookiesToken } = require('./cookies.controller');

const User = require('../database/model/user.model');
const MessageAndStatus = require('./messageAndStatus.controller');

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

exports.testSession = async (req, res, next) => {
    await expiredJwtTest(req.cookies.token).then((cookies) => {
        if (cookies.statusCode == null) {
            if (cookies.newtoken != null) {
                cookiesToken(res, cookies.newtoken);
            }
            next();
        } else {
            this.logout(res, cookies.message);
        }
    });
}

exports.signin = async (req, res) => {
    var formData = req.body;
    if (validateEmail(formData.email)) {
        if (formData.email && formData.password) {
            await signin(formData).then((user) => {
                if (user == null) {
                    res.redirect("/dashboard/signin?message=" + MessageAndStatus.USER_INCORECT.message)
                }
                else {
                    this.Extrasignin(user, req, res);
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
                await singup(formData).then((user) => {
                    this.Extrasignin(user, req, res);
                })
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        res.redirect("/dashboard/singup?message=" + MessageAndStatus.EMAIL_FORMAT_NOT_ACCEPTABLE.message);
    }
}

exports.logout = (res, message = null) => {
    try {
        message ?
            res.clearCookie('token').redirect("../dashboard/signin?message=" + message) :
            res.clearCookie('token').redirect("../dashboard/signin");
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.Extrasignin = async (user, req, res) => {
    console.log("this req from Extrasignin fuction: ", req.body);
    var token = createJwtToken(user.id);
    cookiesToken(res, token);
    res.redirect('/dashboard');
}

exports.getpassword = async (req, res) => {
    var formData = req.body;
    if (validateEmail(formData.email)) {

    }
}