const { User, Follow, Post } = require('../models');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res, next) => {
  try {
    const targetId = req.params.id || req.user.id;
    const user = await User.findByPk(targetId, { attributes: ['id','username','email','role','createdAt'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const followers = await user.getFollowers({ attributes: ['id','username'] });
    const following = await user.getFollowing({ attributes: ['id','username'] });
    res.json({ user, followers: followers.length, following: following.length });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();
    res.json({ message: 'Profile updated', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) { next(err); }
};

exports.follow = async (req, res, next) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    if (targetId === req.user.id) return res.status(400).json({ message: 'Cannot follow yourself' });
    const target = await User.findByPk(targetId);
    if (!target) return res.status(404).json({ message: 'User not found' });

    const [follow, created] = await Follow.findOrCreate({ where: { followerId: req.user.id, followingId: targetId } });
    if (!created) return res.status(400).json({ message: 'Already following' });
    res.json({ message: 'Followed user' });
  } catch (err) { next(err); }
};

exports.unfollow = async (req, res, next) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    const removed = await Follow.destroy({ where: { followerId: req.user.id, followingId: targetId } });
    if (!removed) return res.status(400).json({ message: 'Not following' });
    res.json({ message: 'Unfollowed user' });
  } catch (err) { next(err); }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const posts = await Post.findAll({ where: { userId }, order: [['createdAt','DESC']] });
    res.json({ posts });
  } catch (err) { next(err); }
};
