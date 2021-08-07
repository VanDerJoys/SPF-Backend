const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true
    },
    account_id:{
        type: mongoose.Schema.Types.ObjectId,  // identifiant du compte
        required: false,
        ref: "Accounts"
    },
    available: {
        type: Boolean,
        required: false,
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

module.exports = mongoose.model('Posts', PostSchema);

