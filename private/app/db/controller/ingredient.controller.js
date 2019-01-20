const db = require('../config/config.js');
const Ingredient = db.ingredient;
// FETCH all Customers
exports.findAll = (req, res) => {
	Ingredient.findAll().then(ingredient => {
	  // Send all customers to Client
	  res.send(ingredient);
	});
};
// Delete a Customer by Id
exports.delete = (req, res) => {
	const idIngredient = req.params.id;
	Ingredient.destroy({
			where: { idIngredient: idIngredient }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Ingredient Id = '  } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
exports.findById = (req, res) => {	
	Ingredient.findById(req.params.idIngredient).then(ingredient => {
		res.send(ingredient);
	})
};
// Post a Customer
exports.create = (req, res) => {
	Ingredient.create({  
		idIngredient: req.body.idIngredient,
		name: req.body.name,
		img: '/img/uploads/'+req.file.originalname
		 
	}).then(ingredient => {		
		  // Send created 
		  res.status(200).send(ingredient);
	}); 
	res.status(200).redirect('/admin');
}
// Update a Customer
exports.update = (req, res) => {
  	Ingredient.update({  
		idIngredient: req.body.idIngredient,
		name: req.body.name,
		img:req.body.img
	}, 
		{ 
			where: {
				idIngredient: req.body.idIngredient
		}}).then(ingredient => {		
		// Send created customer to client
		res.status(200).send(ingredient);
		
	});
	res.status(200).redirect('/admin');
};
// Update a Customer
exports.updateImg = (req, res) => {
	Ingredient.update({  
	  idIngredient: req.body.idIngredient,
	  name: req.body.name,
	  img: '/img/uploads/'+req.file.originalname  
  }, 
	  { 
		  where: {
			  idIngredient: req.body.idIngredient
	  }}).then(ingredient => {		
	  // Send created customer to client
	  res.status(200).send(ingredient);
	  
  });
  res.status(200).redirect('/admin');
};