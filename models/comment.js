const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxlength: 500,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: new Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
});


module.exports - mongoose.model('Comment', CommentSchema);