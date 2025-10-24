module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'likes',
    timestamps: false,
    indexes: [
      { unique: true, fields: ['userId', 'postId'] }
    ]
  });
  return Like;
};
