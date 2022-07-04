const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');


// Get
router.get("/", auth, postCtrl.getAllPosts);
// Update
router.put("/:id", auth, multer, postCtrl.modifyPost);
// Post
router.post("/", auth, multer, postCtrl.createPost);
// Delete
router.delete("/:id", auth, postCtrl.deletePost);
// Like
router.post('/:id/like', auth, postCtrl.likePost);


module.exports = router;