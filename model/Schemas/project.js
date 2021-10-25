const mongoose = require('mongoose');
const moment = require('moment');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false
    },
    archived:{
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

module.exports = mongoose.model('Projects', ProjectSchema);

