const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/roles');
const adminController = require('../controllers/adminController');

router.use(auth, role(['admin']));
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/posts', adminController.getAllPosts);
router.delete('/posts/:id', adminController.deletePost);

module.exports = router;
