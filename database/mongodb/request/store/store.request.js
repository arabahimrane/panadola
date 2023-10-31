const Orders = require('../../../model/order.model');
const StoreData = require('../../../model/store.model');

exports.saveOrders = async (body) => {
    try {

        var orders = new Orders({
            store_id: body.storeId,
            customer: {
                name: body.name.trim(),
                phone: body.phone.trim(),
                address: body.address.trim(),
                token: body.token,
            },
            product_id: body.orders.productId,
            quantity: body.orders.quantity,
            date: Date.now(),
            type: body.paimentType,
            coupon_id: body.coupon
        });
       return await orders.save();
    } catch (e) {
        throw e;
    }
}

exports.getStorIdByHost = async (hostname) => {
    try {
        console.log("get hostName from store request: ", hostname);
        return await StoreData.findOne({ host: hostname }).select('_id');
    } catch (error) {
        console.log("getStoreIdByHostname : ", error);
        throw error;
    }
}