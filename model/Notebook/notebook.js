const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    period:{
        type: String,
        required: true
    },
    createdAt: {
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

module.exports = mongoose.model('Agendas', AgendaSchema);