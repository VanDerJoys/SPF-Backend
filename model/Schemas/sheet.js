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
    arguments:{  // argumentaires
        type: Number,
        required: false,
        default: 0
    },
    orders:{  // commandes
        type: Number,
        required: false,
        default: 0
    },
    busy_calls:{  // appel en absence
        type: Number,
        required: false,
        default: 0
    },
    unavailable:{ // indisponible
        type: Number,
        required: false,
        default: 0
    },
    unreachable:{  // injoignable
        type: Number,
        required: false,
        default: 0
    },
    do_not_call:{  // Ne plus appeler
        type: Number,
        required: false,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sheets', SheetSchema);