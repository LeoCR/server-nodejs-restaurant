const db = require('../config/config.js');
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
// Find a Customer by Id
exports.findProduct = (req, res) => {	
    var idProduct=req.params.id;
    if(idProduct.includes('DRK')){
        Drink.findById(idProduct).then(drink => {
            res.send({product:drink});
        });
    }
    else if(idProduct.includes('DESRT')){
        Dessert.findById(idProduct).then(dessert => {
            res.send({product:dessert});
        });
    }
	else if(idProduct.includes('BGD')){
        StrongDish.findById(idProduct).then(strongDish => {
            res.send({product:strongDish});
        });
    }
    else if(idProduct.includes('ENTR')){
        Entree.findById(idProduct).then(entree => {
            res.send({product:entree});
        });
    }
    
};
