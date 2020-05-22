const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize,
Drink = db.drink;
exports.findAll = (req, res) => {
	Drink.findAll().then(drink => {
	  res.send(drink);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Drink.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Drink Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create = (req, res) => {	
  Drink.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		price:req.body.price 
	}).then(drink => {		
		  res.status(200).send(drink);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {	
	Drink.findByPk(req.params.id).then(drink => {
		res.send(drink);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.update = (req, res) => {
	Drink.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  price:req.body.price 
	  }, 
	{ where: {id: req.params.id}}).then(drink => {
		Drink.findByPk(req.params.id).then(drink => {
			return res.send(drink);
		}).catch(err => {
			console.log('An errors occurs in drink.controller update() findByPk()'); 
			console.log(err); 
			return res.status(500).json({msg: "An error occurred.", details: err});
		});
	  }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.updateImg = (req, res) => {
  Drink.update({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		price:req.body.price 
	}, 
  { where: {id: req.params.id}}).then(drink => {	
		Drink.findByPk(req.params.id).then(drink => {
			return res.send(drink);
		}).catch(err => {
			console.log('An errors occurs in drink.controller updateImg() findByPk()'); 
			console.log(err); 
			return res.status(500).json({msg: "An error occurred.", details: err});
		});
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};