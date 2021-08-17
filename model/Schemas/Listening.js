const mongoose = require('mongoose');

const ListeningSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du poste
        ref: "Posts",
        required: true
    },    
    hours: {  // Heures d'appel
        type: String,
        required: false
    },
    duration:{  // durée de l'appel
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    observation: {
        type: String,
        required: false
    },
    actions: {
        type: String,
        required: false
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

