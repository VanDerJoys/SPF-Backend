const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post: {  // identifiant du poste
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
    },
    calls:{  // appelé
        type: Number,
        required: false,
        default: 0
    },
    notebooks: [{// rendez-vous
        contact: {  
            type: mongoose.Schema.Types.ObjectId, // identifiant du contact
            required: false,
            ref: "Contacts"
        },
        period:{
            type: String,
            required: true
        }
    }],
    arguments: [{  // argumentaires
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    orders: [{  // commandes
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    busy_calls: [{  // appel en absence
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    unavailable: [{  // indisponible
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    unreachable: [{  // injoignable
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    do_not_call: [{  // ne plus appeler
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: false
    }],
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sheets', SheetSchema);