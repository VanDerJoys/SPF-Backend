const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post_id: {  // identifiant du poste
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Accounts"
    },
    calls:{  // appelé
        type: Number,
        required: true,
        default: 0
    },
    notebooks: {// rendez-vous
        type: Number,
        required: true,
        default: 0
    },
    arguments: {  // argumentaires
        type: Number,
        required: true,
        default: 0
    },
    orders: {  // commandes
        type: Number,
        required: true,
        default: 0
    },
    busy_calls: {  // appel en absence
        type: Number,
        required: true,
        default: 0
    },
    unavailable: {  // indisponible
        type: Number,
        required: true,
        default: 0
    },
    unreachable: {  // injoignable
        type: Number,
        required: true,
        default: 0
    },
    do_not_call: {  // ne plus appeler
        type: Number,
        required: true,
        default: 0
    },
    tranche: {  // tranche horaire
        type: String,
        required: true,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sheets', SheetSchema);