const mongoose = require('mongoose');

const MarketerSchema = new mongoose.Schema({
    account: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        require: true
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        require: true
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

module.exports = mongoose.model('Telemarketers', MarketerSchema);