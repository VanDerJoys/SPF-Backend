const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
    },
    calls:[{  //contacts appelés
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'tcontacts'
    }],
    notebooks: [{ //rendez-vous effectués
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'tcontacts'
    }],
    arguments:[{ //argumentaires effectués
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'tcontacts'
    }],
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sheets', SheetSchema);