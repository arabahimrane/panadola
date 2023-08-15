
exports.cookiesToken = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        // Other optional parameters (if needed)
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set cookie expiration time (e.g., 7 days)
        secure: true, // Set the cookie to be sent over HTTPS only in a production environment
        sameSite: 'strict' // Set the sameSite attribute for better security
    });
    
}