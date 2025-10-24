const { body, param, query } = require('express-validator');

exports.registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('username at least 3 chars'),
  body('email').isEmail().withMessage('valid email required'),
  body('password').isLength({ min: 6 }).withMessage('password at least 6 chars')
];

exports.loginValidation = [
  body('email').isEmail(),
  body('password').exists()
];

exports.postValidation = [
  body('title').isLength({ min: 3 }),
  body('content').isLength({ min: 5 })
];

exports.commentValidation = [
  body('content').isLength({ min: 1 })
];

exports.pagination = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
];
