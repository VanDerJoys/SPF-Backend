const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Accounts'
    },
    description: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Agenda', AgendaSchema);