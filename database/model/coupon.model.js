const mongoose = require('mongoose');

const couponsSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    limit_for_same_user: { type: Number, default: 1 }, // Set a default value if needed
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    discount_type: { type: String, enum: ['percentage', 'fixed'], required: true },
    max_discount: { type: Number }, // You may want to specify a maximum discount if applicable
    min_discount: { type: Number }, // You may want to specify a minimum discount if applicable
});

const Coupons = mongoose.model('Coupons', couponsSchema);

module.exports = Coupons;
