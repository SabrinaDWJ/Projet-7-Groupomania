const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  postId: { type: String, required: true },
  message: { type: String, maxlength: 500, },
  picture: { type: String, },
  likes: { type: [String], required: true, },
  usersLiked: { type: Array, default: [] },
  created: { type: Date, required: true },
  createdBy: { type: String, required: true }
}
);


module.exports = mongoose.model('Post', postSchema);