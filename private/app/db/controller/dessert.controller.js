const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Dessert = db.dessert;
exports.findAll = (req, res) => {
	Dessert.findAll().then(dessert => {
	  res.send(dessert);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Dessert.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Dessert Id = '+id  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
};
exports.create = (req, res) => {	
    Dessert.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		price:req.body.price 
	}).then(strongDish => {		
		  res.status(200).send(strongDish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {	
	Dessert.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.update = (req, res) => {
	Dessert.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  price:req.body.price 
	  }, 
	{ where: {id: req.body.id}}).then(dessert => {	
			res.status(200).send(dessert);
	  }).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
};
exports.updateImg = (req, res) => {
    Dessert.update({  
			id: req.body.id,
			name: req.body.name,
			description: req.body.description,
			picture:'/img/uploads/'+req.file.filename,
			price:req.body.price 
		}, 
		{ where: {id: req.body.id}}).then(dessert => {	
		  res.status(200).send(dessert);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};