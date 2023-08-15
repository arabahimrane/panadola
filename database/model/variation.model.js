const mongoose = require('mongoose');

const variationsSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true },
    produt_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    
    name: { type: String, required: true },
    value: { type: String },
    
});

const Variation = mongoose.model('Variation', variationsSchema);

module.exports = Variation;
