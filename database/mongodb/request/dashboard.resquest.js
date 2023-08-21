const UsersData = require('../../model/user.model');
const StoreData = require('../../model/store.model');
const Orders = require('../../model/order.model');


exports.createStore = async (userId) => {
    try {
        const owner = await UsersData.findOne({ _id: userId });
        const newStore = new StoreData({
            owner_firstname: owner.firstName,
            owner_lastname: owner.lastName,
            owner_email: owner.email,
            owner_id: owner._id
        });
        return await newStore.save();
    } catch (error) {
        throw error;
    }
}

exports.getStoreInformation = async (userId) => {
    try {
        return await StoreData.findOne({ owner_id: userId });
    } catch (error) {
        throw error;
    }
}

exports.getUserStore = async (userId) => {
    try {
        return await StoreData.findOne({ owner_id: userId });
    } catch (error) {
        throw error;
    }
}

exports.getOrders = async (storeId) => {
    try {
        return await Orders.find({ store_id: storeId })
            .populate('customer_id', 'name addresse city country phone')
            .populate('product.product_id', 'name _id img')
            .populate('product.selected_variation.variation_id', 'name value')
            .populate('coupon_id', 'name code');
    } catch (error) {
        throw error;
    }
}