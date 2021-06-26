const mongoose = require('mongoose');

const TchopetyamoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    contact_status: {
        type: String,
        required: false
    },
    observation: {
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

module.exports = mongoose.model('tcontacts', TchopetyamoSchema);