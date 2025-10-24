const { Comment, Post } = require('../models');
const { validationResult } = require('express-validator');

exports.addComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ userId: req.user.id, postId, content: req.body.content });
    res.status(201).json({ comment });
  } catch (err) { next(err); }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (err) { next(err); }
};

exports.getByPost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const comments = await Comment.findAll({ where: { postId }, order: [['createdAt','ASC']] });
    res.json({ comments });
  } catch (err) { next(err); }
};
