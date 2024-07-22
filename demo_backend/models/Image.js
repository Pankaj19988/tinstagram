const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./Post');

const Image = sequelize.define('Image', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
