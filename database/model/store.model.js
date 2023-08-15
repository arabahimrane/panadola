const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    logo: { type: String },
    cover: { type: String },
    tva: { type: String },
    zone: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    owner_firstname: { type: String },
    owner_lastname: { type: String },
    owner_phone: { type: String },
    owner_email: { type: String },
    owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    delivery_time_min: { type: Number },
    delivery_time_max: { type: Number },
    delivery_time_type: { type: String },
    branch: { type: String },
    host: { type: String },
});


const StoreData = mongoose.model('Store', storeSchema);

module.exports = StoreData;
