const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Follow = sequelize.define('Follow', {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

module.exports = Follow;
