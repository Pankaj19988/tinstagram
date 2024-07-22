const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Instance method to get user data without password
User.prototype.toSafeJSON = function() {
  const values = this.get(); // Get all instance values
  delete values.password;   // Remove the password field
  return values;            // Return the modified values
};

module.exports = User;
