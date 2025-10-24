const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/roles');
const newsletterController = require('../controllers/newsletterController');

router.post('/subscribe', newsletterController.subscribe);
router.post('/send', auth, role(['admin']), newsletterController.sendNewsletter);

module.exports = router;
