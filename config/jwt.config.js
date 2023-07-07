const secret = '49968d03-f4ef-4961-a78a-1b57c3972eed';
const jwt = require('jsonwebtoken');
const MessageAndStatus = require('../controller/messageAndStatus.controller');

const expiresTime = "7d";

exports.createJwtToken = (userId) => {
    const jwtToken = jwt.sign(
            { userId: userId.toString()},
            secret,
            { expiresIn: expiresTime } 
    );
    return jwtToken;
}

exports.expiredJwtTest = (token) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        const userId = decodedToken.userId;
        if((decodedToken.exp - Math.floor(Date.now() / 1000)) < 120)
        {
            newtoken = this.createJwtToken({ userId : req.body.userId });
        }else{
            newtoken = null;
        }
         return {
            newtoken : newtoken,
            userId: userId,
            token: token
        };
    } catch (e) {
        return MessageAndStatus.ACCESS_DENIED;
    }
}
