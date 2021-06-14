const mongoose = require('mongoose');

const TchopetyamoSchema = new mongoose.Schema({
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
    town: {
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

module.exports = mongoose.model('Tchopetyamo-contacts', TchopetyamoSchema);