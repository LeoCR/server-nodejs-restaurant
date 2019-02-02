const db = require('../config/config.js');
const Drink = db.drink;
const Dessert = db.dessert;
const StrongDish = db.strongDish;
const Entree = db.entree;
const sequelize=db.sequelize;
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
// Find a Product by Id
exports.findIngredients = (req, res) => {	
    var idDish=req.params.id,
    sqlFindIngredients="SELECT INGREDIENT.id,INGREDIENT.name,"+
   " INGREDIENT.img,INGREDIENT_DISH.idIngredient,"+
   " INGREDIENT_DISH.idDish FROM INGREDIENT JOIN INGREDIENT_DISH "+
   " ON INGREDIENT.id = INGREDIENT_DISH.idIngredient "+
   " WHERE INGREDIENT_DISH.idDish='"+idDish+"';";
   sequelize.query(sqlFindIngredients, { type: sequelize.QueryTypes.SELECT})
   .then(ingredients => {
        res.send(ingredients);     
    })
}
// Find a Product by Id
exports.findProduct = (req, res) => {	
    var idProduct=req.params.id;
    if(idProduct.includes('DRK')){
        Drink.findById(idProduct).then(drink => {
            res.send(drink);
        });
    }
    else if(idProduct.includes('DESRT')){
        Dessert.findById(idProduct).then(dessert => {
            res.send(dessert);
        });
    }
	else if(idProduct.includes('BGD')){
        StrongDish.findById(idProduct).then(strongDish => {
            res.send(strongDish);
        });
    }
    else if(idProduct.includes('ENTR')){
        Entree.findById(idProduct).then(entree => {
            res.send(entree);
        });
    }
};
