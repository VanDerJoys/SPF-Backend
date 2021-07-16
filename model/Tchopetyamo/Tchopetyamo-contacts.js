const mongoose = require('mongoose');

const TchopetyamoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    contact_status: {
        type: String,
        required: false
    },
    archived: {
        type: Boolean,
        default: false
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
})

module.exports = mongoose.model('tcontacts', TchopetyamoSchema);