const mongoose = require('mongoose');

// Define the Orders schema
const ordersSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    customer: {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        token: { type: String },
    },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['paid', 'cod'], required: false },
    status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending', required: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
});

// Create the "Orders" model
const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
