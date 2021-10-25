const mongoose = require('mongoose');
const moment = require('moment');

const ProjectManageSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Projects"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts"
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

module.exports = mongoose.model('Managements', ProjectManageSchema);

