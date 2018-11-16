const db = require('../config/config.js');
const StrongDish = db.strongDish;
// FETCH all Customers
exports.findAll = (req, res) => {
	StrongDish.findAll().then(strongDish => {
	  // Send all customers to Client
	  res.send(strongDish);
	});
};
// Delete a Customer by Id
exports.delete = (req, res) => {
	const idStrongDish = req.params.id;
	StrongDish.destroy({
			where: { idStrongDish: idStrongDish }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> StrongDish Id = '  } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
// Post a Customer
exports.create = (req, res) => {	
  StrongDish.create({  
		idStrongDish: req.body.idStrongDish,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		category:req.body.category,
		price:req.body.price 
	}).then(strongDish => {		
		  // Send created customer to client
		  res.status(200).redirect('/');
	}); 
	res.status(200).redirect('/');
};
// Find a Customer by Id
exports.findById = (req, res) => {	
	StrongDish.findById(req.params.idStrongDish).then(dish => {
		res.send(dish);
	})
};
// Update a Customer
exports.update = (req, res) => {
  StrongDish.update({  
		idStrongDish: req.body.idStrongDish,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.originalname,
		category:req.body.category,
		price:req.body.price 
	}, 
  { where: {idStrongDish: fields['idStrongDish']}}).then(entree => {		
		  // Send created customer to client
		  res.status(200).redirect('/');
	}); 
	res.status(200).redirect('/');
};