const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validators = require('../utils/validators');
const upload = require('../middleware/multer');
const postController = require('../controllers/postController');

router.post('/', auth, upload.single('image'), validators.postValidation, postController.createPost);
router.put('/:id', auth, upload.single('image'), postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.get('/', validators.pagination, postController.getAll);
router.get('/:id', postController.getById);
router.post('/:id/like', auth, postController.toggleLike);

module.exports = router;
