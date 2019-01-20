const Sequelize = require('sequelize');
const sequelize = new Sequelize('restaurant_redux', 'root', '79461313', {
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
db.ingredient = require('../model/ingredient.model.js')(sequelize, Sequelize);
db.dessert=require('../model/dessert.model.js')(sequelize, Sequelize);
db.user=require('../model/user.model.js')(sequelize, Sequelize);
db.drink=require('../model/drink.model.js')(sequelize, Sequelize);
module.exports = db;