const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post_id: {  // identifiant du poste
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
    },
    calls:{// appels
        type: Number,
        required: true,
    },
    notebooks: {// rendez-vous
        type: Number,
        required: true,
    },
    arguments: {  // argumentaires
        type: Number,
        required: true,
    },
    orders: {  // commandes
        type: Number,
        required: true,
    },
    busy_calls: {  // appel en absence
        type: Number,
        required: true,
    },
    unavailable: {  // indisponible
        type: Number,
        required: true,
    },
    unreachable: {  // injoignable
        type: Number,
        required: true,
    },
    do_not_call: {  // ne plus appeler
        type: Number,
        required: true,
    },
    created_at:{
        type: String,
        default: new Date().toDateString()
    }
})

module.exports = mongoose.model('sheets', SheetSchema);