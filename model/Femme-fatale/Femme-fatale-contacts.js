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
    contact_status:{
        type: String,
        required: false
    },
    rdv: {
        type: Date,
        required: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('fcontacts', FemmeFataleSchema);