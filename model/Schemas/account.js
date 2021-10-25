const mongoose = require('mongoose');
const moment = require('moment');

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
        required: false,
        default: false
    },
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

module.exports = mongoose.model('Accounts', AccountSchema);

