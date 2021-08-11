const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Projects"
    },
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
        required: true
    },
    role: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Posts"
    },
    status: {
        type: Boolean,
        required: false,
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
    }
)

module.exports = mongoose.model('Accounts', AccountSchema);

