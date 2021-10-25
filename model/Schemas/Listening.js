const mongoose = require('mongoose');
const moment = require('moment');

const ListeningSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: false
    },
    note1: {
        type: String,
        required: false
    },
    note2: {
        type: String,
        required: false
    },
    note3: {
        type: String,
        required: false
    },
    note4: {
        type: String,
        required: false
    },
    note5: {
        type: String,
        required: false
    },
    comment1: {
        type: String,
        required: false
    },
    comment2: {
        type: String,
        required: false
    },
    comment3: {
        type: String,
        required: false
    },
    comment4: {
        type: String,
        required: false
    },
    comment5: {
        type: String,
        required: false
    },
    finalNote: {
        type: String,
        required: false
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

module.exports = mongoose.model('Listenings', ListeningSchema);

