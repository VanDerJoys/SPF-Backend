const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post_id: {  // identifiant du poste
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
    },
    calls:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    notebooks: [
        {
            contact: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: "Contacts"
            },
            period: {
                type: String,
                required: false
            }
        }
    ],
    arguments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    orders: {  // commandes
        type: Number,
        required: true,
    },
    busy_calls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    unavailable: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    unreachable: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    do_not_call: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Contacts"
        }
    ],
    created_at:{
        type: String,
        default: new Date().toDateString()
    }
})

module.exports = mongoose.model('sheets', SheetSchema);