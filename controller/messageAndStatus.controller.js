class MessageAndStatus {
    static statusOk = 200;
    static statusUnauthorized = 401;
    static statusErrorServer = 500;
    static statusNotFound = 404;
    static OK = { statusCode: this.statusOk, message: 'OK' };
    static NOT_FOUND = { statusCode: this.statusNotFound, message: 'Not found' };
    static USER_INCORECT = { statusCode: this.statusUnauthorized, message: 'Email or password is incorrect' };
    static USER_AL_REDY_EXIST = { statusCode: this.statusUnauthorized, message: 'Email already used' };
    static EMAIL_FORMAT_NOT_ACCEPTABLE = { statusCode: this.statusUnauthorized, message: 'Email format not acceptable' };
    static ERROR_SERVER = { statusCode: this.statusErrorServer, message: 'The server has encountered a situation that it does not know how to handle.' };
    static ACCESS_DENIED = { statusCode: this.statusUnauthorized, message: 'Access denied' };
    static EMPTYFIELDS = { statusCode: this.statusUnauthorized, message: 'Fill in all the fields' }
    static SESSION_STATUES = { statusCode: this.statusUnauthorized, message: 'Session ended'}
}
module.exports = MessageAndStatus;