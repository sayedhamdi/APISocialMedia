const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    UserPhoto: {
        type: String,
    },
    postedBy: {
        type: String,
    },
    comments : []
})



module.exports = mongoose.model('posts', postSchema)
