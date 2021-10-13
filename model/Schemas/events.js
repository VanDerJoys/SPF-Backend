const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du post
        ref: "Posts",
        required: true
    },    
    events: [
        {
            name: String,
            start: String,
            color: String,
            timed: Boolean
        }
    ],
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

module.exports = mongoose.model('Events', EventSchema);

