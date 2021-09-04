const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du post
        ref: "Projects",
        required: false
    },    
    name: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model('Bases', BaseSchema);

