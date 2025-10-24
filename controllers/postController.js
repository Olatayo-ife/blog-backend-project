const { Post, User, Like, Comment } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const fs = require('fs');

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const post = await Post.create({ userId: req.user.id, title, content, image });
    res.status(201).json({ post });
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const { title, content } = req.body;
    if (req.file && post.image) {
      // delete old image
      try { fs.unlinkSync(`${process.env.UPLOAD_DIR || 'uploads'}/${post.image}`); } catch(e){}
      post.image = req.file.filename;
    }
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.json({ message: 'Post updated', post });
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    if (post.image) {
      try { fs.unlinkSync(`${process.env.UPLOAD_DIR || 'uploads'}/${post.image}`); } catch(e){}
    }
    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, user } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (q) where[Op.or] = [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } }
    ];
    if (user) where.userId = user;

    const { count, rows } = await Post.findAndCountAll({
      where,
      include: [{ model: User, as: 'author', attributes: ['id','username'] }, { model: Comment }],
      order: [['createdAt','DESC']],
      limit: parseInt(limit,10),
      offset: parseInt(offset,10)
    });

    res.json({ meta: { total: count, page: parseInt(page,10), limit: parseInt(limit,10) }, data: rows });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await Post.findByPk(id, { include: [{ model: User, as: 'author', attributes: ['id','username'] }, { model: Comment }] });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) { next(err); }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const existing = await Like.findOne({ where: { userId: req.user.id, postId } });
    if (existing) {
      await existing.destroy();
      return res.json({ message: 'Unliked' });
    }
    await Like.create({ userId: req.user.id, postId });
    res.json({ message: 'Liked' });
  } catch (err) { next(err); }
};
