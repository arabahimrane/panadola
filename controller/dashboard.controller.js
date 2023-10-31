const { getUserStore, getOrders } = require('../database/mongodb/request/dashboard.resquest');
const { sendToS3, delletToS3 } = require('./aws.controller');
const { createProduct, getProduct, createCategorie, getCategorie, getOrder, OrderFilterByDays } = require('../database/mongodb/request/product.request');
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
        await createProduct(req).then(() =>
            res.status(MessageAndStatus.OK.statusCode).send(MessageAndStatus.OK.message)
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}

exports.getProduct = async (req, res) => {
    try {
        return await getProduct(req);
    } catch (err) {
        // console.log(err);
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

exports.getCategorie = async (req, res) => {
    try {
        return await getCategorie(req);
    } catch (error) {
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}

exports.getOrder = async (req, res) => {
    try {
        return await getOrder(req);
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }

}

exports.dataAnalytique = async (req, res) => {
    try {
        const data = await OrderFilterByDays(req);
        console.log('data: ', data);
        res.status(200).json(data);
        return data;

    } catch (err) {
        console.log(err);
        return res.status(500).send(MessageAndStatus.ERROR_SERVER.message);
    }
}