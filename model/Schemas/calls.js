const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    contacts:[{
        type: String,
        required: false
    }],
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Calls', CallSchema);