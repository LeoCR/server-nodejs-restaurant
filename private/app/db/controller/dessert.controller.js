const db = require('../config/config.js');
const Dessert = db.dessert;
// FETCH all Customers
exports.findAll = (req, res) => {
	Dessert.findAll().then(dessert => {
	  // Send all customers to Client
	  res.send(dessert);
	});
};
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Dessert.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> StrongDish Id = '  } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
// Post a Customer
exports.create = (req, res) => {	
    Dessert.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		price:req.body.price 
	}).then(strongDish => {		
		  // Send created customer to client
		  res.status(200).send(strongDish);
	}); 
	res.status(200).redirect('/admin');
};
// Find a Customer by Id
exports.findById = (req, res) => {	
	Dessert.findById(req.params.id).then(dish => {
		res.send(dish);
	})
};
// Update a Customer
exports.update = (req, res) => {
	Dessert.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  picture:req.body.picture,
		  price:req.body.price 
	  }, 
	{ where: {id: req.body.id}}).then(dessert => {		
			// Send created customer to client
			res.status(200).send(dessert);
	  }); 
	  res.status(200).redirect('/admin');
};
// Update a Customer
exports.updateImg = (req, res) => {
    Dessert.update({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		price:req.body.price 
	}, 
  { where: {id: req.body.id}}).then(dessert => {		
		  // Send created customer to client
		  res.status(200).send(dessert);
	}); 
	res.status(200).redirect('/admin');
};