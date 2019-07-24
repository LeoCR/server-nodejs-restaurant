const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Ingredient = db.ingredient,
IngredientDish=db.ingredientDish,
sequelize=db.sequelize;
exports.findAll = (req, res) => {
	Ingredient.findAll({
		order: [
      ['name', 'ASC'],
    ]
	}).then(ingredient => {
	  res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Ingredient.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Ingredient Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
};
exports.findById = (req, res) => {	
	Ingredient.findByPk(req.params.id).then(ingredient => {
		res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create = (req, res) => {
	Ingredient.create({  
		id: req.body.id,
		name: req.body.name,
		img: '/img/uploads/'+req.file.filename
	}).then(ingredient => {		 
		  res.status(200).send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.update = (req, res) => {
  	Ingredient.update({  
			id: req.body.id,
			name: req.body.name
		}, 
			{ 
				where: {
					id: req.body.id
		}}).then(ingredient => {		
			res.status(200).send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.getIngredientsByDish=(req,res)=>{
	var sqlFindIngredientsByDish="SELECT INGREDIENT_DISH.id_ingredient_dish,INGREDIENT_DISH.id_ingredient, "+
	" INGREDIENT_DISH.id_dish,INGREDIENT.name,INGREDIENT.img FROM INGREDIENT_DISH "+
	" INNER JOIN  INGREDIENT ON INGREDIENT.id=INGREDIENT_DISH.id_ingredient where INGREDIENT_DISH.id_dish='"+req.params.idDish + "' ;";
	sequelize.query(sqlFindIngredientsByDish, { type: sequelize.QueryTypes.SELECT})
	.then(ingredients => {
				res.send(ingredients);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.getLastIngredientToDishId=(req,res)=>{
		var sqlGetLastIngredientToDishId="SELECT MAX(id_ingredient_dish) AS maxIngredientDishId FROM restaurant_ui.INGREDIENT_DISH;";
		sequelize.query(sqlGetLastIngredientToDishId, { type: sequelize.QueryTypes.SELECT})
		.then(ingredients => {
					res.send(ingredients[0]);     
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
}
exports.addIngredientToDish=(req,res)=>{
	IngredientDish.findOne({ where: {
		id_ingredient_dish:req.body.id_ingredient_dish,
		id_ingredient:req.body.id_ingredient,
		id_dish: req.body.id_dish
	} }).then(ing => {
		if(ing){
				res.send(ing)
		}
		else{
			IngredientDish.create({  
				id_ingredient_dish:req.body.id_ingredient_dish,
				id_ingredient:req.body.id_ingredient,
				id_dish: req.body.id_dish
			}).then(ingredient => {		 
					res.status(200).send(ingredient);
			}).catch(err => {
				res.status(500).json({msg: "An error occurred.", details: err});
			})
		}
	}).catch(err=>{
		res.status(500).json({
			msg:"An error occured",
			details:err
		})
	})
}
exports.deleteIngredientFromDish = (req, res) => {
	const id = req.params.id_ingredient_dish;
	IngredientDish.destroy({
		where: { id_ingredient_dish: id }
	}).then(() => {
		res.status(200).json({ msg: 'Deleted Successfully'});
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.updateImg = (req, res) => {
	Ingredient.update({  
	  id: req.body.id,
	  name: req.body.name,
	  img:'/img/uploads/'+req.file.filename,
  }, 
	  { 
		  where: {
			  id: req.body.id
	  }}).then(ingredient => {		
	  res.status(200).send(ingredient);
  }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};