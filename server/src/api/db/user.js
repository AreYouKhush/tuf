const { DataTypes } = require('sequelize');
const sequelize = require('./server');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stdin: {
    type: DataTypes.STRING,
  },
  stdout: {
    type: DataTypes.STRING,
  },
  source: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
});

console.log(User === sequelize.models.User);

module.exports = User;