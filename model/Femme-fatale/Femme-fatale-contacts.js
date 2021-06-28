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
        required: true
    },
    observation: {
        type: String,
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