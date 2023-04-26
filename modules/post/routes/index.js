const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../../../midleware/auth');

router.get('/',/*  auth.auth,  */postController.getAllPosts);
router.get('/:id', auth.auth, postController.getPostById);
router.post('/', auth.author, postController.createPost);
router.put('/:id', auth.author, postController.updatePost);
router.delete('/:id', auth.author, postController.deletePost);

module.exports = router;