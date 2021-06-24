const mongoose = require('mongoose');

const FemmeFataleSchema = new mongoose.Schema({
    base_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bases",
        required: true
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

module.exports = mongoose.model('femme_fatale', FemmeFataleSchema);

