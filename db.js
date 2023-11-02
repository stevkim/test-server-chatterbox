// var mysql = require('mysql2');

// module.exports = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'chatterbox'
// });

var { Sequelize } = require('sequelize');

module.exports = new Sequelize('chatterbox', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});