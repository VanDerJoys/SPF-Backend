const mongoose = require('mongoose');

const BaseSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du post
        ref: "Posts",
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

