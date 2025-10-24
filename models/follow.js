module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    followerId: { type: DataTypes.INTEGER, allowNull: false },
    followingId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'follows',
    timestamps: false,
    indexes: [
      { unique: true, fields: ['followerId', 'followingId'] }
    ]
  });
  return Follow;
};
