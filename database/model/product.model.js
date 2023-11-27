const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    information: {
        productTitle: { type: String, required: true },
        slug: { type: String },
        description: { type: String },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
    },

    gallery: [
        { type: String },
    ],

    generaleInformation: {
        price: { type: Number },
        discount: { type: Number },
    },

    variation: {
        type: [mongoose.Schema.Types.Mixed],
    },

    publish: {
        status: { type: String, enum: ['draft', 'publish'] },
        visibility: { type: String, enum: ['public', 'hidden'] },
    },

    publishSchedule: {
        date: {
            type: Date,
            default: Date.now,
        },
    },

    meta: {
        metaTitle: { type: String },
        metaDescription: { type: String },
    },
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
