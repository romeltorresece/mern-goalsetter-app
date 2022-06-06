const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value.']
        }
    }, 
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Goal', goalSchema);