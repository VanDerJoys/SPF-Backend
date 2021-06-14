const mongoose = require('mongoose');

const CubSchema = new mongoose.Schema({
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
    cni: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: true
    },
    quartier:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    status:{ //locataire ou propiétaire
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

module.exports = mongoose.model('Cub-contacts', CubSchema);