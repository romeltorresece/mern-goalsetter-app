const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            minLength: [5, 'Text must be at least 5 characters in length.'],
            required: [true, 'Please add a text value.']
        }
    }, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);