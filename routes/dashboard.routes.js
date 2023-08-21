const router = require('express').Router();
const { testSession, singup, signin, logout, getpassword } = require('../controller/auth.controller');
const { uploadImgProduct, delletImgProduct, createProduct, createCategorie, getStore } = require('../controller/dashboard.controller');


router.get('/', testSession, getStore, (req, res) => {


    res.render('dashboard/body', {
        title: 'Dashboard', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        components: 'components/dashboard', cardi: '../layaout/card',
        orderList: '../layaout/orderList',
        data: {
            orders: { name: 'Orders', value: '9' },
            shipping: { name: 'Shipping', value: '3' },
            confirmSales: { name: 'confirm sales', value: '6' },
            refund: { name: 'Refund', value: '3' },
            earning: { name: 'Earning', value: '240' },
            visits: { name: 'Visits', value: '19' },
            customers: { name: 'Customers', value: '13' }
        },
        orders: [
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
        ]
    });
});

router.get('/analytics', testSession, (req, res) => {
    res.render('dashboard/body', {
        title: 'Analytics', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/analytics.script.ejs', link: '../layaout/link/analytics.link.ejs',
        components: 'components/analytics',
        salesAndReafund: '../layaout/charts/salesAndReafund',
        SalesAndvisits: '../layaout/charts/ordersAndvisits',
        traffic: '../layaout/charts/chartsTraffic',
        ordersAndVisits: '../layaout/charts/chartsOrderAndVisits',
        earning: '../layaout/charts/chartsEarning',
        data: {
            orders: { name: 'Orders', value: '6' },
            shipping: { name: 'Shipping', value: '9' },
            confirmSales: { name: 'confirm sales', value: '9' },
            refund: { name: 'Refund', value: '3' },
            earning: { name: 'Earning', value: '900' },
            customers: { name: 'Customers', value: '13' },
            visits: { name: 'Visits', value: '19' },
            traffic: { name: 'Traffic', donne: { mobile: { name: 'mobile', value: 8 }, descktop: { name: 'descktop', value: 8 }, tablet: { name: 'tablet', value: 8 } } }
        },
    });
});


router.get('/orders', testSession, (req, res) => {
    res.render('dashboard/body', {
        title: 'Orders', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/order.script.ejs', link: '../layaout/link/order.link.ejs',

        components: 'components/orders',
        orderList: '../layaout/orderList',
        orders: [
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
            {
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
                titre: 'Titre de la commande 1',
                quantite: 5,
                date: '2023-05-22 15:30',
                prix: '$50.00',
                statut: 'encour'
            },
            {
                image: 'https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x1200/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg',
                titre: 'Titre de la commande 2',
                quantite: 3,
                date: '2023-05-23 10:45',
                prix: '$30.00',
                statut: 'encour'
            },
        ]
    });
});

router.get('/addProduct', testSession, (req, res) => {
    res.render('dashboard/body', {
        title: 'Add Product', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/addProduct.script.ejs', link: '../layaout/link/addProduct.link.ejs',
        components: 'components/addProduct',

        data: {
            host: 'https://mysnack.com/',
            device: 'usd'
        },

    });
});

router.get('/createCategorie', testSession, (req, res) => {
  

    res.render('dashboard/body', {
        title: 'Add categorie', sidebar: 'layaout/sidebar',
        errorMessage: req.query.message,
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/addCategorie.script.ejs', link: '../layaout/link/addProduct.link.ejs',
        components: 'components/addCategorie',
        data: {
            host: 'https://mysnack.com/',
            device: 'usd'
        },

    });
});

router.get('/singup', (req, res) => {
    const errorMessage = req.query.message;
    res.render('login/login', { title: 'Dashboard | singup', script: '../layaout/script', formPath: 'singupForm', errorMessage: errorMessage });
})

router.get('/signin', (req, res) => {
    const errorMessage = req.query.message;
    res.status(errorMessage ? 401 : 200).render('login/login', { title: 'Dashboard | login', script: '../layaout/script', formPath: 'signinForm', errorMessage: errorMessage });
})

router.get('/logout', (req, res) => logout(req, res))

router.get('/getpassword', (req, res) => {
    res.render('login/login', { title: 'Dashboard | forgot password', script: '../layaout/script', formPath: 'getpasswordForm' });
})

//-----------------------------------------API-------------------------------------------------------//

router.post('/singup', singup);
router.post('/signin', signin);
router.post('/getpassword', getpassword);

router.post('/uploadProductImg', testSession, uploadImgProduct);
router.delete('/uploadProductImg', testSession, delletImgProduct);

router.post('/creatProduct', testSession, createProduct);
router.post('/createCategorie', testSession, createCategorie);



module.exports = router;
