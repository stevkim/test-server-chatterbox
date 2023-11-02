var { DataTypes } = require('sequelize');
var db = require('./db.js');

module.exports = db.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: DataTypes.STRING,
  text: DataTypes.TEXT,
  roomname: DataTypes.STRING
});