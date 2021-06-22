const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    project: { 
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
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

