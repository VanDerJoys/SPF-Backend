const mongoose = require('mongoose');
const moment = require('moment');

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
})

module.exports = mongoose.model('Contacts', ContactSchema);