const { saveOrders, getStorIdByHost } = require('../../database/mongodb/request/store/store.request');
const MESSAGE = require("../messageAndStatus.controller");
exports.saveOrders = async (req, res) => {
    try {
        var storeId = await getStorIdByHost(req.hostname);
        req.body.hostname = req.hostname;
        req.body.storeId = storeId;
        console.log("storeId: ", storeId);
        if (!storeId) {
            throw new Error(MESSAGE.ERROR_SERVER);
        }
        const orderSave =  await saveOrders(req.body);
        console.log(orderSave);
        // res.sendStatus(200);
    } catch (error) {
        
        console.log(error);
    }


} 