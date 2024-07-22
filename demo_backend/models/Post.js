const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Image = require('./Image');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Post;
