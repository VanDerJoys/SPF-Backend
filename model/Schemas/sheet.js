const mongoose = require('mongoose');
const moment = require('moment');

const SheetSchema = new mongoose.Schema({
    group: {  // identifiant du poste
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Managements"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    rdv: {
        type: Number,
        default: 0
    },
    argument: {
        type: Number,
        default: 0
    },
    order: {  // commandes
        type: Number,
        required: true,
        default: 0
    },
    busy_call: {
        type: Number,
        default: 0
    },
    unavailable: {
        type: Number,
        default: 0
    },
    unreachable: {
        type: Number,
        default: 0
    },
    doNotCall: {
        type: Number,
        default: 0
    },
    created_at:{
        type: String,
        default: moment().format('YYYY-MM-DD')
    }
})

module.exports = mongoose.model('sheets', SheetSchema);