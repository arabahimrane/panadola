const { getUserStore, getOrders } = require('../database/mongodb/request/dashboard.resquest');
const { sendToS3, delletToS3 } = require('./aws.controller');
const { createProduct, createCategorie } = require('../database/mongodb/request/product.request');
const MessageAndStatus = require('./messageAndStatus.controller');



exports.uploadImgProduct = async (req, res) => {
    try {
        const file = await sendToS3(req.body.file, 'image');
        return res.status(200).json({ file });
    } catch (err) {
        console.log(err);
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}

exports.delletImgProduct = async (req, res) => {
    try {
        console.log(req.body.path);
        const dellet = await delletToS3(req.body.path);
        return res.status(200).json({ dellet });
    } catch (err) {
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}

exports.createProduct = async (req, res) => {
    try {
        createProduct(req);

    } catch (err) {
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}

exports.createCategorie = async (req, res) => {
    try {
        await createCategorie(req).then(() => {
            res.redirect('createcategorie');
        })
    } catch (err) {
        console.log("err: ", err.toString());
        res.redirect('createcategorie?message=' + MessageAndStatus.CATEGORY_AL_REDY_EXIST.message);

    }
}
exports.getStore = async (req, res, next) => {

    try {
        await getUserStore(req.session.userId).then(async (store) => {
            next();
            // const orders = await getOrders(store._id);
            // res.render('dashboard/body', {
            //     title: 'Dashboard', sidebar: 'layaout/sidebar',
            //     scriptBody: '../layaout/script', linkBody: '../layaout/link',
            //     components: 'components/dashboard', cardi: '../layaout/card',
            //     orderList: '../layaout/orderList',
            //     data: {
            //         orders: { name: 'Orders', value: '0' },
            //         shipping: { name: 'Shipping', value: '0' },
            //         confirmSales: { name: 'confirm sales', value: '0' },
            //         refund: { name: 'Refund', value: '0' },
            //         earning: { name: 'Earning', value: '0' },
            //         visits: { name: 'Visits', value: '0' },
            //         customers: { name: 'Customers', value: '0' }
            //     },
            // });
        });
    } catch (error) {
    }
}