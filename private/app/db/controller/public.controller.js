const db = require('../config/config.js');
const sequelize = db.sequelize;
const Drink = db.drink;
const Dessert = db.dessert;
const StrongDish = db.strongDish;
const Entree = db.entree;
exports.getAllProducts= (req, res) => {
    var jsonData={};
    Drink.findAll().then(drink => {
        jsonData={ drinks: drink };  
    }).then(()=>{
        Dessert.findAll().then(dessert => {
            jsonData=Object.assign({desserts:dessert},jsonData);
        }).then(()=>{
            StrongDish.findAll().then(strongDish => {
                jsonData=Object.assign({strongsDishes:strongDish},jsonData);
            });
        }).then(()=>{
            Entree.findAll().then(entree => {
                jsonData=Object.assign({entrees:entree},jsonData);
                res.send(jsonData);
            });
        })
    });
   
};
