const router = require('express').Router();
const dashboard = require('./dashboard.routes')


router.get('/', (req, res) => {
    const message = "Bonjour, ceci est un message dynamique !";
    res.render('home', { message: message });
});

router.use('/dashboard', dashboard);



module.exports = router;