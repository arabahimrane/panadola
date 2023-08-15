const mongoose = require('mongoose');

// Define the Orders schema
const ordersSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    product: {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        selected_variation: {
            variation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variation' },
            variation_price:{type: Number}
        }
    },
    quantity: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['paid', 'cod'], required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending', required: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    delivery_fee: { type: Number, required: true },
});

// Create the "Orders" model
const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
