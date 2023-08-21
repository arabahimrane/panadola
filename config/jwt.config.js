const secret = '49968d03-f4ef-4961-a78a-1b57c3972eed';
const jwt = require('jsonwebtoken');
const { getStoreInformation } = require('../database/mongodb/request/dashboard.resquest');
const MessageAndStatus = require('../controller/messageAndStatus.controller');

const expiresTime = "4d";

exports.createJwtToken = async (userId) => {
    console.log('createJwtToken id user: ', userId);
    var storeInformation = await getStoreInformation(userId);
    const jwtToken = jwt.sign(
        {
            userId: userId.toString(),
            storeId: storeInformation._id.toString(),
        },
        secret,
        { expiresIn: expiresTime }
    );
    return jwtToken;
}

exports.expiredJwtTest = async (token) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        const storeId = decodedToken.storeId.toString();
        const userId = decodedToken.userId.toString();
        if ((decodedToken.exp - Math.floor(Date.now() / 1000)) < 86400) {
            newtoken = await this.createJwtToken(userId.toString());
        }
        else {
            newtoken = null;
        }
        return {
            newtoken: newtoken,
            storeId: storeId,
            userId: userId,
            token: token
        };
    } catch (e) {
        // console.log(e);
        return MessageAndStatus.SESSION_STATUES;
    }
}
