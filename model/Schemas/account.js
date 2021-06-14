const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    statut: {
        type: Boolean,
        required: false,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Accounts', AccountSchema);

