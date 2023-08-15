const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    statue: { type: String, enum: ['draft', 'publish'] },
    title: { type: String, required: true },
    description: { type: String },
    visibility: { type: String, enum: ['public', 'hidden'] },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories' },
    gallery: [{ type: String }],
    stock: { type: Number },
    price: { type: Number, required: true },
    discount: { type: Number },
    variation: [{ variation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variation' }, price: { type: Number } }],
    meta_title: { type: String },
    meta_description: { type: String },
    tags: { type: [String] },
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
