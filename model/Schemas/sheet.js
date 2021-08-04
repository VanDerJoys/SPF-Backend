const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
    },
    calls:{
        type: Number,
        required: false,
        default: 0
    },
    notebooks: {
        type: Number,
        required: false,
        default: 0
    },
    arguments:{
        type: Number,
        required: false,
        default: 0
    },
    orders:{
        type: Number,
        required: false,
        default: 0
    },
    busy_calls:{
        type: Number,
        required: false,
        default: 0
    },
    unavailable:{
        type: Number,
        required: false,
        default: 0
    },
    unreachable:{
        type: Number,
        required: false,
        default: 0
    },
    do_not_call:{
        type: Number,
        required: false,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sheets', SheetSchema);