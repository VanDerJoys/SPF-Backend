const mongoose = require('mongoose');

const ListeningSchema = new mongoose.Schema({
    post_id: [{
        type: mongoose.Schema.Types.ObjectId, // identifiant du poste
        ref: "Bases",
        required: false
    }],    
    hours: {  // Heures d'appel
        type: String,
        required: true
    },
    duration:{  // durée de l'appel
        type: String,
        required: false,
        ref: "Accounts"
    },
    notes: {
        type: Boolean,
        default: true
    },
    observation: {
        type: Boolean,
        default: true
    },
    actions: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
},  {
        toJSON: { 
            transform: function(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)

module.exports = mongoose.model('Listenings', ListeningSchema);

