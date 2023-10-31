const adimnRoutes = require('express').Router();
const dashboard = require('./admin/dashboard.routes')


adimnRoutes.get('/', (req, res) => {
    console.log('start adminRoutes');
    const message = "Bonjour, ceci est un message dynamique !";
    res.render('home', { message: message });
});

adimnRoutes.use('/dashboard', dashboard);



module.exports = adimnRoutes;