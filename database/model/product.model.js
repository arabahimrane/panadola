const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    information: {
        productTitle: { type: String, required: true },
        slutg: { type: String },
        description: { type: String },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // Le nom du modèle auquel faire référence
        },
    },

    gallery: [
        { type: String },
    ],

    generaleInformation: {
        stock: { type: Number, default: '100' },
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
