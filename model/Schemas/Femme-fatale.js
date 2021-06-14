const mongoose = require('mongoose');

const FemmeFataleSchema = new mongoose.Schema({
    base_name:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    plainte: {
        type: String,
        required: false
    },
    order: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: { //lieu
        type: String,
        required: true
    },
    contact_status:{
        type: String,
        required: true
    },
    payment_date: {
        type: Date,
        required: false,
    },
    payment_status: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: false
    },
    recommandation: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Femme_fatale-contacts', FemmeFataleSchema);