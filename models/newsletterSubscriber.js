module.exports = (sequelize, DataTypes) => {
  const NewsletterSubscriber = sequelize.define('NewsletterSubscriber', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }
  }, {
    tableName: 'newsletter_subscribers',
    timestamps: true
  });
  return NewsletterSubscriber;
};
