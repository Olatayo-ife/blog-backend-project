const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Post = require('./post')(sequelize, Sequelize.DataTypes);
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);
const Like = require('./like')(sequelize, Sequelize.DataTypes);
const Follow = require('./follow')(sequelize, Sequelize.DataTypes);
const NewsletterSubscriber = require('./newsletterSubscriber')(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.belongsToMany(Post, { through: Like, as: 'likedPosts', foreignKey: 'userId' });
Post.belongsToMany(User, { through: Like, as: 'likes', foreignKey: 'postId' });

// Follows: self-referential
User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'followingId',
  otherKey: 'followerId'
});
User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Post,
  Comment,
  Like,
  Follow,
  NewsletterSubscriber
};
