const Sequelize = require('sequelize');
const sequelize = new Sequelize('isplusde_restaurant', 'isplusde_restau', 'n&@1P81C$Bkct5U8B3supernova', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: true,
    timestamps: false
},
  port: "3306",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000000,
    idle: 1000000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.entree = require('../model/entree.model.js')(sequelize, Sequelize);
db.strongDish = require('../model/strongDish.model.js')(sequelize, Sequelize);
module.exports = db;