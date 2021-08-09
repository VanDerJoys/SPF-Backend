const mongoose = require('mongoose');

const ProjectManageSchema = new mongoose.Schema({
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Projects"
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Accounts"
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

