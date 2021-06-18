const mongoose = require('mongoose');

const CubSchema = new mongoose.Schema({
    base_name:{ //1
        type: String,
        required: true
    },
    name: { //2
        type: String,
        required: true
    },
    phone: { //2
        type: String,
        required: true
    },
    cni: { //2
        type: String,
        required: true
    },
    service: { //3
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: false
    },
    quartier:{ //3
        type: String,
        required: true
    },
    facebook:{ //3
        type: String,
        required: true
    },
    status:{ //locataire ou propiétaire
        type: String,
        required: true
    },
    post: { //1
        type: Number,
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