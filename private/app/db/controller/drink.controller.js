const db = require('../config/config.js');
const Drink = db.drink;
// FETCH all Customers
exports.findAll = (req, res) => {
	Drink.findAll().then(drink => {
	  // Send all customers to Client
	  res.send(drink);
	});
};
// Delete a Customer by Id
exports.delete = (req, res) => {
	const idDrink = req.params.id;
	Drink.destroy({
			where: { idDrink: idDrink }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Drink Id = '  } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
// Post a Customer
exports.create = (req, res) => {	
  Drink.create({  
		idDrink: req.body.idDrink,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		price:req.body.price 
	}).then(drink => {		
		  // Send created customer to client
		  res.status(200).send(drink);
	}); 
	res.status(200).redirect('/admin');
};
// Find a Customer by Id
exports.findById = (req, res) => {	
	Drink.findById(req.params.idDrink).then(drink => {
		res.send(drink);
	})
};
// Update a Customer
exports.update = (req, res) => {
	Drink.update({  
		  idDrink: req.body.idDrink,
		  name: req.body.name,
		  description: req.body.description,
		  picture:req.body.picture,
		  price:req.body.price 
	  }, 
	{ where: {idDrink: req.body.idDrink}}).then(drink => {		
			// Send created customer to client
			res.status(200).send(drink);
	  }); 
	  res.status(200).redirect('/admin');
};
// Update a Customer
exports.updateImg = (req, res) => {
  Drink.update({  
		idDrink: req.body.idDrink,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		price:req.body.price 
	}, 
  { where: {idDrink: req.body.idDrink}}).then(drink => {		
		  // Send created customer to client
		  res.status(200).send(drink);
	}); 
	res.status(200).redirect('/admin');
};