const mongoose = require('mongoose');

const FemmeFataleSchema = new mongoose.Schema({
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
    observation: {
        type: String,
        required: false
    },
    payment_date: {
        type: String,
        required: false,
    },
    payment_status: {
        type: String,
        required: true
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

module.exports = mongoose.model('fcontacts', FemmeFataleSchema);