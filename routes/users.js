const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getProfile);
router.get('/:id', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.post('/:id/follow', auth, userController.follow);
router.post('/:id/unfollow', auth, userController.unfollow);
router.get('/:id/posts', auth, userController.getUserPosts);

module.exports = router;
