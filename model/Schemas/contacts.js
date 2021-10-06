const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Managements"
    },  
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    town:{
        type: String,
        required: false
    },
    birthdate: {
        type: String,
        required: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    created_at:{
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

module.exports = mongoose.model('Contacts', ContactSchema);