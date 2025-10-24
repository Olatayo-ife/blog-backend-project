const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validators = require('../utils/validators');
const commentController = require('../controllers/commentController');

router.post('/:id', auth, validators.commentValidation, commentController.addComment); // add comment to post id
router.delete('/:id', auth, commentController.deleteComment); // delete comment id
router.get('/post/:id', commentController.getByPost);

module.exports = router;
