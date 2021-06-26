const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tcontacts:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "tcontacts"
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

module.exports = mongoose.model('tbases', BaseSchema);

