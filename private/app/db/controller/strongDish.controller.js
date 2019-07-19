var path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
StrongDish = db.strongDish;
exports.findAll = (req, res) => {
	StrongDish.findAll().then(strongDish => {
	  res.send(strongDish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	StrongDish.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> StrongDish Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create = (req, res) => {	
  StrongDish.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		category:req.body.category,
		price:req.body.price 
	}).then(strongDish => {		
		  res.status(200).send(strongDish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {
	StrongDish.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.update = (req, res) => {
	StrongDish.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  category:req.body.category,
		  price:req.body.price 
	  }, 
	{ where: {id: req.body.id}}).then(strongDish => {	
			res.status(200).send(strongDish);
	  }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.updateImg = (req, res) => {
  StrongDish.update({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		category:req.body.category,
		price:req.body.price 
	}, 
  { where: {id: req.body.id}}).then(strongDish => {	
		  res.status(200).send(strongDish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};