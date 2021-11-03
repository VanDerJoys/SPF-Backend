const mongoose = require('mongoose');
const moment = require('moment');

const EventSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du post
        ref: "Posts",
        required: true
    },    
    events: [
        {
            name: String,
            details: String,
            start: String,
            color: String,
            timed: Boolean
        }
    ],
    created_at: {
        type: String,
        default: moment().format('YYYY-MM-DD')
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

