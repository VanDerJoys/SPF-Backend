const mongoose = require('mongoose');

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

module.exports = mongoose.model('Managements', ProjectManageSchema);

