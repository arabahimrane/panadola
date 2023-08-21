const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const categorySchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    categorieName: { type: String, required: true, unique: true }, // Définir unique:true
    slug: { type: String, required: true, unique: true } // Définir unique:true
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
