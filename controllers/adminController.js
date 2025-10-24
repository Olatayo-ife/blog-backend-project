const { User, Post } = require('../models');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id','username','email','role','createdAt'] });
    res.json({ users });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt','DESC']] });
    res.json({ posts });
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (err) { next(err); }
};
