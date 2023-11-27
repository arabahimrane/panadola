const mongoose = require('mongoose');


const visitsSchema = new mongoose.Schema({
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    ip: { type: String, required: true },
    contry: { type: String },
    date: { type: Date, default: Date.now },
});


const Vistits = mongoose.model('Vistits', visitsSchema);

module.exports = Vistits;
