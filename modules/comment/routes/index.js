const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../../../midleware/auth');

router.get('/', commentController.getAllComments);
router.get('/:id', auth.auth, commentController.getCommentById);
router.post('/', auth.auth, commentController.createComment);
router.put('/:id', auth.auth, commentController.updateComment);
router.delete('/:id', auth.auth, commentController.deleteComment);

module.exports = router;