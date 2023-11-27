const router = require('express').Router();
const { testSession, singup, signin, logout, getpassword } = require('../../controller/auth.controller');
const { dataAnalytique, uploadImgProduct, delletImgProduct, createProduct, getProduct, createCategorie, getCategorie, getOrder, } = require('../../controller/dashboard.controller');


// ajoute testSession 
router.get('/', testSession, async (req, res) => {


    res.render('admin/dashboard/body', {
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
        orders: await getOrder(req, res),
    });
});

router.get('/analytics', testSession, async (req, res) => {
    res.render('admin/dashboard/body', {
        title: 'Analytics', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/analytics.script.ejs', link: '../layaout/link/analytics.link.ejs',
        components: 'components/analytics',
        orderAndsalles: '../layaout/charts/chartsOrderAndsalles',
    });
});

router.get('/menu', testSession, async (req, res) => {
    res.render('admin/dashboard/body', {
        title: 'Menu', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/order.script.ejs', link: '../layaout/link/order.link.ejs',

        components: 'components/product',
        menuList: '../layaout/productList',
        menu: await getProduct(req, res),
    });
});

router.get('/categories', testSession, async (req, res) => {
    res.render('admin/dashboard/body', {
        title: 'Categories', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/order.script.ejs', link: '../layaout/link/order.link.ejs',

        components: 'components/categorie',
        categorieList: '../layaout/categorieList',
        categorie: await getCategorie(req, res),
    });
});

router.get('/orders', testSession, async (req, res) => {
    res.render('admin/dashboard/body', {
        title: 'Orders', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/order.script.ejs', link: '../layaout/link/order.link.ejs',

        components: 'components/orders',
        orderList: '../layaout/orderList',
        orders: await getOrder(req, res),
    });
});

router.get('/addProduct', testSession, async (req, res) => {
    res.render('admin/dashboard/body', {
        title: 'Add Product', sidebar: 'layaout/sidebar',
        scriptBody: '../layaout/script', linkBody: '../layaout/link',
        script: '../layaout/script/addProduct.script.ejs', link: '../layaout/link/addProduct.link.ejs',
        components: 'components/addProduct',

        data: {
            host: 'https://mysnack.com/',
            device: 'usd',
            categorie: await getCategorie(req),
        },

    });
});

router.get('/createCategorie', testSession, (req, res) => {
    res.render('admin/dashboard/body', {
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
    res.render('admin/login/login', { title: 'Dashboard | singup', script: '../layaout/script', formPath: 'singupForm', errorMessage: errorMessage });
})

router.get('/signin', (req, res) => {
    const errorMessage = req.query.message;
    res.status(errorMessage ? 401 : 200).render('admin/login/login', { title: 'Dashboard | login', script: '../layaout/script', formPath: 'signinForm', errorMessage: errorMessage });
})

router.get('/logout', (req, res) => logout(req, res))

router.get('/getpassword', (req, res) => {
    res.render('admin/login/login', { title: 'Dashboard | forgot password', script: '../layaout/script', formPath: 'getpasswordForm' });
})

//-----------------------------------------API-------------------------------------------------------//

router.post('/singup', singup);
router.post('/signin', signin);
router.post('/getpassword', getpassword);

router.post('/uploadProductImg', testSession, uploadImgProduct);
router.delete('/uploadProductImg', testSession, delletImgProduct);

router.post('/creatProduct', testSession, createProduct);
router.post('/createCategorie', testSession, createCategorie);
router.get('/getCategorie', testSession, getCategorie);
router.get('/getChartData', testSession, dataAnalytique);


module.exports = router;
