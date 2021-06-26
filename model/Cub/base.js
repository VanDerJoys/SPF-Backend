const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    contacts:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ccontacts"
    }],
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

module.exports = mongoose.model('cbases', BaseSchema);

